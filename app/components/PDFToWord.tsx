"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

type PDFTextItem = {
  str?: string;
};

export default function PDFToWord() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [previewText, setPreviewText] = useState("");

  const [processing, setProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState("");

  const [error, setError] = useState("");

  const clearResult = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setResultUrl("");
    setResultBlob(null);
  };

  const reset = () => {
    clearResult();

    setFile(null);
    setPageCount(0);
    setPreviewText("");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const loadPDF = async (selectedFile: File) => {
    setError("");

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("PDF file must be smaller than 50 MB.");
      return;
    }

    clearResult();
    setFile(selectedFile);
    setPageCount(0);
    setPreviewText("");

    try {
      const pdfjs = await import("pdfjs-dist");

      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

      const arrayBuffer = await selectedFile.arrayBuffer();

      const pdf = await pdfjs.getDocument({
        data: arrayBuffer,
      }).promise;

      setPageCount(pdf.numPages);

      let combinedText = "";

      const previewPages = Math.min(pdf.numPages, 3);

      for (let pageNumber = 1; pageNumber <= previewPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();

        const strings = textContent.items
          .map((item) => {
            const textItem = item as PDFTextItem;
            return textItem.str || "";
          })
          .filter(Boolean);

        combinedText += strings.join(" ");
        combinedText += "\n\n";
      }

      setPreviewText(combinedText.trim());
    } catch (err) {
      console.error(err);
      setFile(null);
      setError(
        "Unable to read this PDF. It may be encrypted, scanned, or corrupted."
      );
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      loadPDF(selectedFile);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      loadPDF(droppedFile);
    }
  };

  const convertToWord = async () => {
    if (!file) return;

    setProcessing(true);
    setError("");
    clearResult();

    try {
      const pdfjs = await import("pdfjs-dist");

      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjs.getDocument({
        data: arrayBuffer,
      }).promise;

      const children: Paragraph[] = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const textContent = await page.getTextContent();

        const items = textContent.items
          .map((item) => {
            const textItem = item as PDFTextItem;

            return {
              text: textItem.str || "",
            };
          })
          .filter((item) => item.text.trim());

        let currentLine = "";
        let lastY: number | null = null;

        for (const item of items) {
          const text = item.text;

          currentLine += currentLine ? ` ${text}` : text;

          const maybeItem = textContent.items.find(
            (originalItem) =>
              "str" in originalItem && originalItem.str === text
          );

          if (
            maybeItem &&
            "transform" in maybeItem &&
            Array.isArray(maybeItem.transform)
          ) {
            const y = maybeItem.transform[5];

            if (lastY !== null && Math.abs(y - lastY) > 8) {
              children.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: currentLine.trim(),
                      size: 22,
                    }),
                  ],
                  spacing: {
                    after: 120,
                  },
                })
              );

              currentLine = text;
            }

            lastY = y;
          }
        }

        if (currentLine.trim()) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: currentLine.trim(),
                  size: 22,
                }),
              ],
              spacing: {
                after: 120,
              },
            })
          );
        }

        if (pageNumber < pdf.numPages) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: "",
                }),
              ],
              pageBreakBefore: true,
            })
          );
        }
      }

      if (children.length === 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "No selectable text was found in this PDF.",
                size: 22,
              }),
            ],
          })
        );
      }

      const doc = new Document({
        sections: [
          {
            properties: {},
            children,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);

      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);

      setError(
        "Unable to convert this PDF to Word. The PDF may be encrypted, scanned, or corrupted."
      );
    } finally {
      setProcessing(false);
    }
  };

  const downloadWord = () => {
    if (!resultBlob || !resultUrl) return;

    const link = document.createElement("a");

    link.href = resultUrl;
    link.download = `${file?.name.replace(/\.pdf$/i, "") || "document"}.docx`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
          PDF Tools
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          PDF to Word
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Convert selectable PDF text into an editable Word document online.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Upload PDF
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select a PDF file and convert its text into Word.
          </p>

          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className="mt-6 cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50"
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleInputChange}
              className="hidden"
            />

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
              📄
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              {file ? "PDF Selected" : "Upload your PDF"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Drag & drop your PDF here or click to browse
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Maximum file size: 50 MB
            </p>
          </div>

          {file && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900">
                    {file.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {formatSize(file.size)}
                    {pageCount > 0 && ` • ${pageCount} pages`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    reset();
                  }}
                  className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={convertToWord}
            disabled={!file || processing}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {processing ? "Converting to Word..." : "Convert to Word"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            PDF Preview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            A preview of the extracted PDF text will appear here.
          </p>

          <div className="mt-6 min-h-[280px] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-5">
            {!file ? (
              <div className="flex min-h-[240px] items-center justify-center text-center">
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                    📝
                  </div>

                  <p className="mt-4 font-medium text-slate-600">
                    No PDF selected
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Upload a PDF to preview its text.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Extracted Text Preview
                  </span>

                  {pageCount > 3 && (
                    <span className="text-xs text-slate-400">
                      First 3 pages
                    </span>
                  )}
                </div>

                <div className="max-h-[300px] overflow-auto rounded-xl bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm">
                  {previewText || "No selectable text found."}
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">
                Important:
              </span>{" "}
              This version extracts selectable PDF text. Scanned/image-only
              PDFs require OCR for text extraction.
            </p>
          </div>

          <button
            type="button"
            onClick={downloadWord}
            disabled={!resultUrl || !resultBlob}
            className="mt-5 w-full rounded-xl border border-blue-200 bg-blue-50 px-5 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
          >
            Download Word Document
          </button>
        </div>
      </div>
    </section>
  );
}
