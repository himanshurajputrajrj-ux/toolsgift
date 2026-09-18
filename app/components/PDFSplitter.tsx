"use client";

import { DragEvent, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";

type SplitResult = {
  id: string;
  name: string;
  url: string;
  size: number;
  pageStart: number;
  pageEnd: number;
};

type SplitMode = "all" | "range";

export default function PDFSplitter() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [splitMode, setSplitMode] =
    useState<SplitMode>("all");
  const [pageRange, setPageRange] = useState("");
  const [isSplitting, setIsSplitting] = useState(false);
  const [results, setResults] = useState<SplitResult[]>([]);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const clearResults = () => {
    results.forEach((result) => {
      URL.revokeObjectURL(result.url);
    });

    setResults([]);
  };

  const loadPDF = async (selectedFile: File) => {
    setError("");
    clearResults();

    const isPDF =
      selectedFile.type === "application/pdf" ||
      selectedFile.name
        .toLowerCase()
        .endsWith(".pdf");

    if (!isPDF) {
      setError("Please select a PDF file only.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Maximum file size is 50 MB.");
      return;
    }

    try {
      const bytes = await selectedFile.arrayBuffer();

      const pdf = await PDFDocument.load(bytes);

      setFile(selectedFile);
      setTotalPages(pdf.getPageCount());
      setPageRange("");
      setSplitMode("all");
    } catch (err) {
      console.error(err);

      setFile(null);
      setTotalPages(0);

      setError(
        "Unable to open this PDF. The file may be damaged or encrypted."
      );
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      loadPDF(selectedFile);
    }

    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      loadPDF(droppedFile);
    }
  };

  const resetTool = () => {
    clearResults();

    setFile(null);
    setTotalPages(0);
    setPageRange("");
    setSplitMode("all");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const parsePageRanges = (
    value: string,
    pageCount: number
  ): Array<[number, number]> => {
    const ranges: Array<[number, number]> = [];

    const parts = value
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    if (parts.length === 0) {
      throw new Error(
        "Please enter a page range."
      );
    }

    for (const part of parts) {
      if (part.includes("-")) {
        const pieces = part
          .split("-")
          .map((item) => item.trim());

        if (pieces.length !== 2) {
          throw new Error(
            `Invalid range: ${part}`
          );
        }

        const start = Number(pieces[0]);
        const end = Number(pieces[1]);

        if (
          !Number.isInteger(start) ||
          !Number.isInteger(end) ||
          start < 1 ||
          end < 1 ||
          start > pageCount ||
          end > pageCount ||
          start > end
        ) {
          throw new Error(
            `Invalid page range: ${part}`
          );
        }

        ranges.push([start, end]);
      } else {
        const page = Number(part);

        if (
          !Number.isInteger(page) ||
          page < 1 ||
          page > pageCount
        ) {
          throw new Error(
            `Invalid page number: ${part}`
          );
        }

        ranges.push([page, page]);
      }
    }

    return ranges;
  };

  const splitPDF = async () => {
    if (!file || totalPages === 0) {
      setError("Please upload a PDF first.");
      return;
    }

    setIsSplitting(true);
    setError("");
    clearResults();

    try {
      const bytes = await file.arrayBuffer();

      const sourcePdf =
        await PDFDocument.load(bytes);

      let ranges: Array<[number, number]>;

      if (splitMode === "all") {
        ranges = [];

        for (
          let page = 1;
          page <= totalPages;
          page++
        ) {
          ranges.push([page, page]);
        }
      } else {
        ranges = parsePageRanges(
          pageRange,
          totalPages
        );
      }

      const newResults: SplitResult[] = [];

      for (
        let index = 0;
        index < ranges.length;
        index++
      ) {
        const [start, end] = ranges[index];

        const outputPdf =
          await PDFDocument.create();

        const pageIndexes: number[] = [];

        for (
          let page = start;
          page <= end;
          page++
        ) {
          pageIndexes.push(page - 1);
        }

        const copiedPages =
          await outputPdf.copyPages(
            sourcePdf,
            pageIndexes
          );

        copiedPages.forEach((page) => {
          outputPdf.addPage(page);
        });

        const pdfBytes =
          await outputPdf.save();

        const blob = new Blob([new Uint8Array(pdfBytes).slice().buffer], { type: "application/pdf" });

        const url =
          URL.createObjectURL(blob);

        const baseName =
          file.name.replace(
            /\.pdf$/i,
            ""
          );

        const pageLabel =
          start === end
            ? `page-${start}`
            : `pages-${start}-${end}`;

        newResults.push({
          id: `${Date.now()}-${index}`,
          name: `${baseName}-${pageLabel}.pdf`,
          url,
          size: blob.size,
          pageStart: start,
          pageEnd: end,
        });
      }

      setResults(newResults);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to split the PDF."
      );
    } finally {
      setIsSplitting(false);
    }
  };

  const downloadResult = (
    result: SplitResult
  ) => {
    const link =
      document.createElement("a");

    link.href = result.url;
    link.download = result.name;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const downloadAll = async () => {
    if (results.length === 0) {
      return;
    }

    try {
      const JSZip =
        (await import("jszip")).default;

      const zip = new JSZip();

      for (const result of results) {
        const response =
          await fetch(result.url);

        const blob =
          await response.blob();

        zip.file(result.name, blob);
      }

      const zipBlob =
        await zip.generateAsync({
          type: "blob",
        });

      const url =
        URL.createObjectURL(zipBlob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download =
        "ToolsGift-split-pdf.zip";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to create the ZIP download."
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
          PDF Tool
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Split PDF
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Split a PDF into separate documents or extract
          specific pages quickly and easily.
        </p>
      </div>

      {/* Upload */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() =>
          inputRef.current?.click()
        }
        className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center transition hover:border-blue-400 hover:bg-blue-50/30"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
          📄
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          {file
            ? "PDF selected"
            : "Upload PDF File"}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Drag & drop your PDF here or click to browse
        </p>

        <p className="mt-2 text-xs text-slate-400">
          Maximum file size: 50 MB
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* File Info */}
      {file && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900">
                {file.name}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {formatSize(file.size)} ·{" "}
                {totalPages}{" "}
                {totalPages === 1
                  ? "page"
                  : "pages"}
              </p>
            </div>

            <button
              type="button"
              onClick={resetTool}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold text-slate-900">
          Split Settings
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              setSplitMode("all");
              setError("");
            }}
            className={`rounded-xl border px-5 py-4 text-left transition ${
              splitMode === "all"
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-white hover:bg-slate-50"
            }`}
          >
            <p className="font-semibold text-slate-900">
              Split Every Page
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Create one PDF for each page.
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              setSplitMode("range");
              setError("");
            }}
            className={`rounded-xl border px-5 py-4 text-left transition ${
              splitMode === "range"
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-white hover:bg-slate-50"
            }`}
          >
            <p className="font-semibold text-slate-900">
              Custom Page Ranges
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Extract selected pages or ranges.
            </p>
          </button>
        </div>

        {splitMode === "range" && (
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Page Ranges
            </label>

            <input
              type="text"
              value={pageRange}
              onChange={(e) =>
                setPageRange(e.target.value)
              }
              placeholder="Example: 1-3,5,8-10"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-2 text-xs text-slate-500">
              Example: 1-3,5,8-10
            </p>
          </div>
        )}
      </div>

      {/* Action */}
      <div className="mt-6">
        <button
          type="button"
          onClick={splitPDF}
          disabled={
            !file ||
            totalPages === 0 ||
            isSplitting
          }
          className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isSplitting
            ? "Splitting PDF..."
            : "Split PDF"}
        </button>
      </div>

      {/* Result */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Result
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your split PDF files will appear here.
            </p>
          </div>

          {/* Always Visible */}
          <button
            type="button"
            onClick={downloadAll}
            disabled={results.length === 0}
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Download All ZIP
          </button>
        </div>

        {results.length > 0 ? (
          <div className="space-y-3">
            {results.map(
              (result, index) => (
                <div
                  key={result.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 font-bold text-red-600">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-900">
                        {result.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {result.pageStart ===
                        result.pageEnd
                          ? `Page ${result.pageStart}`
                          : `Pages ${result.pageStart}-${result.pageEnd}`}{" "}
                        ·{" "}
                        {formatSize(
                          result.size
                        )}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        downloadResult(
                          result
                        )
                      }
                      className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Download
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
            <div className="text-center">
              <div className="mb-3 text-4xl">
                ✂️
              </div>

              <p className="font-medium text-slate-600">
                No result yet
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Upload a PDF and choose how you want to split it.
              </p>
            </div>
          </div>
        )}

        {/* Download Always Visible */}
        <button
          type="button"
          onClick={downloadAll}
          disabled={results.length === 0}
          className="mt-5 w-full rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Download All Split PDFs
        </button>
      </div>
    </div>
  );
}



