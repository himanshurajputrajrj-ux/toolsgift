"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export default function PDFPageNumbers() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);

  const [position, setPosition] =
    useState<Position>("bottom-center");

  const [startNumber, setStartNumber] = useState(1);
  const [fontSize, setFontSize] = useState(12);
  const [margin, setMargin] = useState(20);
  const [prefix, setPrefix] = useState("");

  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);

  const [processing, setProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

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

  const handleFile = async (selectedFile: File) => {
    setError("");
    setResultUrl("");
    setResultSize(0);
    setPageCount(0);

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a valid PDF file.");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      setError("PDF size must be 50MB or less.");
      return;
    }

    try {
      const bytes = await selectedFile.arrayBuffer();

      const pdf = await PDFDocument.load(bytes);

      setFile(selectedFile);
      setPageCount(pdf.getPageCount());
    } catch (err) {
      console.error(err);
      setError("Unable to open this PDF. Please select a valid PDF.");
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    const selectedFile = e.dataTransfer.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const addPageNumbers = async () => {
    if (!file) {
      setError("Please upload a PDF first.");
      return;
    }

    setProcessing(true);
    setError("");
    setResultUrl("");
    setResultSize(0);

    try {
      const bytes = await file.arrayBuffer();

      const pdf = await PDFDocument.load(bytes);
      const font = await pdf.embedFont(StandardFonts.Helvetica);

      const pages = pdf.getPages();

      pages.forEach((page, index) => {
        const { width, height } = page.getSize();

        const pageNumber = `${prefix}${startNumber + index}`;
        const textWidth = font.widthOfTextAtSize(
          pageNumber,
          fontSize
        );

        let x = margin;
        let y = margin;

        switch (position) {
          case "top-left":
            x = margin;
            y = height - margin - fontSize;
            break;

          case "top-center":
            x = (width - textWidth) / 2;
            y = height - margin - fontSize;
            break;

          case "top-right":
            x = width - margin - textWidth;
            y = height - margin - fontSize;
            break;

          case "bottom-left":
            x = margin;
            y = margin;
            break;

          case "bottom-center":
            x = (width - textWidth) / 2;
            y = margin;
            break;

          case "bottom-right":
            x = width - margin - textWidth;
            y = margin;
            break;
        }

        page.drawText(pageNumber, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.25, 0.25, 0.25),
        });
      });

      const outputBytes = await pdf.save();

      const blob = new Blob([new Uint8Array(outputBytes).slice().buffer], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setResultSize(blob.size);
    } catch (err) {
      console.error(err);
      setError("Failed to add page numbers to the PDF.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (!resultUrl) return;

    const link = document.createElement("a");

    link.href = resultUrl;

    link.download = `${
      file?.name.replace(/\.pdf$/i, "") || "document"
    }-numbered.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeFile = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setFile(null);
    setPageCount(0);
    setResultUrl("");
    setResultSize(0);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold text-blue-600">
            PDF TOOLS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Add PDF Page Numbers
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Add page numbers to every page of your PDF with customizable
            position, size, margin, and starting number.
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

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
              ðŸ”¢
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              Upload PDF
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Drag & drop your PDF here or click to browse
            </p>

            <p className="mt-2 text-xs text-slate-400">
              PDF â€¢ Maximum 50MB
            </p>
          </div>

          {/* File info */}
          {file && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-800">
                    {file.name}
                  </p>

                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span>{formatBytes(file.size)}</span>
                    <span>{pageCount} pages</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Position
              </label>

              <select
                value={position}
                onChange={(e) =>
                  setPosition(e.target.value as Position)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="top-left">Top Left</option>
                <option value="top-center">Top Center</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Starting Number
              </label>

              <input
                type="number"
                min="0"
                value={startNumber}
                onChange={(e) =>
                  setStartNumber(
                    Math.max(0, Number(e.target.value))
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Font Size: {fontSize}px
              </label>

              <input
                type="range"
                min="8"
                max="30"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="mt-3 w-full accent-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Margin: {margin} mm
              </label>

              <input
                type="range"
                min="5"
                max="50"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="mt-3 w-full accent-blue-600"
              />
            </div>
          </div>

          {/* Prefix */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Prefix
            </label>

            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="Example: Page "
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <p className="mt-1 text-xs text-slate-400">
              Example output: Page 1, Page 2, Page 3...
            </p>
          </div>

          {/* Action */}
          <button
            type="button"
            onClick={addPageNumbers}
            disabled={!file || processing}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing
              ? "Adding Page Numbers..."
              : "Add Page Numbers"}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Result */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Numbered PDF
              </h2>

              {resultSize > 0 && (
                <span className="text-sm text-slate-500">
                  {formatBytes(resultSize)}
                </span>
              )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              {resultUrl ? (
                <iframe
                  src={resultUrl}
                  title="Numbered PDF Preview"
                  className="h-[600px] w-full bg-white"
                />
              ) : (
                <div className="flex min-h-[280px] items-center justify-center px-6 text-center">
                  <div>
                    <div className="mb-3 text-4xl">ðŸ”¢</div>

                    <p className="font-medium text-slate-700">
                      Your numbered PDF will appear here
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Upload a PDF and click Add Page Numbers.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Download ALWAYS visible */}
            <button
              type="button"
              onClick={downloadPDF}
              disabled={!resultUrl}
              className="mt-4 w-full rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Download Numbered PDF
            </button>
          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={removeFile}
            className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Clear & Reset
          </button>
        </div>
      </div>
    </section>
  );
}

