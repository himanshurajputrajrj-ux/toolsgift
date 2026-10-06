const TESSERACT_PUBLIC_BASE = "/tesseract";

function toOriginUrl(pathname: string): string {
  if (typeof window === "undefined") {
    return pathname;
  }
  return `${window.location.origin}${pathname}`;
}

export function getTesseractWorkerOptions() {
  return {
    workerPath: toOriginUrl(`${TESSERACT_PUBLIC_BASE}/worker.min.js`),
    corePath: toOriginUrl(`${TESSERACT_PUBLIC_BASE}/core`),
    langPath: toOriginUrl(`${TESSERACT_PUBLIC_BASE}/lang`),
  };
}
