"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { PDFDocument } from "pdf-lib";

export default function PDFCropper() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<ArrayBuffer | null>(null);
  const [pageCount, setPageCount] = useState(0);

  const [left, setLeft] = useState(20);
  const [right, setRight] = useState(20);
  const [top, setTop] = useState(20);
  const [bottom, setBottom] = useState(20);

  const [applyToAll, setApplyToAll] = useState(true);
  const [selectedPage, setSelectedPage] = useState(1);

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

    return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${
      units[index]
    }`;
  };

  const loadPDF = async (selectedFile: File) => {
    setError("");
    setResultUrl("");

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
      setSelectedPage(1);
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

  const cropPDF = async () => {
    if (!pdfBytes) {
      setError("Please upload a PDF first.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const pdf = await PDFDocument.load(pdfBytes);
      const pages = pdf.getPages();

      const targets = applyToAll
        ? pages
        : [pages[selectedPage - 1]];

      for (const page of targets) {
        const width = page.getWidth();
        const height = page.getHeight();

        const cropLeft = Math.max(0, left);
        const cropRight = Math.max(0, right);
        const cropTop = Math.max(0, top);
        const cropBottom = Math.max(0, bottom);

        const newWidth = width - cropLeft - cropRight;
        const newHeight = height - cropTop - cropBottom;

        if (newWidth <= 20 || newHeight <= 20) {
          throw new Error(
            "Crop values are too large for the selected page."
          );
        }

        page.setCropBox(
          cropLeft,
          cropBottom,
          newWidth,
          newHeight
        );
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

      if (
        err instanceof Error &&
        err.message.includes("too large")
      ) {
        setError(err.message);
      } else {
        setError("Failed to crop the PDF.");
      }
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
    setSelectedPage(1);

    setLeft(20);
    setRight(20);
    setTop(20);
    setBottom(20);

    setApplyToAll(true);
    setResultUrl("");
    setError("");
    setProcessing(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }
    };
  }, [resultUrl]);

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold text-blue-600">
            PDF TOOLS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Crop PDF
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Crop PDF pages by removing unwanted margins from the
            top, bottom, left, and right sides.
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
              âœ‚ï¸
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

          {/* Settings */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="mb-4 text-lg font-bold text-slate-900">
              Crop Settings
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Left */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Left Margin (pt)
                </span>

                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={left}
                  onChange={(e) =>
                    setLeft(Number(e.target.value) || 0)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </label>

              {/* Right */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Right Margin (pt)
                </span>

                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={right}
                  onChange={(e) =>
                    setRight(Number(e.target.value) || 0)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </label>

              {/* Top */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Top Margin (pt)
                </span>

                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={top}
                  onChange={(e) =>
                    setTop(Number(e.target.value) || 0)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </label>

              {/* Bottom */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Bottom Margin (pt)
                </span>

                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={bottom}
                  onChange={(e) =>
                    setBottom(Number(e.target.value) || 0)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </label>
            </div>

            {/* Apply option */}
            <div className="mt-5">
              <p className="mb-3 text-sm font-semibold text-slate-700">
                Apply Crop To
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setApplyToAll(true)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    applyToAll
                      ? "bg-blue-600 text-white"
                      : "border border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  All Pages
                </button>

                <button
                  type="button"
                  onClick={() => setApplyToAll(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    !applyToAll
                      ? "bg-blue-600 text-white"
                      : "border border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  Selected Page
                </button>
              </div>
            </div>

            {/* Page selector */}
            {!applyToAll && file && pageCount > 0 && (
              <div className="mt-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Select Page
                  </span>

                  <select
                    value={selectedPage}
                    onChange={(e) =>
                      setSelectedPage(Number(e.target.value))
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    {Array.from(
                      { length: pageCount },
                      (_, index) => (
                        <option
                          key={index + 1}
                          value={index + 1}
                        >
                          Page {index + 1}
                        </option>
                      )
                    )}
                  </select>
                </label>
              </div>
            )}

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Values are measured in PDF points. 72 points =
              approximately 1 inch.
            </p>
          </div>

          {/* Action */}
          <button
            type="button"
            onClick={cropPDF}
            disabled={!file || processing}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing
              ? "Cropping PDF..."
              : "Crop PDF"}
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
                  <div className="mb-3 text-4xl">ðŸ“„</div>

                  <p className="font-medium text-slate-700">
                    Cropped PDF will appear here
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Set your crop values and process the PDF.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <iframe
                  src={resultUrl}
                  title="Cropped PDF Preview"
                  className="h-[600px] w-full"
                />
              </div>
            )}
          </div>

          {/* Download always visible */}
          <a
            href={resultUrl || undefined}
            download="cropped.pdf"
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
            Download Cropped PDF
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


