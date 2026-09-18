"use client";

import { DragEvent, useRef, useState } from "react";

export default function ImageResizer() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  const [keepRatio, setKeepRatio] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const maxFileSize = 25 * 1024 * 1024;

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

    const url = URL.createObjectURL(selectedFile);
    const image = new Image();

    image.onload = () => {
      setFile(selectedFile);
      setPreview(url);

      setOriginalWidth(image.naturalWidth);
      setOriginalHeight(image.naturalHeight);

      setWidth(image.naturalWidth);
      setHeight(image.naturalHeight);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      setError("Could not load the image.");
    };

    image.src = url;
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

  const handleWidthChange = (value: number) => {
    setWidth(value);

    if (keepRatio && originalWidth > 0 && originalHeight > 0) {
      const newHeight = Math.round(
        (value / originalWidth) * originalHeight
      );

      setHeight(newHeight);
    }
  };

  const handleHeightChange = (value: number) => {
    setHeight(value);

    if (keepRatio && originalWidth > 0 && originalHeight > 0) {
      const newWidth = Math.round(
        (value / originalHeight) * originalWidth
      );

      setWidth(newWidth);
    }
  };

  const resizeImage = () => {
    if (!file) return;

    if (width <= 0 || height <= 0) {
      setError("Width and height must be greater than 0.");
      return;
    }

    if (width > 10000 || height > 10000) {
      setError("Maximum dimensions are 10000 × 10000 pixels.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setResultSize(null);

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setError("Could not process the image.");
        setLoading(false);
        return;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, 0, 0, width, height);

      const outputType =
        file.type === "image/png"
          ? "image/png"
          : file.type === "image/webp"
          ? "image/webp"
          : "image/jpeg";

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Image resizing failed.");
            setLoading(false);
            return;
          }

          const outputUrl = URL.createObjectURL(blob);

          setResult(outputUrl);
          setResultSize(blob.size);
          setLoading(false);
        },
        outputType,
        0.92
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
      file.type === "image/png"
        ? "png"
        : file.type === "image/webp"
        ? "webp"
        : "jpg";

    const link = document.createElement("a");

    link.href = result;
    link.download = `resized-image.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeFile = () => {
    setFile(null);
    setPreview("");
    setResult(null);
    setResultSize(null);
    setWidth(0);
    setHeight(0);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
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
            Image Resizer
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Resize your images to any custom width and height quickly and easily.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          {/* Upload Area */}
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

                {/* Preview */}
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
                    {originalWidth} × {originalHeight}px •{" "}
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

          {/* Resize Settings */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">

            <h2 className="text-lg font-semibold text-slate-900">
              Resize Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the dimensions you want for your resized image.
            </p>

            {/* Dimensions */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Width */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Width (px)
                </label>

                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={width || ""}
                  onChange={(event) =>
                    handleWidthChange(Number(event.target.value))
                  }
                  placeholder="Width"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Height */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Height (px)
                </label>

                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={height || ""}
                  onChange={(event) =>
                    handleHeightChange(Number(event.target.value))
                  }
                  placeholder="Height"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Keep Ratio */}
            <label className="mt-5 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={keepRatio}
                onChange={(event) => setKeepRatio(event.target.checked)}
                className="h-4 w-4 accent-blue-600"
              />

              <span className="text-sm font-medium text-slate-700">
                Maintain aspect ratio
              </span>
            </label>

            {/* Original dimensions */}
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Original dimensions
                </span>

                <span className="font-semibold text-slate-900">
                  {originalWidth > 0
                    ? `${originalWidth} × ${originalHeight}px`
                    : "—"}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  New dimensions
                </span>

                <span className="font-semibold text-blue-600">
                  {width > 0
                    ? `${width} × ${height}px`
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Resize Button */}
          <button
            type="button"
            onClick={resizeImage}
            disabled={!file || loading}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Resizing Image..." : "Resize Image"}
          </button>

          {/* Result Section - ALWAYS VISIBLE */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <h2 className="text-lg font-semibold text-slate-900">
              Resized Image
            </h2>

            {!result ? (
              <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">

                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                  📐
                </div>

                <p className="font-medium text-slate-600">
                  Your resized image will appear here.
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Resize an image to see the result.
                </p>
              </div>
            ) : (
              <>
                {/* Result Preview */}
                <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
                  <img
                    src={result}
                    alt="Resized image preview"
                    className="mx-auto max-h-96 max-w-full object-contain"
                  />
                </div>

                {/* Result Info */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">
                      Dimensions
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {width} × {height}px
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
              Download Resized Image
            </button>

          </div>
        </div>
      </div>
      <section className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">What is an Image Resizer?</h2>
        <p className="mt-3 leading-7 text-slate-600">
          An image resizer is an online tool that changes the width and height of an image while creating a new image at the selected dimensions. ToolsGift Image Resizer lets you resize images to specific pixel dimensions quickly and easily.
        </p>
        <h2 className="mt-7 text-2xl font-bold text-slate-900">How to Resize an Image</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Upload your image, enter the desired width and height, and resize the image. The resized result is generated directly in your browser and can then be downloaded to your device.
        </p>
        <h2 className="mt-7 text-2xl font-bold text-slate-900">Resize JPG, PNG and WebP Images</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Resize common image formats such as JPG, PNG and WebP for websites, social media, documents and other everyday uses. Choose the dimensions that fit your requirements and create a resized image in seconds.
        </p>
        <h2 className="mt-7 text-2xl font-bold text-slate-900">Image Resizing in Your Browser</h2>
        <p className="mt-3 leading-7 text-slate-600">
          ToolsGift processes image resizing in your web browser using standard browser image and canvas features. Your selected image is resized locally in the browser rather than being uploaded to a server by this tool.
        </p>
      </section>
    </main>
  );
}


