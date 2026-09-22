"use client";

import { DragEvent, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";

type PDFItem = {
  id: string;
  file: File;
};

export default function MergePDF() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<PDFItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const addFiles = (selectedFiles: FileList | File[]) => {
    setError("");

    const pdfFiles = Array.from(selectedFiles);

    const invalid = pdfFiles.find(
      (file) =>
        file.type !== "application/pdf" &&
        !file.name.toLowerCase().endsWith(".pdf")
    );

    if (invalid) {
      setError("Please select PDF files only.");
      return;
    }

    const oversized = pdfFiles.find(
      (file) => file.size > MAX_FILE_SIZE
    );

    if (oversized) {
      setError(
        `"${oversized.name}" is larger than the 50 MB limit.`
      );
      return;
    }

    const newItems: PDFItem[] = pdfFiles.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
      file,
    }));

    setFiles((prev) => [...prev, ...newItems]);

    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl("");
      setResultSize(0);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }

    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files) {
      addFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) =>
      prev.filter((item) => item.id !== id)
    );

    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl("");
      setResultSize(0);
    }
  };

  const clearAll = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setFiles([]);
    setResultUrl("");
    setResultSize(0);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const moveFile = (
    index: number,
    direction: "up" | "down"
  ) => {
    const newIndex =
      direction === "up"
        ? index - 1
        : index + 1;

    if (
      newIndex < 0 ||
      newIndex >= files.length
    ) {
      return;
    }

    const updated = [...files];

    const temp = updated[index];

    updated[index] = updated[newIndex];
    updated[newIndex] = temp;

    setFiles(updated);

    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl("");
      setResultSize(0);
    }
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      setError("Please add at least 2 PDF files.");
      return;
    }

    setIsMerging(true);
    setError("");

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuffer =
          await item.file.arrayBuffer();

        const sourcePdf =
          await PDFDocument.load(arrayBuffer);

        const pages = await mergedPdf.copyPages(
          sourcePdf,
          sourcePdf.getPageIndices()
        );

        pages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const pdfBytes = await mergedPdf.save();

      const blob = new Blob([pdfBytes], {
        type: "application/pdf",
      });

      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }

      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setResultSize(blob.size);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to merge the PDFs. One or more files may be damaged, encrypted, or unsupported."
      );
    } finally {
      setIsMerging(false);
    }
  };

  const downloadPDF = () => {
    if (!resultUrl) {
      return;
    }

    const link = document.createElement("a");

    link.href = resultUrl;
    link.download = "ToolsGift-merged.pdf";

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
          PDF Tool
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Merge PDF
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Combine multiple PDF files into one PDF document
          quickly and easily.
        </p>
      </div>

      {/* Upload */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center transition hover:border-blue-400 hover:bg-blue-50/30"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
          📑
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          Upload PDF Files
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Drag & drop PDF files here or click to browse
        </p>

        <p className="mt-2 text-xs text-slate-400">
          Multiple PDF files supported · Maximum 50 MB per file
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* File List */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              PDF Files
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {files.length}{" "}
              {files.length === 1 ? "file" : "files"} added
            </p>
          </div>

          <button
            type="button"
            onClick={clearAll}
            disabled={files.length === 0}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear All
          </button>
        </div>

        {files.length > 0 ? (
          <div className="space-y-3">
            {files.map((item, index) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Number */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 font-bold text-red-600">
                    {index + 1}
                  </div>

                  {/* File Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-900">
                      {item.file.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {formatSize(item.file.size)}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        moveFile(index, "up")
                      }
                      disabled={index === 0}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ↑
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        moveFile(index, "down")
                      }
                      disabled={
                        index === files.length - 1
                      }
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ↓
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        removeFile(item.id)
                      }
                      className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
            <div className="text-center">
              <div className="mb-3 text-3xl">
                📄
              </div>

              <p className="font-medium text-slate-600">
                No PDF files added
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Add at least two PDF files to merge.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Merge Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={mergePDFs}
          disabled={
            files.length < 2 ||
            isMerging
          }
          className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isMerging
            ? "Merging PDFs..."
            : "Merge PDF Files"}
        </button>
      </div>

      {/* Result */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Result
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your merged PDF will appear here after processing.
          </p>
        </div>

        {resultUrl ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
              ✓
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              PDF Successfully Merged
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              {files.length} PDF files combined ·{" "}
              {formatSize(resultSize)}
            </p>
          </div>
        ) : (
          <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
            <div className="text-center">
              <div className="mb-3 text-4xl">
                📑
              </div>

              <p className="font-medium text-slate-600">
                No result yet
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Add PDFs and merge them to create the result.
              </p>
            </div>
          </div>
        )}

        {/* Download Always Visible */}
        <button
          type="button"
          onClick={downloadPDF}
          disabled={!resultUrl}
          className="mt-5 w-full rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Download Merged PDF
        </button>
      </div>
    </div>
  );
}