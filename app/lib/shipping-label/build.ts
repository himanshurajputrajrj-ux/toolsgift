import type { Rect } from "./types";
import {
  computeDrawPlan,
  displayedPageSize,
  normalizeRotation,
  rectToBBox,
} from "./geometry";
import { DEFAULT_MARGIN_PT } from "./sizes";

export const BUILD_ERROR_CORRUPT = "SHIPPING_LABEL_CORRUPT_PDF";
export const BUILD_ERROR_EMPTY = "SHIPPING_LABEL_NO_PAGES";

export type BuildPageSpec = {
  /** 0-based index of the page in the source PDF. */
  sourcePageIndex: number;
  /** Selected region in normalized displayed-page coordinates. */
  rect: Rect;
};

export type BuildResult = {
  bytes: Uint8Array;
  pageCount: number;
};

/**
 * Build a print-ready output PDF from selected regions of a source PDF.
 *
 * Uses PDF-native operations only (pdf-lib `embedPage` + `drawPage`):
 * vector content, fonts, barcodes and QR codes stay sharp. Each source page
 * is cropped to the selected region first, then proportionally fitted
 * (contain, never stretched, never cut) onto an output page with the exact
 * physical dimensions requested.
 */
export async function buildShippingLabelPdf(options: {
  sourceBytes: ArrayBuffer;
  pages: BuildPageSpec[];
  outputWidthPt: number;
  outputHeightPt: number;
  marginPt?: number;
  onProgress?: (done: number, total: number) => void;
}): Promise<BuildResult> {
  const {
    sourceBytes,
    pages,
    outputWidthPt,
    outputHeightPt,
    marginPt = DEFAULT_MARGIN_PT,
    onProgress,
  } = options;

  if (pages.length === 0) {
    throw new Error(BUILD_ERROR_EMPTY);
  }

  const { PDFDocument, degrees } = await import("pdf-lib");

  let source;
  try {
    source = await PDFDocument.load(sourceBytes);
  } catch {
    throw new Error(BUILD_ERROR_CORRUPT);
  }

  const sourcePages = source.getPages();
  const output = await PDFDocument.create();
  const embedCache = new Map<
    string,
    Awaited<ReturnType<typeof output.embedPage>>
  >();

  let done = 0;

  for (const spec of pages) {
    const sourcePage = sourcePages[spec.sourcePageIndex];
    if (!sourcePage) {
      throw new Error(BUILD_ERROR_CORRUPT);
    }

    const rotation = normalizeRotation(sourcePage.getRotation().angle);
    const cropBox = sourcePage.getCropBox();
    const box = {
      x: cropBox.x,
      y: cropBox.y,
      width: cropBox.width,
      height: cropBox.height,
    };

    const bbox = rectToBBox(spec.rect, box, rotation);
    const bboxWidth = bbox.right - bbox.left;
    const bboxHeight = bbox.top - bbox.bottom;
    if (bboxWidth <= 2 || bboxHeight <= 2) {
      throw new Error("Crop region is too small. Please adjust the selection.");
    }

    const display = displayedPageSize(box, rotation);
    const cropWidth = spec.rect.width * display.width;
    const cropHeight = spec.rect.height * display.height;

    const cacheKey = `${spec.sourcePageIndex}:${spec.rect.x.toFixed(4)}:${spec.rect.y.toFixed(4)}:${spec.rect.width.toFixed(4)}:${spec.rect.height.toFixed(4)}`;
    let embedded = embedCache.get(cacheKey);
    if (!embedded) {
      embedded = await output.embedPage(sourcePage, bbox);
      embedCache.set(cacheKey, embedded);
    }

    const outPage = output.addPage([outputWidthPt, outputHeightPt]);
    const plan = computeDrawPlan({
      rotation,
      bboxWidth,
      bboxHeight,
      cropWidth,
      cropHeight,
      outputWidth: outputWidthPt,
      outputHeight: outputHeightPt,
      margin: marginPt,
    });

    outPage.drawPage(embedded, {
      x: plan.x,
      y: plan.y,
      width: plan.width,
      height: plan.height,
      rotate: degrees(plan.rotateDeg),
    });

    done++;
    onProgress?.(done, pages.length);
  }

  const bytes = await output.save();
  return { bytes, pageCount: pages.length };
}
