import type { Rect } from "./types";

export type Rotation = 0 | 90 | 180 | 270;

/** Crop/media box of a source page in unrotated PDF user space. */
export type BoxRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BoundingBox = {
  left: number;
  bottom: number;
  right: number;
  top: number;
};

export type DrawPlan = {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Counter-clockwise rotation in degrees for pdf-lib's `degrees()`. */
  rotateDeg: number;
  scale: number;
  visualWidth: number;
  visualHeight: number;
};

export function normalizeRotation(angle: number): Rotation {
  const a = ((Math.round(angle / 90) * 90) % 360 + 360) % 360;
  if (a === 90 || a === 180 || a === 270) return a;
  return 0;
}

/** Size of the page as displayed by a viewer (after /Rotate is applied). */
export function displayedPageSize(
  box: BoxRect,
  rotation: Rotation
): { width: number; height: number } {
  return rotation % 180 === 0
    ? { width: box.width, height: box.height }
    : { width: box.height, height: box.width };
}

export function clampRect(rect: Rect): Rect {
  const x = Math.min(Math.max(rect.x, 0), 1);
  const y = Math.min(Math.max(rect.y, 0), 1);
  const width = Math.min(Math.max(rect.width, 0), 1 - x);
  const height = Math.min(Math.max(rect.height, 0), 1 - y);
  return { x, y, width, height };
}

export function fullPageRect(): Rect {
  return { x: 0, y: 0, width: 1, height: 1 };
}

export function rectsOverlap(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.width &&
    b.x < a.x + a.width &&
    a.y < b.y + b.height &&
    b.y < a.y + a.height
  );
}

export function unionRect(a: Rect, b: Rect): Rect {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  const right = Math.max(a.x + a.width, b.x + b.width);
  const bottom = Math.max(a.y + a.height, b.y + b.height);
  return { x, y, width: right - x, height: bottom - y };
}

/**
 * Convert a normalized displayed-space rectangle (top-left origin) into an
 * absolute unrotated user-space bounding box for pdf-lib's `embedPage`.
 *
 * Displayed coordinates are what the user sees in the preview (the page
 * already rotated by /Rotate), so this mapping keeps the crop exactly where
 * it was selected regardless of page rotation.
 */
export function rectToBBox(
  rect: Rect,
  box: BoxRect,
  rotation: Rotation
): BoundingBox {
  const r = clampRect(rect);
  const cw = box.width;
  const ch = box.height;
  const disp = displayedPageSize(box, rotation);
  const dx = r.x * disp.width;
  const dy = r.y * disp.height;
  const ddw = r.width * disp.width;
  const ddh = r.height * disp.height;

  switch (rotation) {
    case 90:
      return {
        left: box.x + dy,
        right: box.x + dy + ddh,
        bottom: box.y + dx,
        top: box.y + dx + ddw,
      };
    case 180:
      return {
        left: box.x + cw - (dx + ddw),
        right: box.x + cw - dx,
        bottom: box.y + dy,
        top: box.y + dy + ddh,
      };
    case 270:
      return {
        left: box.x + cw - (dy + ddh),
        right: box.x + cw - dy,
        bottom: box.y + ch - (dx + ddw),
        top: box.y + ch - dx,
      };
    case 0:
    default:
      return {
        left: box.x + dx,
        right: box.x + dx + ddw,
        bottom: box.y + ch - (dy + ddh),
        top: box.y + ch - dy,
      };
  }
}

/**
 * Compute the pdf-lib `drawPage` options that place an embedded (cropped)
 * page proportionally centered on an output page of exact physical size.
 *
 * - Never stretches: a single uniform scale factor is used.
 * - Never silently cuts: contain-fit keeps the whole crop inside the output
 *   page with a margin.
 * - Reproduces the page's displayed orientation (pdf-lib's embedPage drops
 *   /Rotate, so the rotation is re-applied while drawing).
 *
 * pdf-lib's page embedder translates the bounding-box origin to (0,0) with
 * its default form matrix, so (x, y) anchors the unrotated bottom-left
 * corner of the crop; the per-rotation offsets below place the visual
 * bounding rectangle centered on the output page.
 */
export function computeDrawPlan(input: {
  rotation: Rotation;
  bboxWidth: number;
  bboxHeight: number;
  /** Displayed size of the cropped region (after rotation). */
  cropWidth: number;
  cropHeight: number;
  outputWidth: number;
  outputHeight: number;
  margin: number;
}): DrawPlan {
  const {
    rotation,
    bboxWidth,
    bboxHeight,
    cropWidth,
    cropHeight,
    outputWidth: outW,
    outputHeight: outH,
    margin,
  } = input;

  if (
    bboxWidth <= 0 ||
    bboxHeight <= 0 ||
    cropWidth <= 0 ||
    cropHeight <= 0 ||
    outW <= 0 ||
    outH <= 0
  ) {
    throw new Error("Invalid dimensions for draw plan.");
  }

  const availableW = Math.max(outW - margin * 2, 1);
  const availableH = Math.max(outH - margin * 2, 1);
  const scale = Math.min(availableW / cropWidth, availableH / cropHeight);

  const visualWidth = scale * cropWidth;
  const visualHeight = scale * cropHeight;
  const left = (outW - visualWidth) / 2;
  const bottom = (outH - visualHeight) / 2;

  const width = scale * bboxWidth;
  const height = scale * bboxHeight;

  switch (rotation) {
    case 90:
      return {
        x: left,
        y: bottom + visualHeight,
        width,
        height,
        rotateDeg: 270,
        scale,
        visualWidth,
        visualHeight,
      };
    case 180:
      return {
        x: left + visualWidth,
        y: bottom + visualHeight,
        width,
        height,
        rotateDeg: 180,
        scale,
        visualWidth,
        visualHeight,
      };
    case 270:
      return {
        x: left + visualWidth,
        y: bottom,
        width,
        height,
        rotateDeg: 90,
        scale,
        visualWidth,
        visualHeight,
      };
    case 0:
    default:
      return {
        x: left,
        y: bottom,
        width,
        height,
        rotateDeg: 0,
        scale,
        visualWidth,
        visualHeight,
      };
  }
}
