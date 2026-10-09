import {
  LABEL_KEYWORDS,
  INVOICE_KEYWORDS,
  type PlatformKeyword,
} from "./platforms";
import type {
  PageRegion,
  PlatformId,
  Rect,
} from "./types";
import {
  clampRect,
  fullPageRect,
  rectsOverlap,
  unionRect,
} from "./geometry";

export type AnalyzeItem = {
  str: string;
  /** Normalized (0..1) displayed-space rect, top-left origin. */
  rect: Rect;
};

/** Full-width horizontal band of blank rows, normalized y (top-left origin). */
export type BlankBand = {
  yStart: number;
  yEnd: number;
};

/** Downsampled ink map of the displayed page (1 = ink in cell). */
export type InkGrid = {
  cols: number;
  rows: number;
  data: Uint8Array;
};

export type PageTextLine = {
  text: string;
  rect: Rect;
  labelScore: number;
  invoiceScore: number;
};

const CLUSTER_PADDING = 0.015;
const INK_PADDING = 0.008;
const GUTTER_TOLERANCE = 0.025;
const MIN_LINE_CHARS = 2;

export function scoreKeywords(
  text: string,
  keywords: PlatformKeyword[]
): number {
  const lower = text.toLowerCase();
  let score = 0;
  for (const kw of keywords) {
    if (kw.term && lower.includes(kw.term)) score += kw.weight;
  }
  return score;
}

/** Document-level platform scoring from concatenated page text. */
export function scorePlatformText(
  text: string,
  presets: { id: PlatformId; keywords: PlatformKeyword[] }[]
): Partial<Record<PlatformId, number>> {
  const scores: Partial<Record<PlatformId, number>> = {};
  for (const preset of presets) {
    if (preset.keywords.length === 0) continue;
    const score = scoreKeywords(text, preset.keywords);
    if (score > 0) scores[preset.id] = score;
  }
  return scores;
}

export function pickBestPlatform(
  scores: Partial<Record<PlatformId, number>>
): { platform: PlatformId; confidence: number } {
  const entries = Object.entries(scores).filter(
    (e): e is [PlatformId, number] => typeof e[1] === "number" && e[1] > 0
  );
  if (entries.length === 0) return { platform: "custom", confidence: 0 };
  entries.sort((a, b) => b[1] - a[1]);
  const best = entries[0][1];
  const second = entries[1]?.[1] ?? 0;
  const confidence = best / (best + second + 4);
  return { platform: entries[0][0], confidence };
}

/** Group text items into visual lines (items sharing a baseline band). */
export function groupLines(items: AnalyzeItem[]): PageTextLine[] {
  const sorted = [...items]
    .filter((it) => it.str.trim().length >= MIN_LINE_CHARS)
    .sort((a, b) => a.rect.y - b.rect.y || a.rect.x - b.rect.x);

  const lines: { top: number; bottom: number; parts: AnalyzeItem[] }[] = [];

  for (const item of sorted) {
    const h = Math.max(item.rect.height, 0.001);
    const current = lines[lines.length - 1];
    if (current) {
      const lineH = Math.max(
        (current.bottom - current.top) / Math.max(current.parts.length, 1),
        0.001
      );
      const tolerance = Math.max(0.7 * Math.max(h, lineH), 0.004);
      if (Math.abs(item.rect.y - current.top) <= tolerance) {
        current.parts.push(item);
        current.top = Math.min(current.top, item.rect.y);
        current.bottom = Math.max(current.bottom, item.rect.y + h);
        continue;
      }
    }
    lines.push({
      top: item.rect.y,
      bottom: item.rect.y + h,
      parts: [item],
    });
  }

  return lines.map((line) => {
    let rect = line.parts[0].rect;
    for (const part of line.parts.slice(1)) rect = unionRect(rect, part.rect);
    const text = line.parts
      .map((p) => p.str)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    return {
      text,
      rect,
      labelScore: scoreKeywords(text, LABEL_KEYWORDS),
      invoiceScore: scoreKeywords(text, INVOICE_KEYWORDS),
    };
  });
}

function inkExtentsInBand(
  grid: InkGrid,
  band: { yStart: number; yEnd: number },
  extra?: { left?: number; right?: number }
): Rect | null {
  const { cols, rows, data } = grid;
  const rowStart = Math.max(0, Math.floor(band.yStart * rows));
  const rowEnd = Math.min(rows, Math.ceil(band.yEnd * rows));
  const colStart = Math.max(0, Math.floor((extra?.left ?? 0) * cols));
  const colEnd = Math.min(
    cols,
    Math.ceil((extra?.right ?? 1) * cols)
  );
  if (rowEnd <= rowStart || colEnd <= colStart) return null;

  let top = -1;
  let bottom = -1;
  let left = -1;
  let right = -1;

  for (let r = rowStart; r < rowEnd; r++) {
    for (let c = colStart; c < colEnd; c++) {
      if (!data[r * cols + c]) continue;
      if (top === -1) top = r;
      bottom = r;
      if (left === -1 || c < left) left = c;
      if (c > right) right = c;
    }
  }

  if (top === -1) return null;

  return clampRect({
    x: left / cols,
    y: top / rows,
    width: (right - left + 1) / cols,
    height: (bottom - top + 1) / rows,
  });
}

