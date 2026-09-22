"use client";
import JSZip from "jszip";

import { DragEvent, useRef, useState } from "react";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

type ConvertedFile = {
  name: string;
  url: string;
  size: number;
  format: string;
};

export default function BatchConverter() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(85);

  const [results, setResults] = useState<ConvertedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [shareLoading, setShareLoading] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  const maxFileSize = 25 * 1024 * 1024;

  const formatName = (type: OutputFormat) => {
    if (type === "image/jpeg") return "JPG";
    if (type === "image/png") return "PNG";
    return "WebP";
  };

  const addFiles = (selectedFiles: FileList | File[]) => {
    setError("");
    setResults([]);
    clearShareState();

    const imageFiles = Array.from(selectedFiles).filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) {
      setError("Please select valid image files.");
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
      addFiles(event.target.files);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    if (event.dataTransfer.files) {
      addFiles(event.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    setFiles((previous) =>
      previous.filter((_, fileIndex) => fileIndex !== index)
    );

    setPreviews((previous) =>
      previous.filter((_, previewIndex) => previewIndex !== index)
    );

    setResults([]);
    clearShareState();
  };

  const clearAll = () => {
    setFiles([]);
    setPreviews([]);
    setResults([]);
    clearShareState();
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const convertAll = async () => {
    if (files.length === 0) return;

    setLoading(true);
    setError("");
    setResults([]);
    clearShareState();

    const converted: ConvertedFile[] = [];

    try {
      for (const file of files) {
        const imageUrl = URL.createObjectURL(file);

        const image = new Image();

        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () =>
            reject(new Error(`Could not load ${file.name}`));

          image.src = imageUrl;
        });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          URL.revokeObjectURL(imageUrl);
          throw new Error("Could not process image.");
        }

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        if (format === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
          );
        }

        ctx.drawImage(image, 0, 0);

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(
            resolve,
            format,
            format === "image/png"
              ? undefined
              : quality / 100
          );
        });

        URL.revokeObjectURL(imageUrl);

        if (!blob) {
          throw new Error(`Could not convert ${file.name}`);
        }

        const outputUrl = URL.createObjectURL(blob);

        const extension =
          format === "image/jpeg"
            ? "jpg"
            : format === "image/png"
            ? "png"
            : "webp";

        const baseName = file.name.replace(
          /\.[^/.]+$/,
          ""
        );

        converted.push({
          name: `${baseName}.${extension}`,
          url: outputUrl,
          size: blob.size,
          format: formatName(format),
        });
      }

      setResults(converted);
    } catch (conversionError) {
      setError(
        conversionError instanceof Error
          ? conversionError.message
          : "Batch conversion failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const createShareLink = async (): Promise<string> => {
    if (results.length === 0) {
      throw new Error("No converted images are available to share.");
    }
    if (shareUrl) {
      return shareUrl;
    }
    setShareLoading(true);
    setShareMessage("");
    try {
      const formData = new FormData();
      formData.append("tool", "batch-converter");
      formData.append("resultTitle", "Batch Image Converter Results");
    formData.append("filename", "toolsgift-batch-converted-images.zip");
      const shareFiles: File[] = [];
      for (const result of results) {
        const response = await fetch(result.url);
        const blob = await response.blob();
        if (blob.size > 4 * 1024 * 1024) {
          throw new Error(`${result.name} is too large to share. Maximum size is 4 MB per image.`);
        }
        shareFiles.push(new File([blob], result.name, { type: blob.type }));
      }
      const totalSize = shareFiles.reduce((total, file) => total + file.size, 0);
      if (totalSize > 20 * 1024 * 1024) {
        throw new Error("Batch is too large to share. Maximum total share size is 20 MB.");
      }
      for (const shareFile of shareFiles) {
        formData.append("images", shareFile, shareFile.name);
      }
      const shareResponse = await fetch("/api/share", {
        method: "POST",
        body: formData,
      });
      const data = await shareResponse.json();
      if (!shareResponse.ok || typeof data.shareUrl !== "string") {
        throw new Error(data.error || "Failed to create share link.");
      }
      setShareUrl(data.shareUrl);
      setShareMessage("Share link generated.");
      return data.shareUrl;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create share link.";
      setShareMessage(message);
      throw error;
    } finally {
      setShareLoading(false);
    }
  };
  const copyShareLink = async () => {
    try {
      const url = await createShareLink();
      await navigator.clipboard.writeText(url);
      setShareMessage("Share link copied.");
    } catch {
      // Error message is already handled by createShareLink.
    }
  };
  const shareResult = async () => {
    try {
      const url = await createShareLink();
      if (navigator.share) {
        await navigator.share({
          title: "ToolsGift - Batch Image Converter",
          text: "View my converted images on ToolsGift",
          url,
        });
        setShareMessage("Share link ready.");
      } else {
        await navigator.clipboard.writeText(url);
        setShareMessage("Share link copied.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      if (!(error instanceof Error && error.message)) {
        setShareMessage("Unable to share this result.");
      }
    }
  };
  const clearShareState = () => {
    setShareUrl("");
    setShareMessage("");
  };  const downloadSingle = (result: ConvertedFile) => {
    const link = document.createElement("a");

    link.href = result.url;
    link.download = result.name;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = async () => {
    if (results.length === 0) return;

    const zip = new JSZip();

    for (const result of results) {
      const response = await fetch(result.url);
      const blob = await response.blob();
      zip.file(result.name, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "toolsgift-batch-converted-images.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Image Tools
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Batch Image Converter
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Convert multiple images to JPG, PNG, or WebP in one go.
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
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
              🖼️
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              Upload Multiple Images
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Drag & drop multiple images here or choose files
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Choose Images
            </button>

            <p className="mt-4 text-xs text-slate-400">
              JPG, PNG and WebP • Max 25 MB per file
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
                      {files[index]?.name}
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
              Conversion Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose the output format for all selected images.
            </p>

            {/* Format */}
            <div className="mt-5">
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Output Format
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
            onClick={convertAll}
            disabled={files.length === 0 || loading}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Converting Images..."
              : `Convert ${files.length > 0 ? files.length : ""} Images to ${formatName(format)}`}
          </button>

          {/* Result - ALWAYS VISIBLE */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Converted Images
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {results.length > 0
                    ? `${results.length} converted image${
                        results.length > 1 ? "s" : ""
                      }`
                    : "Your converted images will appear here."}
                </p>
              </div>

              <button
                type="button"
                onClick={downloadAll}
                disabled={results.length === 0}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download All
              </button>

            </div>

            {!results.length ? (
              <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">

                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                  📥
                </div>

                <p className="font-medium text-slate-600">
                  No converted images yet.
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Convert your images to see the results.
                </p>

              </div>
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                {results.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <div className="flex h-48 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="mt-3">
                      <p className="truncate font-semibold text-slate-900">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.format} •{" "}
                        {(item.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => downloadSingle(item)}
                      className="mt-3 w-full rounded-lg border border-blue-200 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                      Download
                    </button>
                  </div>
                ))}

              </div>
            )}

            {/* Download All - ALWAYS VISIBLE */}
            <button
              type="button"
              onClick={() => {
                results.forEach((result, index) => {
                  setTimeout(() => downloadSingle(result), index * 250);
                });
              }}
              disabled={results.length === 0}
              className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Download All Images
            </button>

            <button
              type="button"
              onClick={downloadAll}
              disabled={results.length === 0}
              className="mt-3 w-full rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Download ZIP
            </button>


              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={createShareLink}
                  disabled={results.length === 0 || shareLoading}
                  className="w-full rounded-xl border border-blue-200 bg-white px-5 py-3.5 font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {shareLoading ? "Generating..." : "Generate Link"}
                </button>

                <button
                  type="button"
                  onClick={shareResult}
                  disabled={results.length === 0 || shareLoading}
                  className="w-full rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Share
                </button>
              </div>

              {shareUrl && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Share Link
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none"
                      aria-label="Share link"
                    />
                    <button
                      type="button"
                      onClick={copyShareLink}
                      disabled={shareLoading}
                      className="rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              )}

              {shareMessage && (
                <p className="mt-3 text-center text-sm text-slate-500">
                  {shareMessage}
                </p>
              )}
          </div>
        </div>
      </div>
      <section className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">What is a Batch Image Converter?</h2>
        <p className="mt-3 leading-7 text-slate-600">
          A batch image converter lets you convert multiple images in one process instead of converting each file individually. ToolsGift Batch Image Converter is designed to make multi-image conversion quick and convenient.
        </p>
        <h2 className="mt-7 text-2xl font-bold text-slate-900">How to Convert Multiple Images</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Upload multiple images, choose the output format, and start the conversion. The converted images are displayed as individual results, and you can download them separately or download all images together.
        </p>
        <h2 className="mt-7 text-2xl font-bold text-slate-900">Convert Multiple JPG, PNG and WebP Images</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Convert multiple images between supported formats such as JPG, PNG and WebP. Batch conversion can save time when you need to process several images for websites, documents, social media or other projects.
        </p>
        <h2 className="mt-7 text-2xl font-bold text-slate-900">Batch Image Conversion in Your Browser</h2>
        <p className="mt-3 leading-7 text-slate-600">
          ToolsGift processes batch image conversion directly in your web browser using standard image and canvas features. The conversion is performed locally in the browser rather than uploading your images to a server by this tool.
        </p>
      </section>
    </main>
  );
}











