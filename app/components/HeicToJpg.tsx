"use client";
import { useRef, useState } from "react";
import ShareResult from "./ShareResult";
type ConvertedFile = {
  blob: Blob;
  name: string;
  preview: string;
};
export default function HeicToJpg() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConvertedFile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };
  const selectFile = (selectedFile: File) => {
    setError("");
    setResult(null);
    const isHeic =
      selectedFile.type === "image/heic" ||
      selectedFile.type === "image/heif" ||
      /\.(heic|heif)$/i.test(selectedFile.name);
    if (!isHeic) {
      setError("Please select a HEIC or HEIF image.");
      return;
    }
    if (selectedFile.size > 25 * 1024 * 1024) {
      setError("Maximum file size is 25 MB.");
      return;
    }
    setFile(selectedFile);
  };
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    selectFile(selectedFile);
    event.target.value = "";
  };
  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (!droppedFile) return;
    selectFile(droppedFile);
  };
  const convertToJpg = async () => {
    if (!file) {
      setError("Please upload a HEIC image first.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { default: heic2any } = await import("heic2any");

      const converted = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.92,
      });
      const convertedBlob = Array.isArray(converted)
        ? converted[0]
        : converted;
      if (!(convertedBlob instanceof Blob)) {
        throw new Error("Conversion failed.");
      }
      const originalName = file.name.replace(
        /\.(heic|heif)$/i,
        ""
      );
      const jpgName = `${originalName}.jpg`;
      const preview = URL.createObjectURL(convertedBlob);
      if (result) {
        URL.revokeObjectURL(result.preview);
      }
      setResult({
        blob: convertedBlob,
        name: jpgName,
        preview,
      });
    } catch (conversionError) {
      console.error(conversionError);
      setError(
        "HEIC conversion failed. Please try another HEIC image."
      );
    } finally {
      setLoading(false);
    }
  };
  const downloadResult = () => {
    if (!result) return;

    const downloadUrl = URL.createObjectURL(result.blob);
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = result.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(downloadUrl);
  };
  const removeFile = () => {
    if (result) {
      URL.revokeObjectURL(result.preview);
    }
    setFile(null);
    setResult(null);
    setError("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <section className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-blue-600">
            IMAGE CONVERTER
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            HEIC to JPG Converter
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            Convert HEIC and HEIF photos to JPG online with
            fast browser-based processing.
          </p>
        </section>
        <section className="rounded-3xl bg-white p-5 shadow-sm md:p-8">
          <div
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDrop={handleDrop}
            onClick={() => {
              inputRef.current?.click();
            }}
            className="flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-slate-50 px-6 text-center transition hover:border-blue-400 hover:bg-blue-50"
          >
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
              📷
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {file ? "HEIC Image Selected" : "Upload a HEIC image"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              HEIC or HEIF format
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Maximum 25 MB
            </p>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                inputRef.current?.click();
              }}
              className="mt-6 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {file ? "Choose Another Image" : "Choose HEIC File"}
            </button>
            <p className="mt-4 text-sm text-slate-400">
              or drag and drop your HEIC image here
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".heic,.heif,image/heic,image/heif"
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
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">
                  Selected File
                </p>
                <h2 className="mt-1 break-all font-semibold text-slate-900">
                  {file.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {formatSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="shrink-0 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
              >
                Remove
              </button>
            </div>
            <button
              type="button"
              onClick={convertToJpg}
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Converting...
                </>
              ) : (
                <>
                  <span>⚡</span>
                  Convert to JPG
                </>
              )}
            </button>
          </section>
        )}
        {result && (
          <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Conversion Result
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="mb-3 font-semibold text-slate-800">
                  Original HEIC
                </h3>
                <div className="flex min-h-[220px] items-center justify-center rounded-xl bg-slate-100 p-5 text-center">
                  <div>
                    <div className="text-5xl">📷</div>
                    <p className="mt-3 break-all text-sm font-medium text-slate-700">
                      {file?.name}
                    </p>
                  </div>
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
                  JPG Result
                </h3>
                <div className="flex min-h-[220px] items-center justify-center overflow-hidden rounded-xl bg-white p-3">
                  <img
                    src={result.preview}
                    alt="Converted JPG preview"
                    className="max-h-[350px] max-w-full object-contain"
                  />
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  Size:{" "}
                  <strong>
                    {formatSize(result.blob.size)}
                  </strong>
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={downloadResult}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 px-6 py-4 font-bold text-white transition hover:bg-green-700"
              >
                <span>⬇</span>
                Download JPG
              </button>

              <ShareResult key={result.preview} tool="heic-to-jpg" resultTitle="Converted JPG Image" imageUrl={result.preview} filename={result.name} />

              <button
                type="button"
                onClick={removeFile}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-4 font-bold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Clear & Reset
              </button>
            </div>
          </section>
        )}
        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">
              Convert HEIC to JPG Online
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              The ToolsGift HEIC to JPG converter helps convert
              HEIC and HEIF photos into widely supported JPG
              images. This can be useful when a website,
              application or device does not accept HEIC files.
            </p>
            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              How to Convert HEIC to JPG
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Upload a HEIC or HEIF image, select Convert to
              JPG, wait for the browser-based conversion to
              finish, and download the resulting JPG file.
            </p>
            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              Free Browser-Based HEIC Conversion
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Conversion is performed directly in your browser
              using the HEIC conversion library. No paid image
              conversion API is required for this tool.
            </p>
            <h2 className="mt-8 text-2xl font-bold text-slate-900">
              Common Uses
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Convert HEIC photos when you need JPG compatibility
              for websites, forms, document workflows, image
              editing software or sharing platforms.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
