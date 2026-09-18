"use client";

import {
  ChangeEvent,
  DragEvent,
  useState,
} from "react";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";

type Language = {
  code: string;
  name: string;
};

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
  { code: "bn", name: "Bengali" },
  { code: "gu", name: "Gujarati" },
  { code: "mr", name: "Marathi" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "kn", name: "Kannada" },
  { code: "pa", name: "Punjabi" },
];

export default function PDFTranslator() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] =
    useState<ArrayBuffer | null>(null);

  const [pageCount, setPageCount] = useState(0);
  const [sourceLanguage, setSourceLanguage] =
    useState("en");
  const [targetLanguage, setTargetLanguage] =
    useState("hi");

  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] =
    useState("");

  const [extracting, setExtracting] = useState(false);
  const [translating, setTranslating] = useState(false);

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

  const extractText = async (
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

      if (pageText) {
        pages.push(
          `--- Page ${i} ---\n${pageText}`
        );
      }
    }

    return {
      pageCount: pdf.numPages,
      text: pages.join("\n\n"),
    };
  };

  const loadPDF = async (selectedFile: File) => {
    setError("");
    setTranslatedText("");
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

      // Validate PDF.
      const pdf = await PDFDocument.load(bytes);

      const extracted =
        await extractText(bytes);

      setFile(selectedFile);
      setPdfBytes(bytes);
      setPageCount(pdf.getPageCount());
      setSourceText(extracted.text);

      if (!extracted.text.trim()) {
        setError(
          "No selectable text was found. This may be a scanned PDF. Use OCR PDF first."
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        "Unable to read this PDF. Please make sure it is a valid PDF."
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

  const translateChunk = async (
    chunk: string
  ) => {
    const url =
      `https://api.mymemory.translated.net/get` +
      `?q=${encodeURIComponent(chunk)}` +
      `&langpair=${encodeURIComponent(
        `${sourceLanguage}|${targetLanguage}`
      )}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Translation service request failed."
      );
    }

    const data = await response.json();

    if (
      data?.responseStatus &&
      Number(data.responseStatus) !== 200
    ) {
      throw new Error(
        data?.responseDetails ||
          "Translation failed."
      );
    }

    return (
      data?.responseData?.translatedText || ""
    );
  };

  const splitIntoChunks = (
    text: string,
    maxLength = 450
  ) => {
    const words = text.split(/\s+/);

    const chunks: string[] = [];
    let current = "";

    for (const word of words) {
      const next =
        current.length > 0
          ? `${current} ${word}`
          : word;

      if (next.length > maxLength) {
        if (current) {
          chunks.push(current);
        }

        current = word;
      } else {
        current = next;
      }
    }

    if (current) {
      chunks.push(current);
    }

    return chunks;
  };

  const translatePDF = async () => {
    if (!sourceText.trim()) {
      setError(
        "No text is available for translation."
      );
      return;
    }

    if (sourceLanguage === targetLanguage) {
      setTranslatedText(sourceText);
      return;
    }

    setTranslating(true);
    setError("");
    setTranslatedText("");
    setResultUrl("");

    try {
      const pageBlocks =
        sourceText.split(/\n--- Page \d+ ---\n/);

      const translatedBlocks: string[] = [];

      for (
        let i = 0;
        i < pageBlocks.length;
        i++
      ) {
        const block = pageBlocks[i].trim();

        if (!block) continue;

        const chunks =
          splitIntoChunks(block);

        const translatedChunks: string[] = [];

        for (
          let j = 0;
          j < chunks.length;
          j++
        ) {
          const translated =
            await translateChunk(
              chunks[j]
            );

          translatedChunks.push(
            translated
          );
        }

        translatedBlocks.push(
          `--- Page ${i + 1} ---\n${translatedChunks.join(
            " "
          )}`
        );
      }

      const finalText =
        translatedBlocks.join("\n\n");

      setTranslatedText(finalText);
    } catch (err) {
      console.error(err);

      setError(
        "Translation failed. Please try again or use a smaller PDF."
      );
    } finally {
      setTranslating(false);
    }
  };

  const downloadTranslation = () => {
    if (!translatedText) return;

    const sourceName =
      file?.name
        .replace(/\.pdf$/i, "")
        .trim() || "document";

    const targetName =
      languages.find(
        (language) =>
          language.code === targetLanguage
      )?.name || targetLanguage;

    const content =
      `PDF TRANSLATION\n\n` +
      `Original file: ${
        file?.name || "document.pdf"
      }\n` +
      `Source language: ${
        languages.find(
          (language) =>
            language.code === sourceLanguage
        )?.name || sourceLanguage
      }\n` +
      `Target language: ${targetName}\n` +
      `Pages: ${pageCount}\n\n` +
      `TRANSLATED TEXT\n` +
      `================\n\n` +
      translatedText +
      `\n\nGenerated by ToolsGift`;

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
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
      `${sourceName}-${targetLanguage}-translated.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setFile(null);
    setPdfBytes(null);
    setPageCount(0);

    setSourceText("");
    setTranslatedText("");

    setSourceLanguage("en");
    setTargetLanguage("hi");

    setExtracting(false);
    setTranslating(false);

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
            PDF Translator
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Extract text from a PDF, translate it into another
            language, and download the translated document.
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
                  "pdf-translator-input"
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
              id="pdf-translator-input"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleInput}
              className="hidden"
            />

            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              ðŸŒ
            </div>

            <p className="font-semibold text-slate-800">
              {file
                ? "Replace PDF"
                : "Upload PDF"}
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
                    {formatBytes(file.size)} â€¢{" "}
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

          {/* Language settings */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Source Language
              </span>

              <select
                value={sourceLanguage}
                onChange={(e) => {
                  setSourceLanguage(
                    e.target.value
                  );
                  setTranslatedText("");
                  setResultUrl("");
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                {languages.map(
                  (language) => (
                    <option
                      key={language.code}
                      value={language.code}
                    >
                      {language.name}
                    </option>
                  )
                )}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Target Language
              </span>

              <select
                value={targetLanguage}
                onChange={(e) => {
                  setTargetLanguage(
                    e.target.value
                  );
                  setTranslatedText("");
                  setResultUrl("");
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                {languages.map(
                  (language) => (
                    <option
                      key={language.code}
                      value={language.code}
                    >
                      {language.name}
                    </option>
                  )
                )}
              </select>
            </label>
          </div>

          {/* Privacy/API notice */}
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">
              Translation service notice
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-800">
              PDF text is sent to the translation service for
              translation. Do not use this mode for confidential
              documents unless you are comfortable with that
              service's terms and privacy policy.
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
                    ðŸ“„
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

          {/* Translate */}
          <button
            type="button"
            onClick={translatePDF}
            disabled={
              !file ||
              !sourceText ||
              extracting ||
              translating
            }
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {translating
              ? "Translating PDF..."
              : "Translate PDF"}
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
              Translation Result
            </h2>

            {!translatedText ? (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-6 text-center">
                <div>
                  <div className="mb-3 text-4xl">
                    ðŸŒ
                  </div>

                  <p className="font-medium text-slate-700">
                    Translated text will appear here
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Choose languages and translate the PDF.
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-h-[500px] overflow-auto rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                  {translatedText}
                </p>
              </div>
            )}
          </div>

          {/* Download always visible */}
          <button
            type="button"
            onClick={downloadTranslation}
            disabled={!translatedText}
            className={`mt-5 w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition ${
              translatedText
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >
            Download Translation
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
