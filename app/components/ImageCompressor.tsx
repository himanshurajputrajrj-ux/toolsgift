"use client";

import { useRef, useState } from "react";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

export default function ImageCompressor() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [quality, setQuality] = useState(75);
  const [format, setFormat] =
    useState<OutputFormat>("image/jpeg");

  const [result, setResult] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [shareLoading, setShareLoading] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const selectImage = (selectedFile: File) => {
    setError("");

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (selectedFile.size > 25 * 1024 * 1024) {
      setError("Maximum file size is 25 MB.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (result) {
      URL.revokeObjectURL(result);
    }

    const previewUrl = URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setPreview(previewUrl);
    setResult("");
    setResultSize(0);
    setShareUrl("");
    setShareMessage("");
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    selectImage(selectedFile);

    event.target.value = "";
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files?.[0];

    if (!droppedFile) return;

    selectImage(droppedFile);
  };

  const compressImage = async () => {
    if (!file || !preview) {
      setError("Please upload an image first.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const image = new Image();

      image.src = preview;

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () =>
          reject(new Error("Image could not be loaded."));
      });

      const canvas = document.createElement("canvas");

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas is not supported.");
      }

      // PNG transparency needs no background.
      // JPEG needs a background because it doesn't support transparency.
      if (format === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(
          0,
          0,
          canvas.width,
          canvas.height
        );
      }

      context.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const blob = await new Promise<Blob | null>(
        (resolve) => {
          canvas.toBlob(
            (generatedBlob) => {
              resolve(generatedBlob);
            },
            format,
            format === "image/png"
              ? undefined
              : quality / 100
          );
        }
      );

      if (!blob) {
        throw new Error("Compression failed.");
      }

      if (result) {
        URL.revokeObjectURL(result);
      }

      const resultUrl = URL.createObjectURL(blob);

      setResult(resultUrl);
      setResultSize(blob.size);
      setShareUrl("");
      setShareMessage("");
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while compressing the image."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = () => {
    if (!result || !file) return;

    const originalName = file.name.replace(
      /\.[^/.]+$/,
      ""
    );

    let extension = "jpg";

    if (format === "image/png") {
      extension = "png";
    }

    if (format === "image/webp") {
      extension = "webp";
    }

    const link = document.createElement("a");

    link.href = result;
    link.download = `compressed-${originalName}.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const createShareLink = async (): Promise<string> => {
    if (!result || !file) throw new Error("No compressed image is available to share.");
    if (shareUrl) return shareUrl;

    setShareLoading(true);
    setShareMessage("");

    try {
      const blob = await fetch(result).then((response) => response.blob());
      if (blob.size > 4 * 1024 * 1024) {
        throw new Error("Image is too large to share. Maximum size is 4 MB.");
      }

      const extension = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
      const formData = new FormData();
      formData.append("tool", "compressor");
      formData.append("resultTitle", "Compressed Image");
      formData.append("filename", `compressed-${file.name.replace(/\.[^/.]+$/, "")}.${extension}`);
      formData.append("image", new File([blob], `compressed-image.${extension}`, { type: blob.type }));

      const response = await fetch("/api/share", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok || typeof data.shareUrl !== "string") {
        throw new Error(data.error || "Failed to create share link.");
      }

      setShareUrl(data.shareUrl);
      setShareMessage("Share link generated.");
      return data.shareUrl;
    } catch (error) {
      setShareMessage(error instanceof Error ? error.message : "Failed to create share link.");
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
    } catch {}
  };

  const shareResult = async () => {
    try {
      const url = await createShareLink();
      if (navigator.share) {
        await navigator.share({ title: "Compressed Image", text: "Check out this compressed image from ToolsGift.", url });
        setShareMessage("Share link ready.");
      } else {
        await navigator.clipboard.writeText(url);
        setShareMessage("Share link copied.");
      }
    } catch {
      setShareMessage("Unable to share this result.");
    }
  };

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (result) {
      URL.revokeObjectURL(result);
    }

    setFile(null);
    setPreview("");
    setResult("");
    setResultSize(0);
    setError("");
    setShareUrl("");
    setShareMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const savedPercentage =
    file && resultSize > 0
      ? Math.max(
          0,
          Math.round(
            ((file.size - resultSize) / file.size) * 100
          )
        )
      : 0;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">

        {/* Heading */}

        <section className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">
            IMAGE COMPRESSOR
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Compress Image
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            Reduce image file size while maintaining excellent
            visual quality.
          </p>
        </section>

        {/* Upload */}

        <section className="rounded-3xl bg-white p-5 shadow-sm md:p-8">

          <div
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDrop={handleDrop}
            onClick={() => {
              fileInputRef.current?.click();
            }}
            className="flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-slate-50 px-6 text-center transition hover:border-blue-400 hover:bg-blue-50"
          >
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
              🖼️
            </div>

            <h2 className="text-2xl font-semibold text-slate-900">
              {file ? "Image Selected" : "Upload an image"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              JPG, PNG, WebP, GIF, BMP
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Maximum 25 MB
            </p>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="mt-6 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {file ? "Choose Another Image" : "Choose File"}
            </button>

            <p className="mt-4 text-sm text-slate-400">
              or drag and drop your image here
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

        </section>

        {/* Preview */}

        {file && (
          <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm md:p-8">

            <div className="mb-5 flex items-center justify-between gap-3">

              <div>
                <p className="text-sm text-slate-500">
                  Selected Image
                </p>

                <h2 className="mt-1 break-all font-semibold text-slate-900">
                  {file.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={removeImage}
                className="shrink-0 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
              >
                Remove
              </button>

            </div>

            <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-slate-100 p-4">
              <img
                src={preview}
                alt="Uploaded image preview"
                className="max-h-[450px] max-w-full object-contain"
              />
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              Original size:{" "}
              <strong>{formatSize(file.size)}</strong>
            </div>

          </section>
        )}

        {/* Compression Settings */}

        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm md:p-8">

          <h2 className="text-xl font-bold text-slate-900">
            Compression Settings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose the output format and compression quality.
          </p>

          {/* Format */}

          <div className="mt-6">

            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Output Format
            </label>

            <div className="grid grid-cols-3 gap-3">

              <button
                type="button"
                onClick={() => setFormat("image/jpeg")}
                className={`rounded-xl border px-3 py-3 font-semibold transition ${
                  format === "image/jpeg"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                }`}
              >
                JPEG
              </button>

              <button
                type="button"
                onClick={() => setFormat("image/png")}
                className={`rounded-xl border px-3 py-3 font-semibold transition ${
                  format === "image/png"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                }`}
              >
                PNG
              </button>

              <button
                type="button"
                onClick={() => setFormat("image/webp")}
                className={`rounded-xl border px-3 py-3 font-semibold transition ${
                  format === "image/webp"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                }`}
              >
                WebP
              </button>

            </div>

          </div>

          {/* Quality */}

          <div className="mt-7">

            <div className="mb-3 flex items-center justify-between">

              <label className="text-sm font-semibold text-slate-700">
                Quality
              </label>

              <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600">
                {quality}%
              </span>

            </div>

            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(event) => {
                setQuality(Number(event.target.value));
              }}
              className="w-full accent-blue-600"
            />

            <div className="mt-2 flex justify-between text-xs text-slate-400">
              <span>Smaller file</span>
              <span>Better quality</span>
            </div>

            {format === "image/png" && (
              <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                PNG is lossless, so the quality slider does not
                change PNG compression.
              </p>
            )}

          </div>

          {/* Compress */}

          <button
            type="button"
            onClick={compressImage}
            disabled={!file || loading}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Compressing...
              </>
            ) : (
              <>
                <span>⚡</span>
                Compress Image
              </>
            )}
          </button>

        </section>

        {/* Result */}

        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm md:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Compression Result
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your compressed image will appear here.
            </p>
          </div>

          {!result ? (
            <div className="flex min-h-[180px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-center">
              <div>
                <div className="text-3xl opacity-40">
                  📦
                </div>

                <p className="mt-3 text-sm font-medium text-slate-400">
                  No compressed result yet
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 p-4">

                  <h3 className="mb-3 font-semibold text-slate-800">
                    Original
                  </h3>

                  <div className="flex min-h-[230px] items-center justify-center overflow-hidden rounded-xl bg-slate-100 p-3">

                    <img
                      src={preview}
                      alt="Original image"
                      className="max-h-[350px] max-w-full object-contain"
                    />

                  </div>

                  <p className="mt-4 text-sm text-slate-600">
                    Size:{" "}
                    <strong>
                      {file ? formatSize(file.size) : "-"}
                    </strong>
                  </p>

                </div>

                <div className="rounded-2xl border border-green-200 bg-green-50/40 p-4">

                  <h3 className="mb-3 font-semibold text-green-800">
                    Compressed
                  </h3>

                  <div className="flex min-h-[230px] items-center justify-center overflow-hidden rounded-xl bg-white p-3">

                    <img
                      src={result}
                      alt="Compressed result"
                      className="max-h-[350px] max-w-full object-contain"
                    />

                  </div>

                  <p className="mt-4 text-sm text-slate-600">
                    Size:{" "}
                    <strong>
                      {formatSize(resultSize)}
                    </strong>
                  </p>

                </div>

              </div>

              <div className="mt-5 rounded-2xl bg-green-50 p-5 text-center">

                <p className="text-sm text-green-700">
                  File size reduced by
                </p>

                <p className="mt-1 text-3xl font-bold text-green-700">
                  {savedPercentage}%
                </p>

              </div>
            </>
          )}

          {/* Download */}

          <button
            type="button"
            onClick={downloadResult}
            disabled={!result}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 px-6 py-4 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            <span>⬇</span>
            Download Compressed Image
          </button>

          {result && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={createShareLink} disabled={shareLoading} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                  {shareLoading ? "Generating..." : "Generate Link"}
                </button>
                <button type="button" onClick={shareResult} disabled={shareLoading} className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60">
                  Share
                </button>
              </div>
              {shareUrl && (
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input type="text" value={shareUrl} readOnly aria-label="Share link" className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none" />
                  <button type="button" onClick={copyShareLink} disabled={shareLoading} className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60">Copy Link</button>
                </div>
              )}
              {shareMessage && <p className="mt-3 text-sm text-slate-600">{shareMessage}</p>}
            </div>
          )}

        </section>
        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">
              What is an Image Compressor?
            </h2>
            <p className="mt-3 text-slate-600 leading-7">
              An image compressor reduces the file size of an image while aiming to preserve good visual quality. It can help make JPG, PNG and WebP images easier to store, share and upload.
            </p>
            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              How to Compress an Image
            </h2>
            <p className="mt-3 text-slate-600 leading-7">
              Upload an image, choose the output format and adjust the quality level. A lower quality setting can produce a smaller file, while a higher setting generally keeps more visual detail. When you are satisfied with the result, download the compressed image.
            </p>
            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              Supported Image Formats
            </h2>
            <p className="mt-3 text-slate-600 leading-7">
              ToolsGift supports common image formats including JPG, PNG, WebP, GIF and BMP for image compression.
            </p>
            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              Image Compression in Your Browser
            </h2>
            <p className="mt-3 text-slate-600 leading-7">
              Image compression is performed directly in your browser using the image and canvas processing capabilities available on your device.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

