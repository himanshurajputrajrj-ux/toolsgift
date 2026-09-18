"use client";

import {
  ChangeEvent,
  DragEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { PDFDocument, rgb } from "pdf-lib";

type Redaction = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function PDFRedactor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<ArrayBuffer | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [redactions, setRedactions] = useState<Redaction[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [currentRect, setCurrentRect] = useState<Redaction | null>(null);

  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const MAX_SIZE = 50 * 1024 * 1024;

  const formatBytes = (bytes: number) => {
    if (!bytes) return "0 B";

    const units = ["B", "KB", "MB", "GB"];
    const index = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      units.length - 1
    );

    return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
  };

  const loadPDF = async (selectedFile: File) => {
    setError("");
    setResultUrl("");
    setRedactions([]);
    setCurrentPage(1);

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a valid PDF file.");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      setError("PDF must be 50MB or less.");
      return;
    }

    try {
      const bytes = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      setFile(selectedFile);
      setPdfBytes(bytes);
      setPageCount(pdf.getPageCount());
    } catch (err) {
      console.error(err);
      setError("Unable to read this PDF.");
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      loadPDF(selectedFile);
    }

    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      loadPDF(droppedFile);
    }
  };

  const getCanvasPoint = (
    e: MouseEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return { x: 0, y: 0 };
    }

    const rect = canvas.getBoundingClientRect();

    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const handleCanvasMouseDown = (
    e: MouseEvent<HTMLCanvasElement>
  ) => {
    if (!file) return;

    const point = getCanvasPoint(e);

    setDrawing(true);
    setStartPoint(point);

    setCurrentRect({
      id: Date.now(),
      x: point.x,
      y: point.y,
      width: 0,
      height: 0,
    });
  };

  const handleCanvasMouseMove = (
    e: MouseEvent<HTMLCanvasElement>
  ) => {
    if (!drawing) return;

    const point = getCanvasPoint(e);

    const x = Math.min(startPoint.x, point.x);
    const y = Math.min(startPoint.y, point.y);
    const width = Math.abs(point.x - startPoint.x);
    const height = Math.abs(point.y - startPoint.y);

    setCurrentRect({
      id: Date.now(),
      x,
      y,
      width,
      height,
    });
  };

  const handleCanvasMouseUp = (
    e: MouseEvent<HTMLCanvasElement>
  ) => {
    if (!drawing) return;

    const point = getCanvasPoint(e);

    const x = Math.min(startPoint.x, point.x);
    const y = Math.min(startPoint.y, point.y);
    const width = Math.abs(point.x - startPoint.x);
    const height = Math.abs(point.y - startPoint.y);

    setDrawing(false);
    setCurrentRect(null);

    if (width < 5 || height < 5) {
      return;
    }

    setRedactions((previous) => [
      ...previous,
      {
        id: Date.now(),
        x,
        y,
        width,
        height,
      },
    ]);
  };

  const removeRedaction = (id: number) => {
    setRedactions((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const clearRedactions = () => {
    setRedactions([]);
    setCurrentRect(null);
  };

  const renderPage = async () => {
    if (!pdfBytes || !canvasRef.current) return;

    try {
      const pdf = await PDFDocument.load(pdfBytes);
      const page = pdf.getPage(currentPage - 1);

      const width = page.getWidth();
      const height = page.getHeight();

      const canvas = canvasRef.current;

      const scale = Math.min(900 / width, 1200 / height);

      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /*
       * pdf-lib does not render the original PDF page.
       * This canvas therefore acts as a redaction placement surface.
       * A page preview image is not available directly from pdf-lib.
       */
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

      ctx.fillStyle = "#64748b";
      ctx.font = "bold 22px Arial";
      ctx.textAlign = "center";

      ctx.fillText(
        `PDF Page ${currentPage}`,
        canvas.width / 2,
        canvas.height / 2 - 10
      );

      ctx.font = "14px Arial";
      ctx.fillText(
        "Draw rectangles over areas you want to redact",
        canvas.width / 2,
        canvas.height / 2 + 20
      );

      for (const redaction of redactions) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(
          redaction.x,
          redaction.y,
          redaction.width,
          redaction.height
        );
      }

      if (currentRect) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(
          currentRect.x,
          currentRect.y,
          currentRect.width,
          currentRect.height
        );

        ctx.strokeStyle = "#2563eb";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          currentRect.x,
          currentRect.y,
          currentRect.width,
          currentRect.height
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    renderPage();
  }, [pdfBytes, currentPage, redactions, currentRect]);

  const applyRedactions = async () => {
    if (!pdfBytes) {
      setError("Please upload a PDF first.");
      return;
    }

    if (redactions.length === 0) {
      setError("Please draw at least one redaction area.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const pdf = await PDFDocument.load(pdfBytes);
      const pages = pdf.getPages();

      /*
       * Canvas coordinates are mapped proportionally
       * to the actual PDF page coordinates.
       */
      for (const redaction of redactions) {
        const page = pages[currentPage - 1];

        const pageWidth = page.getWidth();
        const pageHeight = page.getHeight();

        const canvas = canvasRef.current;

        if (!canvas) continue;

        const scaleX = pageWidth / canvas.width;
        const scaleY = pageHeight / canvas.height;

        const pdfX = redaction.x * scaleX;
        const pdfWidth = redaction.width * scaleX;
        const pdfHeight = redaction.height * scaleY;

        const pdfY =
          pageHeight -
          (redaction.y + redaction.height) * scaleY;

        page.drawRectangle({
          x: pdfX,
          y: pdfY,
          width: pdfWidth,
          height: pdfHeight,
          color: rgb(0, 0, 0),
          borderWidth: 0,
        });
      }

      const output = await pdf.save();

      const blob = new Blob([new Uint8Array(output).slice().buffer], { type: "application/pdf" });

      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }

      const url = URL.createObjectURL(blob);

      setResultUrl(url);
    } catch (err) {
      console.error(err);
      setError("Failed to create the redacted PDF.");
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setFile(null);
    setPdfBytes(null);
    setPageCount(0);
    setCurrentPage(1);
    setRedactions([]);
    setCurrentRect(null);
    setResultUrl("");
    setError("");
    setProcessing(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold text-blue-600">
            PDF TOOLS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Redact PDF
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Permanently cover sensitive areas of a PDF with
            black redaction boxes.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* Upload */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleInput}
              className="hidden"
            />

            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              ðŸ“„
            </div>

            <p className="font-semibold text-slate-800">
              {file ? "Replace PDF" : "Upload PDF"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Drag & drop or click to browse â€¢ Max 50MB
            </p>
          </div>

          {/* File info */}
          {file && (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="max-w-xl truncate text-sm font-semibold text-slate-800">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatBytes(file.size)} â€¢ {pageCount} pages
                  </p>
                </div>

                <button
                  type="button"
                  onClick={reset}
                  className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  Remove PDF
                </button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-900">
              How to redact
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-800">
              Select a page and drag your mouse over sensitive
              information. The selected areas will be permanently
              covered with black rectangles in the exported PDF.
            </p>
          </div>

          {/* Page selector */}
          {file && pageCount > 0 && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1)
                  )
                }
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                â† Previous
              </button>

              <span className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                Page {currentPage} / {pageCount}
              </span>

              <button
                type="button"
                disabled={currentPage >= pageCount}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(pageCount, page + 1)
                  )
                }
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next â†’
              </button>
            </div>
          )}

          {/* Redaction canvas */}
          <div className="mt-6">
            <div className="overflow-auto rounded-2xl border border-slate-200 bg-slate-100 p-4">
              <div className="flex min-h-[400px] items-center justify-center">
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onMouseLeave={() => {
                    if (drawing) {
                      setDrawing(false);
                      setCurrentRect(null);
                    }
                  }}
                  className={`max-h-[800px] max-w-full rounded-lg border border-slate-300 bg-white shadow-sm ${
                    file
                      ? "cursor-crosshair"
                      : "cursor-default"
                  }`}
                />

                {!file && (
                  <div className="absolute text-center">
                    <p className="text-sm font-medium text-slate-500">
                      PDF preview will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Redaction list */}
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div>
                <h2 className="font-semibold text-slate-800">
                  Redaction Areas
                </h2>

                <p className="text-xs text-slate-500">
                  {redactions.length} area(s) on current page
                </p>
              </div>

              <button
                type="button"
                onClick={clearRedactions}
                disabled={redactions.length === 0}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear Areas
              </button>
            </div>

            {redactions.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500">
                No redaction areas selected yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {redactions.map((redaction, index) => (
                  <div
                    key={redaction.id}
                    className="flex items-center justify-between gap-3 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Redaction {index + 1}
                      </p>

                      <p className="text-xs text-slate-500">
                        X: {Math.round(redaction.x)} â€¢ Y:{" "}
                        {Math.round(redaction.y)} â€¢ W:{" "}
                        {Math.round(redaction.width)} â€¢ H:{" "}
                        {Math.round(redaction.height)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeRedaction(redaction.id)
                      }
                      className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action */}
          <button
            type="button"
            onClick={applyRedactions}
            disabled={
              !file ||
              redactions.length === 0 ||
              processing
            }
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing
              ? "Creating Redacted PDF..."
              : "Apply Redactions & Create PDF"}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Result */}
          <div className="mt-8">
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              Result
            </h2>

            {!resultUrl ? (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 text-center">
                <div>
                  <div className="mb-3 text-4xl">ðŸ”’</div>

                  <p className="font-medium text-slate-700">
                    Redacted PDF will appear here
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Create the redacted PDF to preview it here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <iframe
                  src={resultUrl}
                  title="Redacted PDF Preview"
                  className="h-[600px] w-full"
                />
              </div>
            )}
          </div>

          {/* Download â€” always visible */}
          <a
            href={resultUrl || undefined}
            download="redacted.pdf"
            aria-disabled={!resultUrl}
            onClick={(e) => {
              if (!resultUrl) {
                e.preventDefault();
              }
            }}
            className={`mt-5 block w-full rounded-xl px-5 py-3.5 text-center text-sm font-semibold transition ${
              resultUrl
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >
            Download Redacted PDF
          </a>

          {/* Reset */}
          <button
            type="button"
            onClick={reset}
            className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Clear & Reset
          </button>
        </div>
      </div>
    </section>
  );
}

