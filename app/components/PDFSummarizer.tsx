"use client";

import {
  ChangeEvent,
  DragEvent,
  useState,
} from "react";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";

type SummaryStats = {
  pages: number;
  words: number;
  characters: number;
};

export default function PDFSummarizer() {
  const [file, setFile] = useState<File | null>(null);
    const [pageCount, setPageCount] = useState(0);

  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const [stats, setStats] = useState<SummaryStats>({
    pages: 0,
    words: 0,
    characters: 0,
  });

  const [processing, setProcessing] = useState(false);
  const [extracting, setExtracting] = useState(false);
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

  const extractPDFText = async (
    bytes: ArrayBuffer
  ) => {
    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(bytes),
    }).promise;

    const pages: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => {
          if ("str" in item) {
            return item.str;
          }

          return "";
        })
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      pages.push(pageText);
    }

    return {
      pageCount: pdf.numPages,
      text: pages.join("\n\n"),
    };
  };

  const loadPDF = async (selectedFile: File) => {
    setError("");
    setSummary("");
    setText("");
    setResultUrl("");
    setStats({
      pages: 0,
      words: 0,
      characters: 0,
    });

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

    setExtracting(true);

    try {
      const bytes = await selectedFile.arrayBuffer();

      // Validate PDF.
      const pdf = await PDFDocument.load(bytes);

      const extracted = await extractPDFText(bytes);

      setFile(selectedFile);
            setPageCount(pdf.getPageCount());
      setText(extracted.text);

      const words =
        extracted.text.trim().length > 0
          ? extracted.text
              .trim()
              .split(/\s+/)
              .length
          : 0;

      setStats({
        pages: extracted.pageCount,
        words,
        characters: extracted.text.length,
      });
    } catch (err) {
      console.error(err);
      setError(
        "Unable to read this PDF. Please make sure it is a valid, readable PDF."
      );
    } finally {
      setExtracting(false);
    }
  };

  const handleInput = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      loadPDF(selectedFile);
    }

    e.target.value = "";
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      loadPDF(droppedFile);
    }
  };

  /*
   * Simple browser-side extractive summarizer.
   *
   * It scores sentences using:
   * - sentence position
   * - word frequency
   * - sentence length
   *
   * This keeps the tool fully client-side and does not
   * send the uploaded PDF to an external AI service.
   */
  const generateSummary = async () => {
    if (!text.trim()) {
      setError(
        "No selectable text was found in this PDF. Scanned PDFs may require OCR."
      );
      return;
    }

    setProcessing(true);
    setError("");
    setSummary("");
    setResultUrl("");

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 150)
      );

      const cleanText = text
        .replace(/\s+/g, " ")
        .trim();

      const sentences =
        cleanText
          .match(/[^.!?]+[.!?]+/g)
          ?.map((sentence) => sentence.trim())
          .filter((sentence) => sentence.length > 20) ||
        [];

      if (sentences.length === 0) {
        const fallback = cleanText.slice(0, 1500);

        setSummary(
          fallback ||
            "Not enough text was available to generate a summary."
        );

        return;
      }

      const stopWords = new Set([
        "the",
        "and",
        "that",
        "this",
        "with",
        "from",
        "have",
        "will",
        "would",
        "there",
        "their",
        "about",
        "which",
        "into",
        "than",
        "then",
        "were",
        "been",
        "being",
        "they",
        "them",
        "these",
        "those",
        "your",
        "you",
        "for",
        "are",
        "was",
        "has",
        "had",
        "but",
        "not",
        "can",
        "its",
        "our",
        "out",
        "all",
        "also",
        "more",
        "some",
        "may",
        "other",
        "any",
        "each",
        "such",
        "only",
        "when",
        "where",
        "what",
        "how",
        "who",
        "why",
        "use",
        "used",
      ]);

      const words = cleanText
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(
          (word) =>
            word.length > 2 &&
            !stopWords.has(word)
        );

      const frequency: Record<string, number> = {};

      for (const word of words) {
        frequency[word] =
          (frequency[word] || 0) + 1;
      }

      const maxFrequency = Math.max(
        ...Object.values(frequency),
        1
      );

      const scored = sentences.map(
        (sentence, index) => {
          const sentenceWords = sentence
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, " ")
            .split(/\s+/)
            .filter(Boolean);

          let score = 0;

          for (const word of sentenceWords) {
            if (frequency[word]) {
              score +=
                frequency[word] / maxFrequency;
            }
          }

          // Give earlier sentences a small boost.
          if (index < 3) {
            score += 1.5;
          }

          // Avoid extremely short/long sentences.
          if (
            sentenceWords.length >= 8 &&
            sentenceWords.length <= 45
          ) {
            score += 1;
          }

          return {
            sentence,
            index,
            score,
          };
        }
      );

      const summaryCount = Math.min(
        Math.max(3, Math.ceil(sentences.length * 0.15)),
        12,
        sentences.length
      );

      const selected = [...scored]
        .sort((a, b) => b.score - a.score)
        .slice(0, summaryCount)
        .sort((a, b) => a.index - b.index);

      const generated = selected
        .map((item) => item.sentence)
        .join(" ");

      setSummary(generated);
    } catch (err) {
      console.error(err);
      setError("Failed to generate the PDF summary.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadSummary = () => {
    if (!summary) return;

    const content = `PDF SUMMARY

File: ${file?.name || "document.pdf"}

Pages: ${stats.pages}
Words: ${stats.words}

SUMMARY
========

${summary}

Generated by ToolsGift
`;

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    const url = URL.createObjectURL(blob);

    setResultUrl(url);

    const link = document.createElement("a");
    link.href = url;
    link.download = "pdf-summary.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setFile(null);
        setPageCount(0);
    setText("");
    setSummary("");

    setStats({
      pages: 0,
      words: 0,
      characters: 0,
    });

    setProcessing(false);
    setExtracting(false);
    setResultUrl("");
    setError("");
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold text-blue-600">
            PDF TOOLS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            PDF Summarizer
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Extract text from a PDF and create a concise
            browser-side summary without uploading your
            document to an external service.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* Upload */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() =>
              setDragActive(false)
            }
            onDrop={handleDrop}
            onClick={() =>
              document
                .getElementById("pdf-summary-input")
                ?.click()
            }
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40"
            }`}
          >
            <input
              id="pdf-summary-input"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleInput}
              className="hidden"
            />

            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              🧠
            </div>

            <p className="font-semibold text-slate-800">
              {file
                ? "Replace PDF"
                : "Upload PDF"}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Drag & drop or click to browse • Max 50MB
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
                    {formatBytes(file.size)} •{" "}
                    {pageCount} pages
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

          {/* Stats */}
          {file && (
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Pages
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {stats.pages}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Words
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {stats.words.toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Characters
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {stats.characters.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {/* Extracted text */}
          {file && (
            <div className="mt-6">
              <h2 className="mb-3 text-lg font-bold text-slate-900">
                Extracted Text
              </h2>

              {extracting ? (
                <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                  <p className="text-sm font-medium text-slate-600">
                    Extracting PDF text...
                  </p>
                </div>
              ) : text ? (
                <div className="max-h-72 overflow-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {text.slice(0, 20000)}
                  </p>

                  {text.length > 20000 && (
                    <p className="mt-4 text-xs text-slate-500">
                      Preview limited to the first 20,000
                      characters.
                    </p>
                  )}
                </div>
              ) : (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
                  <p className="font-semibold text-amber-900">
                    No selectable text detected
                  </p>

                  <p className="mt-1 text-sm text-amber-800">
                    This may be a scanned/image-only PDF.
                    Use the OCR PDF tool first.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Summarize */}
          <button
            type="button"
            onClick={generateSummary}
            disabled={
              !file ||
              !text ||
              extracting ||
              processing
            }
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing
              ? "Generating Summary..."
              : "Generate Summary"}
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
              Summary Result
            </h2>

            {!summary ? (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 text-center">
                <div>
                  <div className="mb-3 text-4xl">
                    ✨
                  </div>

                  <p className="font-medium text-slate-700">
                    PDF summary will appear here
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Upload a PDF and generate its summary.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                  {summary}
                </p>
              </div>
            )}
          </div>

          {/* Download always visible */}
          <button
            type="button"
            onClick={downloadSummary}
            disabled={!summary}
            className={`mt-5 w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition ${
              summary
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >
            Download Summary
          </button>

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
