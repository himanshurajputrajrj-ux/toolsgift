"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";

type PageItem = {
  id: string;
  originalIndex: number;
};

export default function PDFOrganizer() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
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

  const loadPDF = async (selectedFile: File) => {
    setError("");
    setResultUrl("");
    setResultSize(0);

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

      const pageItems: PageItem[] = pdf
        .getPageIndices()
        .map((index) => ({
          id: `${index}-${Date.now()}-${Math.random()}`,
          originalIndex: index,
        }));

      setFile(selectedFile);
      setPages(pageItems);
    } catch (err) {
      console.error(err);
      setError("Unable to open this PDF. Please select a valid PDF.");
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      loadPDF(selectedFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    const selectedFile = e.dataTransfer.files?.[0];

    if (selectedFile) {
      loadPDF(selectedFile);
    }
  };

  const movePage = (index: number, direction: "up" | "down") => {
    const newPages = [...pages];

    if (direction === "up" && index > 0) {
      [newPages[index - 1], newPages[index]] = [
        newPages[index],
        newPages[index - 1],
      ];
    }

    if (direction === "down" && index < newPages.length - 1) {
      [newPages[index + 1], newPages[index]] = [
        newPages[index],
        newPages[index + 1],
      ];
    }

    setPages(newPages);
    setResultUrl("");
    setResultSize(0);
  };

  const deletePage = (index: number) => {
    if (pages.length <= 1) {
      setError("A PDF must contain at least one page.");
      return;
    }

    setPages(pages.filter((_, i) => i !== index));
    setResultUrl("");
    setResultSize(0);
    setError("");
  };

  const duplicatePage = (index: number) => {
    const page = pages[index];

    const duplicate: PageItem = {
      id: `${page.originalIndex}-${Date.now()}-${Math.random()}`,
      originalIndex: page.originalIndex,
    };

    const newPages = [...pages];

    newPages.splice(index + 1, 0, duplicate);

    setPages(newPages);
    setResultUrl("");
    setResultSize(0);
    setError("");
  };

  const reversePages = () => {
    setPages([...pages].reverse());
    setResultUrl("");
    setResultSize(0);
  };

  const resetOrder = () => {
    setPages(
      pages
        .slice()
        .sort((a, b) => a.originalIndex - b.originalIndex)
    );

    setResultUrl("");
    setResultSize(0);
    setError("");
  };

  const organizePDF = async () => {
    if (!file || pages.length === 0) {
      setError("Please upload a PDF first.");
      return;
    }

    setProcessing(true);
    setError("");
    setResultUrl("");
    setResultSize(0);

    try {
      const bytes = await file.arrayBuffer();
      const sourcePDF = await PDFDocument.load(bytes);
      const outputPDF = await PDFDocument.create();

      for (const page of pages) {
        const [copiedPage] = await outputPDF.copyPages(sourcePDF, [
          page.originalIndex,
        ]);

        outputPDF.addPage(copiedPage);
      }

      const outputBytes = await outputPDF.save();

      const blob = new Blob([new Uint8Array(outputBytes).slice().buffer], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setResultSize(blob.size);
    } catch (err) {
      console.error(err);
      setError("Failed to organize the PDF.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (!resultUrl) return;

    const link = document.createElement("a");

    link.href = resultUrl;
    link.download = `${
      file?.name.replace(/\.pdf$/i, "") || "organized"
    }-organized.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeFile = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setFile(null);
    setPages([]);
    setResultUrl("");
    setResultSize(0);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold text-blue-600">
            PDF TOOLS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Organize PDF
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Reorder, duplicate, or delete PDF pages and create a new
            organized document.
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
              📚
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
                    <span>{pages.length} pages</span>
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

          {/* Controls */}
          {pages.length > 0 && (
            <>
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={resetOrder}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Reset Order
                </button>

                <button
                  type="button"
                  onClick={reversePages}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Reverse Pages
                </button>
              </div>

              {/* Page list */}
              <div className="mt-5 space-y-3">
                {pages.map((page, index) => (
                  <div
                    key={page.id}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                        {index + 1}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          Page {index + 1}
                        </p>

                        <p className="text-xs text-slate-500">
                          Original page {page.originalIndex + 1}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => movePage(index, "up")}
                        disabled={index === 0}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        title="Move up"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        onClick={() => movePage(index, "down")}
                        disabled={index === pages.length - 1}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        title="Move down"
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        onClick={() => duplicatePage(index)}
                        className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                      >
                        Duplicate
                      </button>

                      <button
                        type="button"
                        onClick={() => deletePage(index)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Action */}
          <button
            type="button"
            onClick={organizePDF}
            disabled={!file || pages.length === 0 || processing}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing ? "Organizing PDF..." : "Organize PDF"}
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
                Organized PDF
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
                  title="Organized PDF Preview"
                  className="h-[600px] w-full bg-white"
                />
              ) : (
                <div className="flex min-h-[280px] items-center justify-center px-6 text-center">
                  <div>
                    <div className="mb-3 text-4xl">📄</div>

                    <p className="font-medium text-slate-700">
                      Your organized PDF will appear here
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Upload a PDF, arrange its pages, then click Organize
                      PDF.
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
              Download Organized PDF
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


