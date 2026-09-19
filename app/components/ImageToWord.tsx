"use client";

import { DragEvent, useRef, useState } from "react";

export default function ImageToWord() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [result, setResult] = useState<Blob | null>(null);

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

    if (imageFiles.some((file) => file.size > maxFileSize)) {
      setError("Each image must be less than 25 MB.");
      return;
    }

    setFiles((previous) => [...previous, ...imageFiles]);

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

  const removeFile = (index: number) => {
    setFiles((previous) =>
      previous.filter((_, i) => i !== index)
    );

    setPreviews((previous) =>
      previous.filter((_, i) => i !== index)
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

  const createWord = async () => {
    if (files.length === 0) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const {
        Document,
        Packer,
        Paragraph,
        ImageRun,
      } = await import("docx");

      const paragraphs: InstanceType<typeof Paragraph>[] = [];

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();

        let imageType: "png" | "jpg" | "gif" | "bmp" = "png";

        if (file.type === "image/jpeg") {
          imageType = "jpg";
        } else if (file.type === "image/gif") {
          imageType = "gif";
        } else if (file.type === "image/bmp") {
          imageType = "bmp";
        }

        paragraphs.push(
          new Paragraph({
            children: [
              new ImageRun({
                data: arrayBuffer,
                transformation: {
                  width: 500,
                  height: 350,
                },
                type: imageType,
              }),
            ],
            spacing: {
              after: 400,
            },
          })
        );
      }

      const document = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
          },
        ],
      });

      const blob = await Packer.toBlob(document);

      setResult(blob);
    } catch {
      setError(
        "Could not create the Word document. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;

    const url = URL.createObjectURL(result);

    const link = document.createElement("a");
    link.href = url;
    link.download = "images-to-word.docx";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Image Tools
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Image to Word
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Convert your images into a Word document quickly and easily.
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
              📝
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

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                      className="h-32 w-full bg-white object-contain"
                    />

                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-red-600 shadow"
                    >
                      ×
                    </button>

                    <div className="truncate px-2 py-2 text-center text-xs text-slate-500">
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

          {/* Conversion Settings */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">

            <h2 className="text-lg font-semibold text-slate-900">
              Word Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your images will be placed into a downloadable Word document.
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Output format
                </span>

                <span className="font-semibold text-blue-600">
                  DOCX
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Images per document
                </span>

                <span className="font-semibold text-slate-900">
                  {files.length || "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Convert Button */}
          <button
            type="button"
            onClick={createWord}
            disabled={files.length === 0 || loading}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating Word Document..."
              : "Convert to Word"}
          </button>

          {/* Result - ALWAYS VISIBLE */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <h2 className="text-lg font-semibold text-slate-900">
              Word Result
            </h2>

            {!result ? (
              <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">

                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                  📄
                </div>

                <p className="font-medium text-slate-600">
                  Your Word document will appear here.
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
                  Word Document Created Successfully
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {files.length} image
                  {files.length > 1 ? "s" : ""} added to the document
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  DOCX document
                </p>
              </div>
            )}

            {/* DOWNLOAD BUTTON - ALWAYS VISIBLE */}
            <button
              type="button"
              onClick={downloadResult}
              disabled={!result}
              className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Download Word Document
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}
