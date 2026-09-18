"use client";

import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";
import * as pdfjsLib from "pdfjs-dist";
import { createWorker } from "tesseract.js";

type OCRResult = {
  page: number;
  text: string;
};

export default function OCRPDF() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [language, setLanguage] = useState("eng");
  const [scale, setScale] = useState(1.5);

  const [results, setResults] = useState<OCRResult[]>([]);
  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);

  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
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

    return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${
      units[index]
    }`;
  };

  const handleFile = async (selectedFile: File) => {
    setError("");
    setResults([]);
    setResultUrl("");
    setResultSize(0);
    setProgress(0);
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

      const pdf = await pdfjsLib.getDocument({
        data: new Uint8Array(bytes),
      }).promise;

      setFile(selectedFile);
      setPageCount(pdf.numPages);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to open this PDF. Please select a valid PDF."
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

  const runOCR = async () => {
    if (!file) {
      setError("Please upload a PDF first.");
      return;
    }

    setProcessing(true);
    setError("");
    setResults([]);
    setResultUrl("");
    setResultSize(0);
    setProgress(0);

    let worker: Awaited<ReturnType<typeof createWorker>> | null =
      null;

    try {
      const bytes = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: new Uint8Array(bytes),
      }).promise;

      worker = await createWorker(language);

      const extracted: OCRResult[] = [];

      for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
      ) {
        const page = await pdf.getPage(pageNumber);

        const viewport = page.getViewport({
          scale,
        });

        const canvas = document.createElement("canvas");

        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Canvas is not supported.");
        }

        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);

        await page.render({
          canvas,
          canvasContext: context,
          viewport,
        }).promise;

        const imageData = canvas.toDataURL("image/png");

        const result = await worker.recognize(imageData);

        extracted.push({
          page: pageNumber,
          text: result.data.text.trim(),
        });

        setResults([...extracted]);

        setProgress(
          Math.round((pageNumber / pdf.numPages) * 100)
        );
      }

      const fullText = extracted
        .map(
          (item) =>
            `--- Page ${item.page} ---\n\n${item.text}`
        )
        .join("\n\n");

      const blob = new Blob([fullText], {
        type: "text/plain;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setResultSize(blob.size);
    } catch (err) {
      console.error(err);

      setError(
        "OCR failed. Please try another PDF or reduce the OCR resolution."
      );
    } finally {
      if (worker) {
        await worker.terminate();
      }

      setProcessing(false);
    }
  };

  const downloadText = () => {
    if (!resultUrl) return;

    const link = document.createElement("a");

    link.href = resultUrl;

    link.download = `${
      file?.name.replace(/\.pdf$/i, "") || "ocr-result"
    }-ocr.txt`;

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
    setResults([]);
    setResultUrl("");
    setResultSize(0);
    setProgress(0);
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
            OCR PDF
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Extract text from scanned and image-based PDF documents
            directly in your browser.
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
              🔍
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              Upload Scanned PDF
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
                OCR Language
              </label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={processing}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-100"
              >
                <option value="eng">English</option>
              </select>

              <p className="mt-1 text-xs text-slate-400">
                English OCR is enabled in this browser version.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                OCR Resolution: {scale}x
              </label>

              <input
                type="range"
                min="1"
                max="2"
                step="0.25"
                value={scale}
                onChange={(e) =>
                  setScale(Number(e.target.value))
                }
                disabled={processing}
                className="mt-3 w-full accent-blue-600"
              />

              <p className="mt-1 text-xs text-slate-400">
                Higher resolution can improve recognition but takes
                longer.
              </p>
            </div>
          </div>

          {/* Progress */}
          {processing && (
            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-blue-900">
                  Processing OCR...
                </span>

                <span className="font-bold text-blue-700">
                  {progress}%
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action */}
          <button
            type="button"
            onClick={runOCR}
            disabled={!file || processing}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing
              ? "Running OCR..."
              : "Extract Text with OCR"}
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
                OCR Result
              </h2>

              {resultSize > 0 && (
                <span className="text-sm text-slate-500">
                  {formatBytes(resultSize)}
                </span>
              )}
            </div>

            <div className="min-h-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              {results.length > 0 ? (
                <div className="max-h-[600px] overflow-auto bg-white p-5">
                  {results.map((result) => (
                    <div
                      key={result.page}
                      className="mb-6 last:mb-0"
                    >
                      <div className="mb-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700">
                        Page {result.page}
                      </div>

                      <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                        {result.text || "[No text detected]"}
                      </pre>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[280px] items-center justify-center px-6 text-center">
                  <div>
                    <div className="mb-3 text-4xl">🔎</div>

                    <p className="font-medium text-slate-700">
                      Your OCR text will appear here
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Upload a scanned PDF and click Extract Text
                      with OCR.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Download ALWAYS visible */}
            <button
              type="button"
              onClick={downloadText}
              disabled={!resultUrl}
              className="mt-4 w-full rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Download OCR Text
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