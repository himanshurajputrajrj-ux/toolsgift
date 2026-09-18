"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function PDFUnlocker() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [pageCount, setPageCount] = useState(0);
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

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      setError("PDF size must be 50MB or less.");
      return;
    }

    try {
      const bytes = await selectedFile.arrayBuffer();

      const pdf = await PDFDocument.load(bytes, {
        ignoreEncryption: true,
      });

      setFile(selectedFile);
      setPageCount(pdf.getPageCount());
    } catch (err) {
      console.error(err);
      setError(
        "This PDF could not be opened. If it has a strong password or unsupported encryption, it cannot be unlocked in the browser."
      );
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

  const unlockPDF = async () => {
    if (!file) return;

    setProcessing(true);
    setError("");
    setResultUrl("");

    try {
      const bytes = await file.arrayBuffer();

      const pdf = await PDFDocument.load(bytes, {
        ignoreEncryption: true,
      });

      // Create a fresh PDF and copy every page into it.
      // This removes the encryption/security wrapper when
      // the source PDF can be opened by pdf-lib.
      const unlockedPDF = await PDFDocument.create();

      const pages = await unlockedPDF.copyPages(
        pdf,
        pdf.getPageIndices()
      );

      pages.forEach((page) => {
        unlockedPDF.addPage(page);
      });

      const outputBytes = await unlockedPDF.save({
        useObjectStreams: true,
      });

      const blob = new Blob([new Uint8Array(outputBytes).slice().buffer], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setResultSize(blob.size);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to unlock this PDF. Password-protected or unsupported encrypted PDFs may require the original password or a desktop PDF application."
      );
    } finally {
      setProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (!resultUrl) return;

    const link = document.createElement("a");

    link.href = resultUrl;
    link.download = `${file?.name.replace(/\.pdf$/i, "") || "unlocked"}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeFile = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setFile(null);
    setResultUrl("");
    setResultSize(0);
    setPageCount(0);
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
            Unlock PDF
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Remove PDF security restrictions from supported files and create
            a new downloadable PDF.
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
              🔓
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              Upload PDF
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Drag & drop your PDF here or click to browse
            </p>

            <p className="mt-2 text-xs text-slate-400">
              PDF • Maximum 50MB
            </p>
          </div>

          {/* File Info */}
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

          {/* Info */}
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex gap-3">
              <span className="text-lg">ℹ️</span>

              <div>
                <p className="text-sm font-semibold text-amber-900">
                  Browser-based unlocking
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-800">
                  This tool works with PDFs that can be opened by the browser
                  PDF engine. A PDF requiring an unknown user password cannot
                  be legitimately bypassed here.
                </p>
              </div>
            </div>
          </div>

          {/* Action */}
          <button
            type="button"
            onClick={unlockPDF}
            disabled={!file || processing}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing ? "Unlocking PDF..." : "Unlock PDF"}
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
                Unlocked PDF
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
                  title="Unlocked PDF Preview"
                  className="h-[600px] w-full bg-white"
                />
              ) : (
                <div className="flex min-h-[280px] items-center justify-center px-6 text-center">
                  <div>
                    <div className="mb-3 text-4xl">🔓</div>

                    <p className="font-medium text-slate-700">
                      Your unlocked PDF will appear here
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Upload a PDF and click Unlock PDF.
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
              Download Unlocked PDF
            </button>
          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={removeFile}
            className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Clear & Reset
          </button>
        </div>
      </div>
    </section>
  );
}


