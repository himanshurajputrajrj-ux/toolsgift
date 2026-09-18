"use client";

import { DragEvent, useRef, useState } from "react";

export default function ImageToPDF() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const maxFileSize = 25 * 1024 * 1024;

  const handleFiles = (selectedFiles: FileList | File[]) => {
    setError("");
    setResult(null);

    const imageFiles = Array.from(selectedFiles).filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) {
      setError("Please select at least one valid image.");
      return;
    }

    const oversized = imageFiles.some(
      (file) => file.size > maxFileSize
    );

    if (oversized) {
      setError("Each image must be less than 25 MB.");
      return;
    }

    const newFiles = [...files, ...imageFiles];

    setFiles(newFiles);

    const newPreviews = imageFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews((previous) => [...previous, ...newPreviews]);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      handleFiles(event.target.files);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    if (event.dataTransfer.files) {
      handleFiles(event.dataTransfer.files);
    }
  };

  const removeImage = (index: number) => {
    setFiles((previous) =>
      previous.filter((_, fileIndex) => fileIndex !== index)
    );

    setPreviews((previous) =>
      previous.filter((_, previewIndex) => previewIndex !== index)
    );

    setResult(null);
  };

  const clearAll = () => {
    setFiles([]);
    setPreviews([]);
    setResult(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const createPDF = async () => {
    if (files.length === 0) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const imageUrl = URL.createObjectURL(file);

        const image = new Image();

        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () =>
            reject(new Error("Could not load image."));
          image.src = imageUrl;
        });

        const pageWidth = 210;
        const pageHeight = 297;

        const margin = 10;

        const maxWidth = pageWidth - margin * 2;
        const maxHeight = pageHeight - margin * 2;

        const imageRatio =
          image.naturalWidth / image.naturalHeight;

        let imageWidth = maxWidth;
        let imageHeight = imageWidth / imageRatio;

        if (imageHeight > maxHeight) {
          imageHeight = maxHeight;
          imageWidth = imageHeight * imageRatio;
        }

        const x = (pageWidth - imageWidth) / 2;
        const y = (pageHeight - imageHeight) / 2;

        if (i > 0) {
          pdf.addPage();
        }

        const imageType =
          file.type === "image/png" ? "PNG" : "JPEG";

        pdf.addImage(
          image,
          imageType,
          x,
          y,
          imageWidth,
          imageHeight
        );

        URL.revokeObjectURL(imageUrl);
      }

      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setResult(pdfUrl);
    } catch {
      setError("Could not create the PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!result) return;

    const link = document.createElement("a");

    link.href = result;
    link.download = "images-to-pdf.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            PDF Tools
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Image to PDF
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Convert one or multiple images into a PDF document quickly
            and easily.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          {/* Upload */}
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`rounded-2xl border-2 border-dashed p-8 text-center transition sm:p-12 ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-slate-50"
            }`}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
              📄
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              Upload Images
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Drag & drop images here or choose files
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Choose Images
            </button>

            <p className="mt-4 text-xs text-slate-400">
              JPG, PNG, WebP and other image formats • Max 25 MB each
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleInputChange}
            className="hidden"
          />

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Selected Images */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Selected Images
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {files.length > 0
                    ? `${files.length} image${
                        files.length > 1 ? "s" : ""
                      } selected`
                    : "No images selected yet"}
                </p>
              </div>

              {files.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Clear All
                </button>
              )}
            </div>

            {previews.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {previews.map((preview, index) => (
                  <div
                    key={`${preview}-${index}`}
                    className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <img
                      src={preview}
                      alt={`Selected image ${index + 1}`}
                      className="h-32 w-full object-contain bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-red-600 shadow"
                    >
                      ×
                    </button>

                    <div className="px-2 py-2 text-center text-xs text-slate-500">
                      Image {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <p className="text-sm text-slate-400">
                  Uploaded images will appear here.
                </p>
              </div>
            )}
          </div>

          {/* Create PDF Button */}
          <button
            type="button"
            onClick={createPDF}
            disabled={files.length === 0 || loading}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating PDF..." : "Convert Images to PDF"}
          </button>

          {/* Result - ALWAYS VISIBLE */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <h2 className="text-lg font-semibold text-slate-900">
              PDF Result
            </h2>

            {!result ? (
              <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">

                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                  📥
                </div>

                <p className="font-medium text-slate-600">
                  Your PDF will appear here.
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Convert your images to see the result.
                </p>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-6 text-center">

                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                  📄
                </div>

                <p className="font-semibold text-slate-900">
                  PDF Created Successfully
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {files.length} image
                  {files.length > 1 ? "s" : ""} converted into PDF
                </p>
              </div>
            )}

            {/* Download - ALWAYS VISIBLE */}
            <button
              type="button"
              onClick={downloadPDF}
              disabled={!result}
              className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Download PDF
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}
