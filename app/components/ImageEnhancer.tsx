"use client";

import { DragEvent, useRef, useState } from "react";
import ShareResult from "./ShareResult";

export default function ImageEnhancer() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [sharpness, setSharpness] = useState(0);

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

    setFile(selectedFile);
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

  const enhanceImage = () => {
    if (!file) return;

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

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      /*
       * Apply image adjustments.
       */
      ctx.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        saturate(${saturation}%)
      `;

      ctx.drawImage(image, 0, 0);

      /*
       * Basic sharpening effect.
       * This uses a lightweight convolution filter so the
       * enhancement actually changes the generated image.
       */
      if (sharpness > 0) {
        const imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        const source = imageData.data;
        const output = new Uint8ClampedArray(source);

        const amount = sharpness / 100;

        for (let y = 1; y < canvas.height - 1; y++) {
          for (let x = 1; x < canvas.width - 1; x++) {
            const index = (y * canvas.width + x) * 4;

            for (let channel = 0; channel < 3; channel++) {
              const center = source[index + channel];

              const top =
                source[
                  ((y - 1) * canvas.width + x) * 4 + channel
                ];

              const bottom =
                source[
                  ((y + 1) * canvas.width + x) * 4 + channel
                ];

              const left =
                source[
                  (y * canvas.width + (x - 1)) * 4 + channel
                ];

              const right =
                source[
                  (y * canvas.width + (x + 1)) * 4 + channel
                ];

              const sharpened =
                center * (1 + 4 * amount) -
                (top + bottom + left + right) * amount;

              output[index + channel] = Math.max(
                0,
                Math.min(255, sharpened)
              );
            }
          }
        }

        imageData.data.set(output);
        ctx.putImageData(imageData, 0, 0);
      }

      const outputType =
        file.type === "image/png"
          ? "image/png"
          : file.type === "image/webp"
          ? "image/webp"
          : "image/jpeg";

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Image enhancement failed.");
            setLoading(false);
            return;
          }

          const outputUrl = URL.createObjectURL(blob);

          setResult(outputUrl);
          setResultSize(blob.size);
          setLoading(false);
        },
        outputType,
        0.94
      );
    };

    image.onerror = () => {
      setError("Could not load the image.");
      setLoading(false);
    };

    image.src = URL.createObjectURL(file);
  };

  const resetSettings = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setSharpness(0);
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
    link.download = `enhanced-image.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeFile = () => {
    setFile(null);
    setPreview("");
    setResult(null);
    setResultSize(null);
    setError("");

    resetSettings();

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
            Image Enhancer
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Enhance your images by adjusting brightness, contrast,
            saturation, and sharpness.
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
                  ✨
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

          {/* Enhancement Settings */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Enhancement Settings
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Adjust the image appearance before enhancing.
                </p>
              </div>

              <button
                type="button"
                onClick={resetSettings}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Reset Settings
              </button>
            </div>

            {/* Brightness */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">
                  Brightness
                </label>

                <span className="text-sm font-semibold text-blue-600">
                  {brightness}%
                </span>
              </div>

              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(event) =>
                  setBrightness(Number(event.target.value))
                }
                className="w-full accent-blue-600"
              />
            </div>

            {/* Contrast */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">
                  Contrast
                </label>

                <span className="text-sm font-semibold text-blue-600">
                  {contrast}%
                </span>
              </div>

              <input
                type="range"
                min="50"
                max="150"
                value={contrast}
                onChange={(event) =>
                  setContrast(Number(event.target.value))
                }
                className="w-full accent-blue-600"
              />
            </div>

            {/* Saturation */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">
                  Saturation
                </label>

                <span className="text-sm font-semibold text-blue-600">
                  {saturation}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(event) =>
                  setSaturation(Number(event.target.value))
                }
                className="w-full accent-blue-600"
              />
            </div>

            {/* Sharpness */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">
                  Sharpness
                </label>

                <span className="text-sm font-semibold text-blue-600">
                  {sharpness}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sharpness}
                onChange={(event) =>
                  setSharpness(Number(event.target.value))
                }
                className="w-full accent-blue-600"
              />
            </div>

            {/* Enhancement Summary */}
            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">
                Current adjustments
              </p>

              <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <div>
                  <span className="text-slate-400">Brightness</span>
                  <p className="font-semibold text-slate-900">
                    {brightness}%
                  </p>
                </div>

                <div>
                  <span className="text-slate-400">Contrast</span>
                  <p className="font-semibold text-slate-900">
                    {contrast}%
                  </p>
                </div>

                <div>
                  <span className="text-slate-400">Saturation</span>
                  <p className="font-semibold text-slate-900">
                    {saturation}%
                  </p>
                </div>

                <div>
                  <span className="text-slate-400">Sharpness</span>
                  <p className="font-semibold text-slate-900">
                    {sharpness}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhance Button */}
          <button
            type="button"
            onClick={enhanceImage}
            disabled={!file || loading}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Enhancing Image..." : "Enhance Image"}
          </button>

          {/* Result - ALWAYS VISIBLE */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <h2 className="text-lg font-semibold text-slate-900">
              Enhanced Image
            </h2>

            {!result ? (
              <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">

                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                  ✨
                </div>

                <p className="font-medium text-slate-600">
                  Your enhanced image will appear here.
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Enhance an image to see the result.
                </p>
              </div>
            ) : (
              <>
                {/* Result Preview */}
                <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
                  <img
                    src={result}
                    alt="Enhanced image preview"
                    className="mx-auto max-h-96 max-w-full object-contain"
                  />
                </div>

                {/* Result Info */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">
                      Enhancements
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      Applied
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
              Download Enhanced Image
            </button>

            {result && <ShareResult key={result} tool="enhancer" resultTitle="Enhanced Image" imageUrl={result} filename="enhanced-image.jpg" />}

          </div>
        </div>
      </div>
      <section className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">What is an Image Enhancer?</h2>
        <p className="mt-3 leading-7 text-slate-600">
          An image enhancer is a tool that improves the visual appearance of an image by applying image-processing adjustments. ToolsGift Image Enhancer applies browser-based processing to help improve image details and overall appearance.
        </p>
        <h2 className="mt-7 text-2xl font-bold text-slate-900">How to Enhance an Image</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Upload an image and start the enhancement process. ToolsGift processes the image in your browser and provides an enhanced result that you can preview and download.
        </p>
        <h2 className="mt-7 text-2xl font-bold text-slate-900">Enhance JPG, PNG and WebP Images</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Enhance common image formats for websites, documents, social media and everyday image editing. The tool creates a processed image that can be downloaded after enhancement.
        </p>
        <h2 className="mt-7 text-2xl font-bold text-slate-900">Image Enhancement in Your Browser</h2>
        <p className="mt-3 leading-7 text-slate-600">
          ToolsGift processes image enhancement directly in your web browser using standard image, canvas and pixel-processing features. The selected image is processed locally in the browser rather than being uploaded to a server by this tool.
        </p>
      </section>
    </main>
  );
}