function padRect(rect: Rect, pad: number): Rect {
  return clampRect({
    x: rect.x - pad,
    y: rect.y - pad,
    width: rect.width + pad * 2,
    height: rect.height + pad * 2,
  });
}

function clusterRect(lines: PageTextLine[]): Rect | null {
  if (lines.length === 0) return null;
  let rect = lines[0].rect;
  for (const line of lines.slice(1)) rect = unionRect(rect, line.rect);
  return rect;
}

export type AnalyzePageInput = {
  items: AnalyzeItem[];
  blankBands: BlankBand[];
  inkGrid: InkGrid | null;
  /** Gentle platform prior used only to break ties between gutters. */
  labelHeightHint?: { min: number; max: number };
};

export type AnalyzePageResult = {
  regions: PageRegion[];
  lineCount: number;
};

/**
 * Detect likely label/invoice regions on one page.
 *
 * Strategy (safe, conservative):
 * 1. Group text into lines and classify them with shared label/invoice
 *    keywords; neutral lines are absorbed into the nearest seed above.
 * 2. Find full-width blank bands (gutters) between the two clusters.
 * 3. Refine each region with ink extents (captures borders, barcodes and QR
 *    codes that contain no text) inside the band belonging to that region.
 * 4. If the layout cannot be split reliably, fall back to the full page with
 *    low confidence so the user can select the region manually.
 */
export function analyzePage(input: AnalyzePageInput): AnalyzePageResult {
  const lines = groupLines(input.items);

  const labelSeeds = lines.filter(
    (l) => l.labelScore >= 2 && l.labelScore > l.invoiceScore
  );
  const invoiceSeeds = lines.filter(
    l => l.invoiceScore >= 2 && l.invoiceScore > l.labelScore
  );

  if (labelSeeds.length === 0 && invoiceSeeds.length === 0) {
    return {
      regions: [
        {
          kind: "full",
          rect: fullPageRect(),
          confidence: "low",
          source: "auto",
        },
      ],
      lineCount: lines.length,
    };
  }

  const avgLineHeight =
    lines.reduce((sum, l) => sum + l.rect.height, 0) / Math.max(lines.length, 1);

  const labelCluster = absorbNeighbors(lines, labelSeeds, invoiceSeeds, avgLineHeight);
  const invoiceCluster = absorbNeighbors(lines, invoiceSeeds, labelSeeds, avgLineHeight);

  const labelBox = clusterRect(labelCluster);
  const invoiceBox = clusterRect(invoiceCluster);

  // Both clusters intermixed spatially: splitting would risk cutting
  // content, so fall back to the full page with a manual-review flag.
  if (
    labelBox &&
    invoiceBox &&
    rectsOverlap(labelBox, invoiceBox) &&
    overlapRatio(labelBox, invoiceBox) > 0.35
  ) {
    return {
      regions: [
        {
          kind: "full",
          rect: fullPageRect(),
          confidence: "low",
          source: "auto",
        },
      ],
      lineCount: lines.length,
    };
  }

  const gutter = findGutter(
    input.blankBands,
    labelBox,
    invoiceBox,
    input.labelHeightHint
  );

  if (labelBox && invoiceBox && gutter) {
    const split = (gutter.yStart + gutter.yEnd) / 2;
    const labelRect = refineWithInk(
      input.inkGrid,
      padRect(labelBox, CLUSTER_PADDING),
      { yStart: 0, yEnd: split }
    );
    const invoiceRect = refineWithInk(
      input.inkGrid,
      padRect(invoiceBox, CLUSTER_PADDING),
      { yStart: split, yEnd: 1 }
    );
    return {
      regions: [
        {
          kind: "label",
          rect: clampRect({ ...labelRect, height: Math.min(labelRect.height, split - labelRect.y) }),
          confidence: "high",
          source: "auto",
        },
        {
          kind: "invoice",
          rect: clampRect({ ...invoiceRect, y: Math.max(invoiceRect.y, split) }),
          confidence: "high",
          source: "auto",
        },
      ],
      lineCount: lines.length,
    };
  }

  if (labelBox && invoiceBox) {
    // Clusters exist but no clean gutter separates them.
    return {
      regions: [
        {
          kind: "full",
          rect: fullPageRect(),
          confidence: "low",
          source: "auto",
        },
      ],
      lineCount: lines.length,
    };
  }

  if (labelBox) {
    const strong =
      labelCluster.reduce((s, l) => s + l.labelScore, 0) >= 3 &&
      lines.every((l) => l.invoiceScore === 0);
    const rect = refineWithInk(
      input.inkGrid,
      padRect(labelBox, CLUSTER_PADDING),
      { yStart: 0, yEnd: 1 }
    );
    return {
      regions: [
        {
          kind: "label",
          rect,
          confidence: strong ? "high" : "medium",
          source: "auto",
        },
      ],
      lineCount: lines.length,
    };
  }

  if (!invoiceBox) {
    return {
      regions: [
        {
          kind: "full",
          rect: fullPageRect(),
          confidence: "low",
          source: "auto",
        },
      ],
      lineCount: lines.length,
    };
  }

  const strong =
    invoiceCluster.reduce((s, l) => s + l.invoiceScore, 0) >= 4 &&
    lines.every((l) => l.labelScore === 0);
  const rect = refineWithInk(
    input.inkGrid,
    padRect(invoiceBox, CLUSTER_PADDING),
    { yStart: 0, yEnd: 1 }
  );
  return {
    regions: [
      {
        kind: "invoice",
        rect,
        confidence: strong ? "high" : "medium",
        source: "auto",
      },
    ],
    lineCount: lines.length,
  };
}

