"use client";

import { DragEvent, useRef, useState } from "react";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

export default function ImageConverter() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(85);
  const [result, setResult] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const maxFileSize = 25 * 1024 * 1024;

  const formatName = (type: OutputFormat) => {
    if (type === "image/jpeg") return "JPG";
    if (type === "image/png") return "PNG";
    return "WebP";
  };

  const handleFile = (selectedFile: File) => {
    setError("");
    setResult(null);
    setResultSize(null);

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (selectedFile.size > maxFileSize) {
      setError("File size must be less than 25 MB.");
      return;
    }

    setFile(selectedFile);

    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview("");
    setResult(null);
    setResultSize(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const convertImage = () => {
    if (!file) return;

    setLoading(true);
    setError("");

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setError("Could not process the image.");
        setLoading(false);
        return;
      }

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      // JPEG does not support transparency,
      // so use a white background.
      if (format === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(image, 0, 0);

      const outputQuality =
        format === "image/png" ? undefined : quality / 100;

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Image conversion failed.");
            setLoading(false);
            return;
          }

          const outputUrl = URL.createObjectURL(blob);

          setResult(outputUrl);
          setResultSize(blob.size);
          setLoading(false);
        },
        format,
        outputQuality
      );
    };

    image.onerror = () => {
      setError("Could not load the image.");
      setLoading(false);
    };

    image.src = URL.createObjectURL(file);
  };

  const downloadResult = () => {
    if (!result || !file) return;

    const extension =
      format === "image/jpeg"
        ? "jpg"
        : format === "image/png"
        ? "png"
        : "webp";

    const link = document.createElement("a");

    link.href = result;
    link.download = `converted-image.${extension}`;

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
            Image Tools
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Image Converter
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Convert your images to JPG, PNG, or WebP quickly and easily.
          </p>
        </div>

        {/* Upload Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

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
            {!file ? (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                  🖼️
                </div>

                <h2 className="text-xl font-semibold text-slate-900">
                  Upload an Image
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Drag & drop your image here or choose a file
                </p>

                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Choose File
                </button>

                <p className="mt-4 text-xs text-slate-400">
                  JPG, PNG, WebP and other image formats • Max 25 MB
                </p>
              </>
            ) : (
              <div className="space-y-5">
                <div className="mx-auto max-h-80 max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-2">
                  <img
                    src={preview}
                    alt="Selected image preview"
                    className="mx-auto max-h-72 max-w-full object-contain"
                  />
                </div>

                <div>
                  <p className="break-all font-semibold text-slate-900">
                    {file.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Conversion Settings */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Conversion Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select the format you want for your converted image.
            </p>

            {/* Format */}
            <div className="mt-5">
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Convert to
              </label>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat("image/jpeg")}
                  className={`rounded-xl border px-4 py-3 font-semibold transition ${
                    format === "image/jpeg"
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-blue-400"
                  }`}
                >
                  JPG
                </button>

                <button
                  type="button"
                  onClick={() => setFormat("image/png")}
                  className={`rounded-xl border px-4 py-3 font-semibold transition ${
                    format === "image/png"
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-blue-400"
                  }`}
                >
                  PNG
                </button>

                <button
                  type="button"
                  onClick={() => setFormat("image/webp")}
                  className={`rounded-xl border px-4 py-3 font-semibold transition ${
                    format === "image/webp"
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-blue-400"
                  }`}
                >
                  WebP
                </button>
              </div>
            </div>

            {/* Quality */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">
                  Quality
                </label>

                <span className="text-sm font-semibold text-blue-600">
                  {quality}%
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(event) =>
                  setQuality(Number(event.target.value))
                }
                disabled={format === "image/png"}
                className="w-full accent-blue-600 disabled:opacity-50"
              />

              {format === "image/png" && (
                <p className="mt-2 text-xs text-slate-400">
                  Quality control is not used for PNG conversion.
                </p>
              )}
            </div>
          </div>

          {/* Convert Button */}
          <button
            type="button"
            onClick={convertImage}
            disabled={!file || loading}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Converting Image..."
              : `Convert Image to ${formatName(format)}`}
          </button>

          {/* Result Card - ALWAYS VISIBLE */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Converted Image
            </h2>

            {!result ? (
              <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                  📥
                </div>

                <p className="font-medium text-slate-600">
                  Your converted image will appear here.
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Convert an image to see the result.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
                  <img
                    src={result}
                    alt="Converted image preview"
                    className="mx-auto max-h-96 max-w-full object-contain"
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">
                      Output Format
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {formatName(format)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">
                      Output Size
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {resultSize
                        ? `${(resultSize / 1024 / 1024).toFixed(2)} MB`
                        : "-"}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* DOWNLOAD BUTTON - ALWAYS VISIBLE */}
            <button
              type="button"
              onClick={downloadResult}
              disabled={!result}
              className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Download Converted Image
            </button>
          </div>
          <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-slate-900">
                What is an Image Converter?
              </h2>
              <p className="mt-3 text-slate-600 leading-7">
                An image converter changes a picture from one file format to another while keeping the image available for use in the selected format. Different formats can be useful for websites, sharing, editing, storage and other digital workflows.
              </p>
              <h2 className="mt-8 text-2xl font-bold text-slate-900">
                How to Convert an Image
              </h2>
              <p className="mt-3 text-slate-600 leading-7">
                Upload an image, select the desired output format and adjust the available quality setting when supported. Click the convert button and download the converted image when processing is complete.
              </p>
              <h2 className="mt-8 text-2xl font-bold text-slate-900">
                JPG, PNG and WebP Conversion
              </h2>
              <p className="mt-3 text-slate-600 leading-7">
                ToolsGift provides image conversion between common formats such as JPG, PNG and WebP. Choosing the right format can help balance image quality, file size and compatibility with your intended use.
              </p>
              <h2 className="mt-8 text-2xl font-bold text-slate-900">
                Image Conversion in Your Browser
              </h2>
              <p className="mt-3 text-slate-600 leading-7">
                The image conversion tool processes images directly in your browser, so the conversion workflow can be performed on your device without requiring a separate desktop image conversion application.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

