"use client";

import {
  ChangeEvent,
  DragEvent,
  useState,
} from "react";
import ShareResult from "./ShareResult";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";

export default function PDFToMarkdown() {
  const [file, setFile] = useState<File | null>(null);

  const [pageCount, setPageCount] = useState(0);
  const [markdown, setMarkdown] = useState("");
  const [sourceText, setSourceText] = useState("");

  const [extracting, setExtracting] = useState(false);
  const [converting, setConverting] = useState(false);

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

  const cleanLine = (line: string) => {
    return line
      .replace(/\u00a0/g, " ")
      .replace(/[ \t]+/g, " ")
      .trim();
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

      const content =
        await page.getTextContent();

      const items = content.items
        .filter((item) => "str" in item)
        .map((item) => {
          if ("str" in item) {
            return {
              text: item.str,
              x:
                "transform" in item
                  ? item.transform[4]
                  : 0,
              y:
                "transform" in item
                  ? item.transform[5]
                  : 0,
            };
          }

          return {
            text: "",
            x: 0,
            y: 0,
          };
        });

      const rows: {
        y: number;
        items: {
          text: string;
          x: number;
        }[];
      }[] = [];

      for (const item of items) {
        if (!item.text.trim()) continue;

        let row = rows.find(
          (existing) =>
            Math.abs(existing.y - item.y) < 5
        );

        if (!row) {
          row = {
            y: item.y,
            items: [],
          };

          rows.push(row);
        }

        row.items.push({
          text: item.text,
          x: item.x,
        });
      }

      rows.sort((a, b) => b.y - a.y);

      const lines = rows.map((row) =>
        row.items
          .sort((a, b) => a.x - b.x)
          .map((item) => item.text)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim()
      );

      pages.push(lines.join("\n"));
    }

    return {
      pageCount: pdf.numPages,
      text: pages.join("\n\n"),
    };
  };

  const loadPDF = async (selectedFile: File) => {
    setError("");
    setMarkdown("");
    setSourceText("");
    setResultUrl("");

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name
        .toLowerCase()
        .endsWith(".pdf")
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
      const bytes =
        await selectedFile.arrayBuffer();

      const pdf =
        await PDFDocument.load(bytes);

      const extracted =
        await extractPDFText(bytes);

      setFile(selectedFile);
            setPageCount(pdf.getPageCount());
      setSourceText(extracted.text);

      if (!extracted.text.trim()) {
        setError(
          "No selectable text was found. Scanned PDFs may require OCR first."
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        "Unable to read this PDF. Please make sure it is valid and readable."
      );
    } finally {
      setExtracting(false);
    }
  };

  const handleInput = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile =
      e.target.files?.[0];

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

    const droppedFile =
      e.dataTransfer.files?.[0];

    if (droppedFile) {
      loadPDF(droppedFile);
    }
  };

  const escapeMarkdown = (text: string) => {
    return text
      .replace(/\\/g, "\\\\")
      .replace(/\*/g, "\\*")
      .replace(/_/g, "\\_")
      .replace(/`/g, "\\`")
      .replace(/\[/g, "\\[")
      .replace(/\]/g, "\\]");
  };

  const looksLikeHeading = (
    line: string
  ) => {
    const clean = line.trim();

    if (!clean) return false;

    if (clean.length > 100) return false;

    if (/^(chapter|section|part)\s+/i.test(clean)) {
      return true;
    }

    if (
      /^[A-Z0-9][A-Z0-9\s\-:,&]{3,80}$/.test(
        clean
      )
    ) {
      return true;
    }

    return false;
  };

  const convertToMarkdown = async () => {
    if (!sourceText.trim()) {
      setError(
        "No selectable text is available for conversion."
      );
      return;
    }

    setConverting(true);
    setError("");
    setMarkdown("");
    setResultUrl("");

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 150)
      );

      const pages = sourceText.split(
        /\n\n(?=--- Page )/
      );

      const output: string[] = [];

      const documentTitle =
        file?.name
          ?.replace(/\.pdf$/i, "")
          .trim() || "PDF Document";

      output.push(`# ${escapeMarkdown(documentTitle)}`);
      output.push("");

      for (
        let pageIndex = 0;
        pageIndex < pages.length;
        pageIndex++
      ) {
        let pageText = pages[pageIndex].trim();

        pageText = pageText.replace(
          /^--- Page \d+ ---\s*/i,
          ""
        );

        if (!pageText) continue;

        output.push(
          `## Page ${pageIndex + 1}`
        );
        output.push("");

        const lines = pageText
          .split(/\n+/)
          .map(cleanLine)
          .filter(Boolean);

        let paragraph: string[] = [];

        const flushParagraph = () => {
          if (paragraph.length === 0) return;

          const joined =
            paragraph.join(" ").trim();

          if (joined) {
            output.push(
              escapeMarkdown(joined)
            );
            output.push("");
          }

          paragraph = [];
        };

        for (const line of lines) {
          if (looksLikeHeading(line)) {
            flushParagraph();

            output.push(
              `### ${escapeMarkdown(line)}`
            );
            output.push("");
            continue;
          }

          if (
            /^[-•●▪◦]\s+/.test(line)
          ) {
            flushParagraph();

            const item = line
              .replace(
                /^[-•●▪◦]\s+/,
                ""
              )
              .trim();

            output.push(
              `- ${escapeMarkdown(item)}`
            );

            continue;
          }

          if (
            /^\d+[.)]\s+/.test(line)
          ) {
            flushParagraph();

            const item = line
              .replace(
                /^\d+[.)]\s+/,
                ""
              )
              .trim();

            output.push(
              `1. ${escapeMarkdown(item)}`
            );

            continue;
          }

          paragraph.push(line);
        }

        flushParagraph();

        output.push("---");
        output.push("");
      }

      const finalMarkdown =
        output.join("\n").trim() + "\n";

      setMarkdown(finalMarkdown);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to convert the PDF to Markdown."
      );
    } finally {
      setConverting(false);
    }
  };

  const downloadMarkdown = () => {
    if (!markdown) return;

    const baseName =
      file?.name
        ?.replace(/\.pdf$/i, "")
        .trim() || "document";

    const blob = new Blob([markdown], {
      type: "text/markdown;charset=utf-8",
    });

    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    const url =
      URL.createObjectURL(blob);

    setResultUrl(url);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      `${baseName}.md`;

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
    setSourceText("");
    setMarkdown("");

    setExtracting(false);
    setConverting(false);

    setResultUrl("");
    setError("");
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold text-blue-600">
            PDF TOOLS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            PDF to Markdown
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Convert selectable PDF text into a clean,
            structured Markdown document.
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
                .getElementById(
                  "pdf-markdown-input"
                )
                ?.click()
            }
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/40"
            }`}
          >
            <input
              id="pdf-markdown-input"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleInput}
              className="hidden"
            />

            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              📝
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

          {/* Info */}
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-900">
              Markdown conversion
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-800">
              Headings, paragraphs, bullet points and numbered
              lists are detected where possible. Complex PDF
              layouts, images and tables may require manual
              Markdown cleanup.
            </p>
          </div>

          {/* Extracted text */}
          <div className="mt-6">
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              Extracted Text
            </h2>

            {!file ? (
              <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 text-center">
                <div>
                  <div className="mb-3 text-4xl">
                    📄
                  </div>

                  <p className="font-medium text-slate-700">
                    Extracted text will appear here
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Upload a PDF to begin.
                  </p>
                </div>
              </div>
            ) : extracting ? (
              <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                <p className="text-sm font-medium text-slate-600">
                  Extracting PDF text...
                </p>
              </div>
            ) : sourceText ? (
              <div className="max-h-72 overflow-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {sourceText.slice(
                    0,
                    20000
                  )}
                </p>

                {sourceText.length >
                  20000 && (
                  <p className="mt-4 text-xs text-slate-500">
                    Preview limited to the first
                    20,000 characters.
                  </p>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
                <p className="font-semibold text-amber-900">
                  No selectable text detected
                </p>

                <p className="mt-1 text-sm text-amber-800">
                  Use OCR PDF first for scanned PDFs.
                </p>
              </div>
            )}
          </div>

          {/* Convert */}
          <button
            type="button"
            onClick={convertToMarkdown}
            disabled={
              !file ||
              !sourceText ||
              extracting ||
              converting
            }
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {converting
              ? "Converting to Markdown..."
              : "Convert to Markdown"}
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
              Markdown Result
            </h2>

            {!markdown ? (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 text-center">
                <div>
                  <div className="mb-3 text-4xl">
                    #️⃣
                  </div>

                  <p className="font-medium text-slate-700">
                    Markdown result will appear here
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Convert the PDF to generate Markdown.
                  </p>
                </div>
              </div>
            ) : (
              <pre className="max-h-[600px] overflow-auto rounded-2xl border border-slate-200 bg-slate-900 p-5 text-sm leading-6 text-slate-100">
                {markdown}
              </pre>
            )}
          </div>

          {/* Download always visible */}
          <button
            type="button"
            onClick={downloadMarkdown}
            disabled={!markdown}
            className={`mt-5 w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition ${
              markdown
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >
            Download Markdown (.md)
          </button>

          {markdown && <ShareResult key={markdown} tool="pdf-to-markdown" resultTitle="PDF Markdown" value={markdown} filename="pdf-markdown.md" />}

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
