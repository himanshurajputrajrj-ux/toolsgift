export async function loadPdfWorkerSrc(): Promise<string> {
  const asset = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url);
  return String(asset);
}
