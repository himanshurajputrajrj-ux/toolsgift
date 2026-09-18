"use client";

import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";
import { jsPDF } from "jspdf";

type ScanImage = {
  id: string;
  file: File;
  preview: string;
};

export default function ScanToPDF() {
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<ScanImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 25 * 1024 * 1024;
  const MAX_IMAGES = 50;

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

  const addFiles = (files: File[]) => {
    setError("");
    setResultUrl("");
    setResultSize(0);

    const remaining = MAX_IMAGES - images.length;

    if (remaining <= 0) {
      setError(`You can scan or upload up to ${MAX_IMAGES} pages.`);
      return;
    }

    const selectedFiles = files.slice(0, remaining);

    const invalid = selectedFiles.find(
      (file) =>
        !file.type.startsWith("image/") ||
        file.size > MAX_FILE_SIZE
    );

    if (invalid) {
      setError(
        `"${invalid.name}" is not a valid image or is larger than 25MB.`
      );
      return;
    }

    const newImages: ScanImage[] = selectedFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((current) => [...current, ...newImages]);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length) {
      addFiles(files);
    }

    e.target.value = "";
  };

  const handleCamera = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      addFiles([file]);
    }

    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files || []);

    if (files.length) {
      addFiles(files);
    }
  };

  const removeImage = (id: string) => {
    setImages((current) => {
      const target = current.find((image) => image.id === id);

      if (target) {
        URL.revokeObjectURL(target.preview);
      }

      return current.filter((image) => image.id !== id);
    });

    setResultUrl("");
    setResultSize(0);
  };

  const moveImage = (
    index: number,
    direction: "up" | "down"
  ) => {
    const newImages = [...images];

    if (direction === "up" && index > 0) {
      [newImages[index - 1], newImages[index]] = [
        newImages[index],
        newImages[index - 1],
      ];
    }

    if (
      direction === "down" &&
      index < newImages.length - 1
    ) {
      [newImages[index + 1], newImages[index]] = [
        newImages[index],
        newImages[index + 1],
      ];
    }

    setImages(newImages);
    setResultUrl("");
    setResultSize(0);
  };

  const clearAll = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });

    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setImages([]);
    setResultUrl("");
    setResultSize(0);
    setError("");
  };

  const scanToPDF = async () => {
    if (!images.length) {
      setError("Please scan or upload at least one page.");
      return;
    }

    setProcessing(true);
    setError("");
    setResultUrl("");
    setResultSize(0);

    try {
      const firstImage = new Image();
      firstImage.src = images[0].preview;

      await new Promise<void>((resolve, reject) => {
        firstImage.onload = () => resolve();
        firstImage.onerror = () =>
          reject(new Error("Unable to load image."));
      });

      const firstLandscape =
        firstImage.naturalWidth > firstImage.naturalHeight;

      const pdf = new jsPDF({
        orientation: firstLandscape
          ? "landscape"
          : "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pageWidth = 210;
      const pageHeight = 297;

      const margin = 8;
      const usableWidth = pageWidth - margin * 2;
      const usableHeight = pageHeight - margin * 2;

      for (let i = 0; i < images.length; i++) {
        if (i > 0) {
          pdf.addPage();
        }

        const image = new Image();
        image.src = images[i].preview;

        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () =>
            reject(new Error("Unable to load scanned page."));
        });

        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;

        const ratio = Math.min(
          usableWidth / imageWidth,
          usableHeight / imageHeight
        );

        const renderWidth = imageWidth * ratio;
        const renderHeight = imageHeight * ratio;

        const x =
          margin + (usableWidth - renderWidth) / 2;

        const y =
          margin + (usableHeight - renderHeight) / 2;

        const format = images[i].file.type.includes("png")
          ? "PNG"
          : "JPEG";

        pdf.addImage(
          image,
          format,
          x,
          y,
          renderWidth,
          renderHeight,
          undefined,
          "FAST"
        );
      }

      const blob = pdf.output("blob");

      const url = URL.createObjectURL(blob);

      setResultUrl(url);
      setResultSize(blob.size);
    } catch (err) {
      console.error(err);
      setError("Failed to create the scanned PDF.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (!resultUrl) return;

    const link = document.createElement("a");

    link.href = resultUrl;
    link.download = "ToolsGift-scanned-document.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mb-3 text-sm font-semibold text-blue-600">
            PDF TOOLS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Scan to PDF
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Scan documents with your camera or upload images and
            combine them into one PDF.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* Upload options */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Camera */}
            <label className="cursor-pointer rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center transition hover:bg-blue-100">
              <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleCamera}
                className="hidden"
              />

              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                📷
              </div>

              <h2 className="font-semibold text-slate-800">
                Scan with Camera
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Use your device camera to capture a page
              </p>
            </label>

            {/* Upload */}
            <label className="cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleInput}
                className="hidden"
              />

              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                🖼️
              </div>

              <h2 className="font-semibold text-slate-800">
                Upload Images
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Select one or multiple document images
              </p>
            </label>
          </div>

          {/* Drag drop */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`mt-5 rounded-2xl border-2 border-dashed p-7 text-center transition ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-slate-50"
            }`}
          >
            <p className="text-sm font-medium text-slate-700">
              Or drag & drop scanned images here
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Up to 50 pages • Maximum 25MB per image
            </p>
          </div>

          {/* Page count */}
          <div className="mt-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800">
                Scanned Pages
              </h2>

              <p className="text-xs text-slate-500">
                {images.length} of {MAX_IMAGES} pages
              </p>
            </div>

            {images.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Pages */}
          {images.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="relative flex h-56 items-center justify-center bg-slate-100 p-3">
                    <img
                      src={image.preview}
                      alt={`Scanned page ${index + 1}`}
                      className="max-h-full max-w-full object-contain shadow-sm"
                    />

                    <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                      {index + 1}
                    </div>
                  </div>

                  <div className="p-3">
                    <p className="truncate text-sm font-medium text-slate-700">
                      {image.file.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {formatBytes(image.file.size)}
                    </p>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          moveImage(index, "up")
                        }
                        disabled={index === 0}
                        className="rounded-lg border border-slate-300 py-2 text-sm hover:bg-slate-50 disabled:opacity-40"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          moveImage(index, "down")
                        }
                        disabled={
                          index === images.length - 1
                        }
                        className="rounded-lg border border-slate-300 py-2 text-sm hover:bg-slate-50 disabled:opacity-40"
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(image.id)
                        }
                        className="rounded-lg border border-red-200 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 flex min-h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-center">
              <div>
                <div className="mb-3 text-4xl">📄</div>

                <p className="font-medium text-slate-700">
                  No scanned pages yet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Scan a document or upload images to get started.
                </p>
              </div>
            </div>
          )}

          {/* Action */}
          <button
            type="button"
            onClick={scanToPDF}
            disabled={!images.length || processing}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing
              ? "Creating PDF..."
              : "Create Scanned PDF"}
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
                PDF Result
              </h2>

              {resultSize > 0 && (
                <span className="text-sm text-slate-500">
                  {formatBytes(resultSize)}
                </span>
              )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              {resultUrl ? (
                <iframe
                  src={resultUrl}
                  title="Scanned PDF Preview"
                  className="h-[600px] w-full bg-white"
                />
              ) : (
                <div className="flex min-h-[280px] items-center justify-center px-6 text-center">
                  <div>
                    <div className="mb-3 text-4xl">📑</div>

                    <p className="font-medium text-slate-700">
                      Your scanned PDF will appear here
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Scan or upload pages, then create your PDF.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Download ALWAYS visible */}
            <button
              type="button"
              onClick={downloadPDF}
              disabled={!resultUrl}
              className="mt-4 w-full rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Download Scanned PDF
            </button>
          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={clearAll}
            className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Clear & Reset
          </button>
        </div>
      </div>
    </section>
  );
}

