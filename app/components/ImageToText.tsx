"use client";
import { useRef, useState } from "react";
import ShareResult from "./ShareResult";
import { createWorker } from "tesseract.js";
type OCRResult = {
  name: string;
  text: string;
};
export default function ImageToText() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<OCRResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const extractText = async (selectedFile: File) => {
    setProcessing(true);
    setProgress(0);
    setError("");
    setResult(null);
    try {
      const worker = await createWorker("eng", 1, {
        logger: (message) => {
          if (message.status === "recognizing text") {
            setProgress(Math.round((message.progress || 0) * 100));
          }
        },
      });
      const { data } = await worker.recognize(selectedFile);
      await worker.terminate();
      setResult({
        name: selectedFile.name,
        text: data.text.trim(),
      });
    } catch {
      setError("Text extraction failed. Please try another image.");
    } finally {
      setProcessing(false);
    }
  };
  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Maximum file size is 10 MB.");
      return;
    }
    setFile(selectedFile);
    setError("");
    void extractText(selectedFile);
  };
  const clearAndReset = () => {
    setFile(null);
    setResult(null);
    setError("");
    setProgress(0);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const copyText = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.text);
  };
  const downloadText = () => {
    if (!result) return;
    const blob = new Blob([result.text], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${result.name.replace(/\.[^/.]+$/, "")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Image to Text
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Extract text from images instantly with browser-based OCR.
          </p>
        </div>
        <div className="mt-6">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0];
              if (selectedFile) {
                handleFile(selectedFile);
              }
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={processing}
            className="w-full rounded-xl border-2 border-dashed border-gray-300 px-6 py-12 text-center transition hover:border-blue-500 dark:border-gray-700 dark:hover:border-blue-500"
          >
            <div className="text-4xl">📄</div>
            <div className="mt-3 font-semibold text-gray-900 dark:text-white">
              {processing ? "Extracting text..." : "Upload an image"}
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              JPG, PNG, WebP and other common image formats
            </div>
          </button>
        </div>
        {processing && (
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Recognizing text</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}
      </section>
      {result && (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Extracted Text
          </h2>
          <textarea
            value={result.text}
            onChange={(event) =>
              setResult({
                ...result,
                text: event.target.value,
              })
            }
            className="mt-4 min-h-72 w-full rounded-xl border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            placeholder="Extracted text will appear here..."
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyText}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Copy Text
            </button>
            <button
              type="button"
              onClick={downloadText}
              className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Download Text
            </button>
            <ShareResult key={result.text} tool="image-to-text" resultTitle="Extracted Image Text" value={result.text} filename={`${result.name.replace(/\.[^/.]+$/, "")}.txt`} />
            <button
              type="button"
              onClick={clearAndReset}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Clear & Reset
            </button>
          </div>
          {file && (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Source: {file.name}
            </p>
          )}
        </section>
      )}
    </div>
  );
}