function absorbNeighbors(
  lines: PageTextLine[],
  seeds: PageTextLine[],
  otherSeeds: PageTextLine[],
  avgLineHeight: number
): PageTextLine[] {
  const result = [...seeds];
  if (seeds.length === 0) return result;

  const maxGap = Math.max(avgLineHeight * 3.5, 0.03);

  for (const line of lines) {
    if (seeds.includes(line) || otherSeeds.includes(line)) continue;
    let best: PageTextLine | null = null;
    let bestGap = Infinity;
    for (const seed of seeds) {
      const gap = line.rect.y - (seed.rect.y + seed.rect.height);
      if (gap < -0.01 || gap > maxGap) continue;
      if (gap < bestGap) {
        bestGap = gap;
        best = seed;
      }
    }
    if (best) result.push(line);
  }

  return result;
}

function overlapRatio(a: Rect, b: Rect): number {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.width, b.x + b.width);
  const y2 = Math.min(a.y + a.height, b.y + b.height);
  if (x2 <= x1 || y2 <= y1) return 0;
  const inter = (x2 - x1) * (y2 - y1);
  const smaller = Math.min(a.width * a.height, b.width * b.height);
  return smaller > 0 ? inter / smaller : 0;
}

function findGutter(
  bands: BlankBand[],
  labelBox: Rect | null,
  invoiceBox: Rect | null,
  hint?: { min: number; max: number }
): BlankBand | null {
  if (!labelBox || !invoiceBox || bands.length === 0) return null;
  const labelBottom = labelBox.y + labelBox.height;
  const invoiceTop = invoiceBox.y;
  const midpoint = (labelBottom + invoiceTop) / 2;

  let best: BlankBand | null = null;
  let bestScore = -Infinity;

  for (const band of bands) {
    const center = (band.yStart + band.yEnd) / 2;
    if (band.yEnd < labelBottom - GUTTER_TOLERANCE) continue;
    if (band.yStart > invoiceTop + GUTTER_TOLERANCE) continue;
    if (center < labelBottom - GUTTER_TOLERANCE) continue;
    if (center > invoiceTop + GUTTER_TOLERANCE) continue;

    let score = -Math.abs(center - midpoint) * 10;
    if (hint && center >= hint.min && center <= hint.max) score += 0.05;
    if (score > bestScore) {
      bestScore = score;
      best = band;
    }
  }

  return best;
}

function refineWithInk(
  grid: InkGrid | null,
  fallback: Rect,
  band: { yStart: number; yEnd: number }
): Rect {
  if (!grid) return fallback;
  const bandRect = { yStart: band.yStart, yEnd: band.yEnd };
  const ink = inkExtentsInBand(grid, bandRect);
  if (!ink) return clampRect(fallback);
  // Never let ink extents push the region outside its band or beyond the
  // padded text cluster by more than the padding we already added.
  const merged = unionRect(ink, {
    x: fallback.x,
    y: Math.max(fallback.y, band.yStart),
    width: fallback.width,
    height: Math.min(
      fallback.height,
      Math.max(band.yEnd - Math.max(fallback.y, band.yStart), 0)
    ),
  });
  return clampRect(padRect(merged, INK_PADDING));
}
