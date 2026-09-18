"use client";

import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";

type PDFInfo = {
  file: File;
  pageCount: number;
  text: string[];
};

export default function PDFComparer() {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const [firstPDF, setFirstPDF] = useState<PDFInfo | null>(null);
  const [secondPDF, setSecondPDF] = useState<PDFInfo | null>(null);

  const [firstDrag, setFirstDrag] = useState(false);
  const [secondDrag, setSecondDrag] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [compared, setCompared] = useState(false);
  const [error, setError] = useState("");

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

  const extractText = async (bytes: ArrayBuffer) => {
    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(bytes),
    }).promise;

    const pages: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const content = await page.getTextContent();

      const text = content.items
        .map((item) => {
          if ("str" in item) {
            return item.str;
          }

          return "";
        })
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      pages.push(text);
    }

    return {
      pageCount: pdf.numPages,
      text: pages,
    };
  };

  const loadFile = async (
    selectedFile: File,
    side: "first" | "second"
  ) => {
    setError("");
    setCompared(false);

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a valid PDF file.");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      setError("Each PDF must be 50MB or less.");
      return;
    }

    try {
      const bytes = await selectedFile.arrayBuffer();

      // Validate PDF with pdf-lib.
      await PDFDocument.load(bytes);

      // Extract selectable text for comparison.
      const extracted = await extractText(bytes);

      const info: PDFInfo = {
        file: selectedFile,
        pageCount: extracted.pageCount,
        text: extracted.text,
      };

      if (side === "first") {
        setFirstPDF(info);
      } else {
        setSecondPDF(info);
      }
    } catch (err) {
      console.error(err);
      setError(
        "Unable to read this PDF. Please make sure it is a valid, readable PDF."
      );
    }
  };

  const handleFirstInput = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      loadFile(file, "first");
    }

    e.target.value = "";
  };

  const handleSecondInput = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      loadFile(file, "second");
    }

    e.target.value = "";
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    side: "first" | "second"
  ) => {
    e.preventDefault();

    if (side === "first") {
      setFirstDrag(false);
    } else {
      setSecondDrag(false);
    }

    const file = e.dataTransfer.files?.[0];

    if (file) {
      loadFile(file, side);
    }
  };

  const removePDF = (side: "first" | "second") => {
    setCompared(false);
    setError("");

    if (side === "first") {
      setFirstPDF(null);

      if (firstInputRef.current) {
        firstInputRef.current.value = "";
      }
    } else {
      setSecondPDF(null);

      if (secondInputRef.current) {
        secondInputRef.current.value = "";
      }
    }
  };

  const normalizeText = (text: string) => {
    return text
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  };

  const getDifferences = () => {
    if (!firstPDF || !secondPDF) {
      return [];
    }

    const maxPages = Math.max(
      firstPDF.pageCount,
      secondPDF.pageCount
    );

    const differences: {
      page: number;
      type: string;
      firstText: string;
      secondText: string;
    }[] = [];

    for (let i = 0; i < maxPages; i++) {
      const firstText = firstPDF.text[i] || "";
      const secondText = secondPDF.text[i] || "";

      if (!firstText && secondText) {
        differences.push({
          page: i + 1,
          type: "Only in PDF 2",
          firstText: "",
          secondText,
        });

        continue;
      }

      if (firstText && !secondText) {
        differences.push({
          page: i + 1,
          type: "Only in PDF 1",
          firstText,
          secondText: "",
        });

        continue;
      }

      if (
        normalizeText(firstText) !==
        normalizeText(secondText)
      ) {
        differences.push({
          page: i + 1,
          type: "Text differs",
          firstText,
          secondText,
        });
      }
    }

    return differences;
  };

  const comparePDFs = async () => {
    if (!firstPDF || !secondPDF) {
      setError("Please upload both PDF files first.");
      return;
    }

    setProcessing(true);
    setError("");
    setCompared(false);

    try {
      // Text is already extracted during upload.
      // This small async step keeps the UI responsive.
      await new Promise((resolve) => setTimeout(resolve, 150));

      setCompared(true);
    } catch (err) {
      console.error(err);
      setError("Failed to compare the PDF files.");
    } finally {
      setProcessing(false);
    }
  };

  const differences = compared
    ? getDifferences()
    : [];

  const identical =
    compared &&
    firstPDF &&
    secondPDF &&
    firstPDF.pageCount === secondPDF.pageCount &&
    differences.length === 0;

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold text-blue-600">
            PDF TOOLS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Compare PDF
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Compare two PDF documents and identify page count and
            selectable-text differences.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* PDF upload cards */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* PDF 1 */}
            <div>
              <h2 className="mb-3 text-base font-bold text-slate-800">
                PDF 1
              </h2>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setFirstDrag(true);
                }}
                onDragLeave={() => setFirstDrag(false)}
                onDrop={(e) =>
                  handleDrop(e, "first")
                }
                onClick={() =>
                  firstInputRef.current?.click()
                }
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${
                  firstDrag
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40"
                }`}
              >
                <input
                  ref={firstInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFirstInput}
                  className="hidden"
                />

                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                  📄
                </div>

                <p className="font-semibold text-slate-800">
                  {firstPDF
                    ? "Replace PDF 1"
                    : "Upload PDF 1"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Drag & drop or click to browse
                </p>
              </div>

              {firstPDF && (
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {firstPDF.file.name}
                  </p>

                  <div className="mt-1 flex gap-3 text-xs text-slate-500">
                    <span>
                      {formatBytes(firstPDF.file.size)}
                    </span>

                    <span>
                      {firstPDF.pageCount} pages
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removePDF("first")
                    }
                    className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    Remove PDF 1
                  </button>
                </div>
              )}
            </div>

            {/* PDF 2 */}
            <div>
              <h2 className="mb-3 text-base font-bold text-slate-800">
                PDF 2
              </h2>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setSecondDrag(true);
                }}
                onDragLeave={() => setSecondDrag(false)}
                onDrop={(e) =>
                  handleDrop(e, "second")
                }
                onClick={() =>
                  secondInputRef.current?.click()
                }
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${
                  secondDrag
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40"
                }`}
              >
                <input
                  ref={secondInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleSecondInput}
                  className="hidden"
                />

                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                  📄
                </div>

                <p className="font-semibold text-slate-800">
                  {secondPDF
                    ? "Replace PDF 2"
                    : "Upload PDF 2"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Drag & drop or click to browse
                </p>
              </div>

              {secondPDF && (
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {secondPDF.file.name}
                  </p>

                  <div className="mt-1 flex gap-3 text-xs text-slate-500">
                    <span>
                      {formatBytes(secondPDF.file.size)}
                    </span>

                    <span>
                      {secondPDF.pageCount} pages
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removePDF("second")
                    }
                    className="mt-3 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    Remove PDF 2
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex gap-3">
              <span className="text-lg">ℹ️</span>

              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Comparison method
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-800">
                  ImgSwift compares page count and selectable text
                  page-by-page. Scanned PDFs without a text layer
                  may require OCR before meaningful text comparison
                  is possible.
                </p>
              </div>
            </div>
          </div>

          {/* Compare */}
          <button
            type="button"
            onClick={comparePDFs}
            disabled={
              !firstPDF ||
              !secondPDF ||
              processing
            }
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing
              ? "Comparing PDFs..."
              : "Compare PDFs"}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Result placeholder / result */}
          <div className="mt-8">
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              Comparison Result
            </h2>

            {!compared ? (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 text-center">
                <div>
                  <div className="mb-3 text-4xl">⚖️</div>

                  <p className="font-medium text-slate-700">
                    Comparison result will appear here
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Upload both PDFs and click Compare PDFs.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Summary */}
                <div
                  className={`rounded-2xl border p-5 ${
                    identical
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-amber-200 bg-amber-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">
                      {identical ? "✅" : "⚠️"}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {identical
                          ? "PDFs appear identical"
                          : "Differences found"}
                      </h3>

                      <p className="mt-1 text-sm text-slate-600">
                        {identical
                          ? "Both PDFs have the same page count and selectable text."
                          : `${differences.length} page-level difference(s) detected.`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs text-slate-500">
                      PDF 1 Pages
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {firstPDF?.pageCount}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs text-slate-500">
                      PDF 2 Pages
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {secondPDF?.pageCount}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs text-slate-500">
                      Differences
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {differences.length}
                    </p>
                  </div>
                </div>

                {/* Differences */}
                {differences.length > 0 && (
                  <div className="overflow-hidden rounded-2xl border border-slate-200">
                    <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                      <h3 className="font-semibold text-slate-800">
                        Page Differences
                      </h3>
                    </div>

                    <div className="divide-y divide-slate-200">
                      {differences.map((difference) => (
                        <div
                          key={`${difference.page}-${difference.type}`}
                          className="p-4"
                        >
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                              Page {difference.page}
                            </span>

                            <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                              {difference.type}
                            </span>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl bg-slate-50 p-3">
                              <p className="mb-2 text-xs font-bold text-slate-500">
                                PDF 1
                              </p>

                              <p className="max-h-32 overflow-auto whitespace-pre-wrap text-xs leading-5 text-slate-700">
                                {difference.firstText ||
                                  "[No text]"}
                              </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-3">
                              <p className="mb-2 text-xs font-bold text-slate-500">
                                PDF 2
                              </p>

                              <p className="max-h-32 overflow-auto whitespace-pre-wrap text-xs leading-5 text-slate-700">
                                {difference.secondText ||
                                  "[No text]"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Clear */}
          <button
            type="button"
            onClick={() => {
              setFirstPDF(null);
              setSecondPDF(null);
              setCompared(false);
              setError("");

              if (firstInputRef.current) {
                firstInputRef.current.value = "";
              }

              if (secondInputRef.current) {
                secondInputRef.current.value = "";
              }
            }}
            className="mt-5 w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Clear & Reset
          </button>
        </div>
      </div>
    </section>
  );
}