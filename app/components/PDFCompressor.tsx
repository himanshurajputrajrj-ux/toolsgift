"use client";
import ShareFileResult from "./ShareFileResult";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { getToolText } from "@/app/i18n/translations";
import { useLanguage } from "@/app/providers/LanguageProvider";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

type CompressionLevel = "low" | "medium" | "high";

type GhostscriptFile = { name: string; data: Uint8Array };
type GhostscriptRunner = {
  load?: () => Promise<void>;
  exec(
    args: string[],
    options?: {
      files?: Array<{ name: string; data: Uint8Array }>;
      dirs?: string[];
      outputs?: string[];
    },
  ): Promise<{ exitCode: number; files: GhostscriptFile[]; stderr?: string }>;
  dispose(): void;
};
type GhostscriptBrowserApi = {
  loadHosted(options: { baseUrl: string }): Promise<GhostscriptRunner>;
};

async function loadGhostscript(): Promise<GhostscriptRunner> {
  const browserWindow = window as typeof window & {
    WasmZooGhostscript?: GhostscriptBrowserApi;
    __toolsgiftGhostscriptLoading?: Promise<void>;
  };

  if (!browserWindow.WasmZooGhostscript) {
    if (!browserWindow.__toolsgiftGhostscriptLoading) {
      browserWindow.__toolsgiftGhostscriptLoading = new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "/ghostscript/browser-ghostscript.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Could not load the Ghostscript browser runtime."));
        document.head.appendChild(script);
      });
    }
    await browserWindow.__toolsgiftGhostscriptLoading;
  }

  const api = browserWindow.WasmZooGhostscript;
  if (!api) throw new Error("Ghostscript browser API was not initialized.");

  const runner = await api.loadHosted({
    baseUrl: new URL("/ghostscript/", window.location.origin).href,
  });
  if (typeof runner.load === "function") await runner.load();
  return runner;
}
export default function PDFCompressor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale, t } = useLanguage();
  const toolText = getToolText(locale, "pdf-compressor");

  const [file, setFile] = useState<File | null>(null);
  const [compression, setCompression] =
    useState<CompressionLevel>("medium");

  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
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
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleFile = (selectedFile: File) => {
    setError("");
    clearResult();

    if (selectedFile.type !== "application/pdf") {
      setError(t.messages.invalidFile);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(t.messages.fileTooLarge);
      return;
    }

    setFile(selectedFile);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const compressPDF = async () => {
    if (!file) return;
    setProcessing(true);
    setError("");
    clearResult();
    try {
      const sourceBytes = new Uint8Array(await file.arrayBuffer());
      const gs = await loadGhostscript();
      try {
        const preset = compression === "high" ? "/screen" : compression === "low" ? "/printer" : "/ebook";
        const imageSettings = compression === "low" ? ["-dDownsampleColorImages=false", "-dDownsampleGrayImages=false"] : compression === "medium" ? ["-dDownsampleColorImages=true", "-dColorImageDownsampleType=/Bicubic", "-dColorImageResolution=150", "-dDownsampleGrayImages=true", "-dGrayImageDownsampleType=/Bicubic", "-dGrayImageResolution=150"] : ["-dDownsampleColorImages=true", "-dColorImageDownsampleType=/Bicubic", "-dColorImageResolution=96", "-dDownsampleGrayImages=true", "-dGrayImageDownsampleType=/Bicubic", "-dGrayImageResolution=96"]
        const result = await gs.exec(
          [
            "-dSAFER", "-dBATCH", "-dNOPAUSE", "-dQUIET",
            "-sDEVICE=pdfwrite", "-dCompatibilityLevel=1.4",
            `-dPDFSETTINGS=${preset}`,
            ...imageSettings, "-dDetectDuplicateImages=true",
            "-dCompressFonts=true", "-dSubsetFonts=true",
            "-sOutputFile=/output.pdf", "/input.pdf",
          ],
          {
            files: [{ name: "/input.pdf", data: sourceBytes }],
            outputs: ["/output.pdf"],
          },
        );
        if (result.exitCode !== 0) {
          throw new Error(result.stderr || "Ghostscript PDF compression failed.");
        }
        const outputFile = result.files.find((entry) => entry.name === "/output.pdf") ?? result.files[0];
        if (!outputFile?.data?.byteLength) throw new Error("Ghostscript did not return a PDF.");
        const candidate = new Blob([new Uint8Array(outputFile.data)], { type: "application/pdf" });
        const finalBlob = candidate.size < file.size ? candidate : file;
        setResultBlob(finalBlob);
        setResultUrl(URL.createObjectURL(finalBlob));
      } finally {
        gs.dispose();
      }
    } catch (err) {
      console.error("PDF compression failed:", err);
      setError(t.messages.processingFailed);
    } finally {
      setProcessing(false);
    }
  };
  const downloadPDF = () => {
    if (!resultBlob || !resultUrl) return;

    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `compressed-${file?.name || "document.pdf"}`;
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

  const compressionOptions = [
    {
      value: "low" as CompressionLevel,
      label: "Low",
      description: "Better quality, smaller reduction",
    },
    {
      value: "medium" as CompressionLevel,
      label: "Medium",
      description: "Balanced quality and size",
    },
    {
      value: "high" as CompressionLevel,
      label: "High",
      description: "Maximum browser-side optimization",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
          PDF Tools
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {toolText.title}
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          {toolText.description}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Compression Settings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose how aggressively you want to optimize the PDF.
          </p>

          <div className="mt-5 space-y-3">
            {compressionOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setCompression(option.value)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  compression === option.value
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                    : "border-slate-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">
                    {option.label}
                  </span>

                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      compression === option.value
                        ? "border-blue-600"
                        : "border-slate-300"
                    }`}
                  >
                    {compression === option.value && (
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    )}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {option.description}
                </p>
              </button>
            ))}
          </div>

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
              {file ? "PDF Selected" : t.common.upload}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {t.common.dragDrop}
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
                  </p>
                </div>

                <button
                  type="button"
                  onClick={reset}
                  className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {t.common.remove}
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
            onClick={compressPDF}
            disabled={!file || processing}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {processing ? t.common.processing : "Compress PDF"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Compressed PDF
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your compressed file will appear here.
              </p>
            </div>
          </div>

          <div className="mt-6 flex min-h-[280px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6">
            {!resultUrl ? (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                  📦
                </div>

                <p className="mt-4 font-medium text-slate-600">
                  No compressed PDF yet
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Upload a PDF and click “Compress PDF”.
                </p>
              </div>
            ) : (
              <div className="w-full text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                  ✓
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {file && resultBlob && resultBlob.size < file.size ? "PDF compressed successfully" : "No further size reduction"}
                </h3>

                {file && resultBlob && (
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {resultBlob.size < file.size
                      ? `${(((file.size - resultBlob.size) / file.size) * 100).toFixed(1)}% smaller than original`
                      : "No size reduction; the original PDF is kept."}
                  </p>
                )}

                {file && resultBlob && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-100 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Original
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {formatSize(file.size)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                        Compressed
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {formatSize(resultBlob.size)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={downloadPDF}
            disabled={!resultUrl || !resultBlob}
            className="mt-5 w-full rounded-xl border border-blue-200 bg-blue-50 px-5 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
          >
            {t.common.download} Compressed PDF
          </button>
          {resultBlob && (
            <ShareFileResult
              tool="pdf-compressor"
              resultTitle="PDF Compressor Result"
              file={resultBlob}
              filename={`compressed-${file?.name || "document.pdf"}`}
            />
          )}

          <p className="mt-3 text-center text-xs text-slate-400">
            Your files are processed locally in your browser.
          </p>
        </div>
      </div>
    </section>
  );
}
