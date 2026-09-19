"use client";
import { useRef, useState } from "react";
type OutputFormat = "image/jpeg" | "image/webp";
type CompressionResult = {
  blob: Blob;
  width: number;
  height: number;
  quality: number;
};
export default function CompressImageToKB() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [targetKB, setTargetKB] = useState(100);
  const [customKB, setCustomKB] = useState("");
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [result, setResult] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [resultWidth, setResultWidth] = useState(0);
  const [resultHeight, setResultHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };
  const revokeUrls = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result) URL.revokeObjectURL(result);
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
    if (preview) URL.revokeObjectURL(preview);
    if (result) URL.revokeObjectURL(result);
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult("");
    setResultSize(0);
    setResultWidth(0);
    setResultHeight(0);
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
  const getTargetBytes = () => {
    if (targetKB === 0) {
      const value = Number(customKB);
      if (!Number.isFinite(value) || value < 5) {
        return null;
      }
      return Math.round(value * 1024);
    }
    return targetKB * 1024;
  };
  const loadImage = (imageFile: File) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      const objectUrl = URL.createObjectURL(imageFile);
      image.onload = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(image);
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Image could not be loaded."));
      };
      image.src = objectUrl;
    });
  const canvasToBlob = (
    canvas: HTMLCanvasElement,
    quality: number
  ) =>
    new Promise<Blob | null>((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob),
        format,
        quality
      );
    });
  const compressToTarget = async (
    image: HTMLImageElement,
    targetBytes: number
  ): Promise<CompressionResult> => {
    let width = image.naturalWidth;
    let height = image.naturalHeight;
    const maxDimension = 4096;
    if (Math.max(width, height) > maxDimension) {
      const scale = maxDimension / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }
    let bestBlob: Blob | null = null;
    let bestQuality = 0;
    for (let dimensionPass = 0; dimensionPass < 8; dimensionPass++) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas is not supported.");
      }
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(
        image,
        0,
        0,
        width,
        height
      );
      let low = 0.1;
      let high = 1;
      let passBest: Blob | null = null;
      let passQuality = 0.1;
      for (let qualityPass = 0; qualityPass < 9; qualityPass++) {
        const quality = (low + high) / 2;
        const blob = await canvasToBlob(canvas, quality);
        if (!blob) {
          throw new Error("Compression failed.");
        }
        if (blob.size <= targetBytes) {
          passBest = blob;
          passQuality = quality;
          low = quality;
        } else {
          high = quality;
        }
      }
      const minimumBlob = await canvasToBlob(canvas, 0.1);
      if (passBest) {
        bestBlob = passBest;
        bestQuality = passQuality;
        break;
      }
      if (minimumBlob && minimumBlob.size <= targetBytes) {
        bestBlob = minimumBlob;
        bestQuality = 0.1;
        break;
      }
      if (minimumBlob) {
        bestBlob = minimumBlob;
        bestQuality = 0.1;
      }
      width = Math.max(
        320,
        Math.round(width * 0.82)
      );
      height = Math.max(
        320,
        Math.round(height * 0.82)
      );
    }
    if (!bestBlob) {
      throw new Error(
        "The image could not be compressed."
      );
    }
    return {
      blob: bestBlob,
      width,
      height,
      quality: bestQuality,
    };
  };
  const compressImage = async () => {
    if (!file) {
      setError("Please upload an image first.");
      return;
    }
    const targetBytes = getTargetBytes();
    if (!targetBytes) {
      setError("Please enter a valid custom size of at least 5 KB.");
      return;
    }
    if (targetBytes >= file.size) {
      setError(
        "The target size must be smaller than the original image."
      );
      return;
    }
    setError("");
    setLoading(true);
    try {
      const image = await loadImage(file);
      const compression = await compressToTarget(
        image,
        targetBytes
      );
      if (result) {
        URL.revokeObjectURL(result);
      }
      const resultUrl = URL.createObjectURL(
        compression.blob
      );
      setResult(resultUrl);
      setResultSize(compression.blob.size);
      setResultWidth(compression.width);
      setResultHeight(compression.height);
      if (compression.blob.size > targetBytes) {
        setError(
          "The smallest practical result is still above the selected target. Try a larger target size."
        );
      }
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
    const extension =
      format === "image/webp" ? "webp" : "jpg";
    const link = document.createElement("a");
    link.href = result;
    link.download = `${originalName}-${targetKB || customKB}kb.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const removeImage = () => {
    revokeUrls();
    setFile(null);
    setPreview("");
    setResult("");
    setResultSize(0);
    setResultWidth(0);
    setResultHeight(0);
    setError("");
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
        <section className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">
            IMAGE SIZE TOOL
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Compress Image to KB
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            Compress JPG, PNG and WebP images to a target file
            size such as 20 KB, 50 KB, 100 KB or 200 KB.
          </p>
        </section>
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
        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm md:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Target File Size
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose the maximum file size you need.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[20, 50, 100, 200].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setTargetKB(size)}
                className={`rounded-xl border px-4 py-3 font-semibold transition ${
                  targetKB === size
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                }`}
              >
                {size} KB
              </button>
            ))}
            <button
              type="button"
              onClick={() => setTargetKB(0)}
              className={`rounded-xl border px-4 py-3 font-semibold transition sm:col-span-4 ${
                targetKB === 0
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
              }`}
            >
              Custom Size
            </button>
          </div>
          {targetKB === 0 && (
            <div className="mt-4">
              <label
                htmlFor="custom-kb"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Custom target size in KB
              </label>
              <input
                id="custom-kb"
                type="number"
                min="5"
                value={customKB}
                onChange={(event) =>
                  setCustomKB(event.target.value)
                }
                placeholder="Example: 75"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          )}
          <div className="mt-7">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Output Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat("image/jpeg")}
                className={`rounded-xl border px-4 py-3 font-semibold transition ${
                  format === "image/jpeg"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                }`}
              >
                JPG
              </button>
              <button
                type="button"
                onClick={() => setFormat("image/webp")}
                className={`rounded-xl border px-4 py-3 font-semibold transition ${
                  format === "image/webp"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                }`}
              >
                WebP
              </button>
            </div>
          </div>
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
                Compress to {targetKB === 0 ? customKB || "Custom" : targetKB} KB
              </>
            )}
          </button>
        </section>
        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Compression Result
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your target-size image will appear here.
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
                      {formatSize(file?.size || 0)}
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
                      alt="Compressed image result"
                      className="max-h-[350px] max-w-full object-contain"
                    />
                  </div>
                  <p className="mt-4 text-sm text-slate-600">
                    Size:{" "}
                    <strong>{formatSize(resultSize)}</strong>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {resultWidth} × {resultHeight}px
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
              <button
                type="button"
                onClick={downloadResult}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 px-6 py-4 font-bold text-white transition hover:bg-green-700"
              >
                <span>⬇</span>
                Download Compressed Image
              </button>
            </>
          )}
        </section>
        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">
              Compress Image to 20KB, 50KB, 100KB or 200KB
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              The ToolsGift Compress Image to KB tool helps reduce an image
              toward a specific file-size limit. Choose a preset such as
              20 KB, 50 KB, 100 KB or 200 KB, or enter your own target size.
            </p>
            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              How to Compress an Image to a Specific Size
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Upload your image, select the target size, choose JPG or WebP,
              and start compression. The tool adjusts image quality and, when
              necessary, dimensions to work toward the selected file-size
              target.
            </p>
            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              Free Image Compression in Your Browser
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Processing is performed directly in your browser using the
              Canvas API. Your selected image does not need to be uploaded to
              a paid image-processing service.
            </p>
            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              Common Uses
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Target-size image compression can be useful when an application,
              website, form, email or document workflow has a maximum image
              file-size requirement.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}