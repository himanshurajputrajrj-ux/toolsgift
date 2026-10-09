import { loadPdfWorkerSrc } from "@/app/lib/pdfWorker";
import { normalizeRotation, type Rotation } from "./geometry";
import type { AnalyzeItem, BlankBand, InkGrid } from "./analyze";

export const ANALYSIS_RENDER_WIDTH = 700;
const THUMB_RENDER_WIDTH = 480;
const WHITE_SUM_THRESHOLD = 24;
const BLANK_ROW_FRACTION = 0.004;
const MIN_GUTTER_ROWS = 6;

/** Minimal structural view of a pdf.js page (keeps us independent of its types). */
type PdfjsPageLike = {
  pageNumber: number;
  rotate?: number;
  getViewport(opts: { scale: number }): {
    width: number;
    height: number;
    transform: number[];
  };
  getTextContent(): Promise<{
    items: Array<{ str?: string; transform: number[]; width?: number }>;
  }>;
  render(opts: {
    canvasContext: CanvasRenderingContext2D;
    viewport: unknown;
    background?: string;
  }): { promise: Promise<void> };
  cleanup(): void;
};

type PdfjsDocLike = {
  numPages: number;
  getPage(pageNumber: number): Promise<PdfjsPageLike>;
  destroy(): void;
};

export type ExtractedPage = {
  pageNumber: number;
  rotation: Rotation;
  displayWidthPt: number;
  displayHeightPt: number;
  items: AnalyzeItem[];
  blankBands: BlankBand[];
  inkGrid: InkGrid | null;
  thumbUrl: string;
};

export type LoadedPdf = {
  numPages: number;
  getPage(pageNumber: number): Promise<ExtractedPage>;
  destroy(): void;
};

export async function loadPdfForAnalysis(
  data: ArrayBuffer
): Promise<LoadedPdf> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = await loadPdfWorkerSrc();

  // pdf.js may detach the buffer it receives; pass a copy and keep the
  // caller's original bytes untouched for later pdf-lib processing.
  const doc: PdfjsDocLike = (await pdfjs.getDocument({
    data: new Uint8Array(data.slice(0)),
  }).promise) as unknown as PdfjsDocLike;

  const util = pdfjs.Util;

  return {
    numPages: doc.numPages,
    async getPage(pageNumber: number): Promise<ExtractedPage> {
      const page = await doc.getPage(pageNumber);
      try {
        return await extractPage(util, page);
      } finally {
        page.cleanup();
      }
    },
    destroy() {
      doc.destroy();
    },
  };
}

async function extractPage(
  util: { transform(a: number[], b: number[]): number[] },
  page: PdfjsPageLike
): Promise<ExtractedPage> {
  const rotation = normalizeRotation(page.rotate ?? 0);
  const viewport = page.getViewport({ scale: 1 });
  const displayWidthPt = viewport.width;
  const displayHeightPt = viewport.height;

  const items = await extractTextItems(
    util,
    page,
    viewport,
    displayWidthPt,
    displayHeightPt
  );

  const scale = Math.min(
    ANALYSIS_RENDER_WIDTH / Math.max(displayWidthPt, 1),
    2
  );
  const analysisViewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(analysisViewport.width));
  canvas.height = Math.max(1, Math.floor(analysisViewport.height));
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas is not supported in this browser.");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({
    canvasContext: ctx,
    viewport: analysisViewport,
    background: "#ffffff",
  }).promise;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const inkGrid = buildInkGrid(imageData);
  const blankBands = buildBlankBands(inkGrid);
  const thumbUrl = renderThumbUrl(canvas);

  return {
    pageNumber: page.pageNumber,
    rotation,
    displayWidthPt,
    displayHeightPt,
    items,
    blankBands,
    inkGrid,
    thumbUrl,
  };
}

async function extractTextItems(
  util: { transform(a: number[], b: number[]): number[] },
  page: PdfjsPageLike,
  viewport: { transform: number[] },
  displayWidthPt: number,
  displayHeightPt: number
): Promise<AnalyzeItem[]> {
  const items: AnalyzeItem[] = [];
  const textContent = await page.getTextContent();

  for (const raw of textContent.items) {
    if (
      !raw.str ||
      typeof raw.str !== "string" ||
      !raw.str.trim() ||
      !Array.isArray(raw.transform)
    ) {
      continue;
    }
    const tx = util.transform(viewport.transform, raw.transform);
    const fontHeight = Math.hypot(tx[2], tx[3]);
    const width = Math.abs(raw.width ?? 0);

    items.push({
      str: raw.str,
      rect: {
        x: clampNorm(tx[4] / displayWidthPt),
        y: clampNorm((tx[5] - fontHeight) / displayHeightPt),
        width: clampNorm(width / displayWidthPt),
        height: clampNorm(fontHeight / displayHeightPt),
      },
    });
  }

  return items;
}

function clampNorm(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), 1);
}

export function buildInkGrid(imageData: ImageData): InkGrid {
  const { width, height, data } = imageData;
  const cols = Math.min(width, 220);
  const rows = Math.min(height, 320);
  const grid = new Uint8Array(cols * rows);
  const cellW = width / cols;
  const cellH = height / rows;

  for (let y = 0; y < height; y++) {
    const row = Math.min(rows - 1, Math.floor(y / cellH));
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const deviation =
        255 - data[idx] + (255 - data[idx + 1]) + (255 - data[idx + 2]);
      if (deviation > WHITE_SUM_THRESHOLD) {
        const col = Math.min(cols - 1, Math.floor(x / cellW));
        grid[row * cols + col] = 1;
      }
    }
  }

  return { cols, rows, data: grid };
}

export function buildBlankBands(grid: InkGrid): BlankBand[] {
  const { cols, rows, data } = grid;
  const bands: BlankBand[] = [];
  let start = -1;

  for (let r = 0; r <= rows; r++) {
    let inkCount = 0;
    if (r < rows) {
      const base = r * cols;
      for (let c = 0; c < cols; c++) {
        if (data[base + c]) inkCount++;
      }
    }
    const isBlank = r < rows && inkCount / cols <= BLANK_ROW_FRACTION;

    if (isBlank && start === -1) {
      start = r;
    } else if (!isBlank && start !== -1) {
      if (r - start >= MIN_GUTTER_ROWS) {
        bands.push({ yStart: start / rows, yEnd: r / rows });
      }
      start = -1;
    }
  }

  return bands;
}

function renderThumbUrl(canvas: HTMLCanvasElement): string {
  const scale = Math.min(1, THUMB_RENDER_WIDTH / Math.max(canvas.width, 1));
  if (scale >= 0.999) return canvas.toDataURL("image/jpeg", 0.85);

  const thumb = document.createElement("canvas");
  thumb.width = Math.max(1, Math.floor(canvas.width * scale));
  thumb.height = Math.max(1, Math.floor(canvas.height * scale));
  const ctx = thumb.getContext("2d");
  if (!ctx) return canvas.toDataURL("image/jpeg", 0.85);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, thumb.width, thumb.height);
  ctx.drawImage(canvas, 0, 0, thumb.width, thumb.height);
  return thumb.toDataURL("image/jpeg", 0.85);
}
