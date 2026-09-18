"use client";

import { DragEvent, useRef, useState } from "react";

type OutputFormat = "png" | "jpeg";

export default function WordToImage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [html, setHtml] = useState("");
  const [format, setFormat] = useState<OutputFormat>("png");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);

  const MAX_FILE_SIZE = 25 * 1024 * 1024;

  // Fixed 2X output quality
  const SCALE = 2;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFile = async (selectedFile: File) => {
    setError("");
    setResultUrl("");
    setResultSize(0);

    const extension = selectedFile.name
      .toLowerCase()
      .split(".")
      .pop();

    if (extension !== "docx") {
      setError("Please select a .docx Word document.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Maximum file size is 25 MB.");
      return;
    }

    try {
      const mammoth = await import("mammoth");

      const arrayBuffer = await selectedFile.arrayBuffer();

      const result = await mammoth.convertToHtml({
        arrayBuffer,
      });

      setFile(selectedFile);
      setHtml(result.value);
    } catch (err) {
      console.error(err);
      setError("Unable to read this Word document.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const resetTool = () => {
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setFile(null);
    setHtml("");
    setResultUrl("");
    setResultSize(0);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const convertToImage = async () => {
    if (!file || !html || !previewRef.current) {
      return;
    }

    setIsConverting(true);
    setError("");

    try {
      const { toPng, toJpeg } = await import("html-to-image");

      // Allow the browser to finish rendering the document.
      await new Promise((resolve) => setTimeout(resolve, 300));

      const node = previewRef.current;

      let dataUrl: string;

      if (format === "png") {
        dataUrl = await toPng(node, {
          pixelRatio: SCALE,
          backgroundColor: "#ffffff",
          cacheBust: true,
          skipFonts: false,
        });
      } else {
        dataUrl = await toJpeg(node, {
          pixelRatio: SCALE,
          backgroundColor: "#ffffff",
          quality: 0.95,
          cacheBust: true,
          skipFonts: false,
        });
      }

      const response = await fetch(dataUrl);

      const outputBlob = await response.blob();

      if (!outputBlob.size) {
        throw new Error("Generated image is empty.");
      }

      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }

      const url = URL.createObjectURL(outputBlob);

      setResultUrl(url);
      setResultSize(outputBlob.size);
    } catch (err) {
      console.error(err);

      setError(
        "Conversion failed. Please try another .docx document."
      );
    } finally {
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (!resultUrl) {
      return;
    }

    const extension = format === "png" ? "png" : "jpg";

    const link = document.createElement("a");

    link.href = resultUrl;
    link.download = `imgswift-word-to-image.${extension}`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
          Document Tool
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Word to Image
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Convert Word documents into high-quality images
          directly in your browser.
        </p>
      </div>

      {/* Settings */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-slate-900">
          Conversion Settings
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Image Format */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Image Format
            </label>

            <select
              value={format}
              onChange={(e) => {
                setFormat(
                  e.target.value as OutputFormat
                );

                if (resultUrl) {
                  URL.revokeObjectURL(resultUrl);
                }

                setResultUrl("");
                setResultSize(0);
              }}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="png">
                PNG — Lossless Quality
              </option>

              <option value="jpeg">
                JPG — High Quality
              </option>
            </select>
          </div>

          {/* Quality */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Output Quality
            </label>

            <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">
                  High Quality
                </span>

                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                  2X
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-600">
                Generates a sharper, higher-resolution image.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center transition hover:border-blue-400 hover:bg-blue-50/30"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
          📄
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          {file
            ? "Word document selected"
            : "Upload Word Document"}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Drag & drop your .docx file here or click to browse
        </p>

        <p className="mt-2 text-xs text-slate-400">
          Maximum file size: 25 MB
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Selected File */}
      {file && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900">
                {file.name}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {formatSize(file.size)}
              </p>
            </div>

            <button
              type="button"
              onClick={resetTool}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Document Preview */}
      <div className="mt-6">
        <div
          ref={previewRef}
          className="mx-auto w-full max-w-[794px] bg-white p-[60px] text-slate-900 shadow-sm"
          style={{
            fontFamily:
              "Arial, Helvetica, sans-serif",
            fontSize: "16px",
            lineHeight: 1.6,
            minHeight: "400px",
          }}
        >
          {html ? (
            <div
              dangerouslySetInnerHTML={{
                __html: `
                  <style>
                    * {
                      box-sizing: border-box;
                    }

                    h1 {
                      font-size: 32px;
                      font-weight: 700;
                      margin-top: 20px;
                      margin-bottom: 16px;
                    }

                    h2 {
                      font-size: 26px;
                      font-weight: 700;
                      margin-top: 20px;
                      margin-bottom: 14px;
                    }

                    h3 {
                      font-size: 22px;
                      font-weight: 700;
                      margin-top: 18px;
                      margin-bottom: 12px;
                    }

                    h4, h5, h6 {
                      font-weight: 700;
                      margin-top: 16px;
                      margin-bottom: 10px;
                    }

                    p {
                      margin: 0 0 12px;
                    }

                    ul,
                    ol {
                      margin-top: 8px;
                      margin-bottom: 12px;
                      padding-left: 30px;
                    }

                    li {
                      margin-bottom: 5px;
                    }

                    table {
                      width: 100%;
                      border-collapse: collapse;
                      margin: 18px 0;
                    }

                    td,
                    th {
                      border: 1px solid #cbd5e1;
                      padding: 9px;
                      text-align: left;
                      vertical-align: top;
                    }

                    th {
                      font-weight: 700;
                      background: #f8fafc;
                    }

                    img {
                      max-width: 100%;
                      height: auto;
                    }

                    blockquote {
                      margin: 16px 0;
                      padding-left: 16px;
                      border-left: 4px solid #cbd5e1;
                    }

                    strong,
                    b {
                      font-weight: 700;
                    }

                    em,
                    i {
                      font-style: italic;
                    }

                    a {
                      color: #2563eb;
                      text-decoration: underline;
                    }
                  </style>

                  ${html}
                `,
              }}
            />
          ) : (
            <div className="flex min-h-[280px] items-center justify-center text-center text-slate-400">
              <div>
                <div className="mb-3 text-4xl">
                  📄
                </div>

                <p className="font-medium">
                  Word document preview
                </p>

                <p className="mt-1 text-sm">
                  Upload a .docx file to preview it here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Convert Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={convertToImage}
          disabled={
            !file ||
            !html ||
            isConverting
          }
          className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isConverting
            ? "Converting..."
            : "Convert to Image"}
        </button>
      </div>

      {/* Result */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Result
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your converted Word document image will appear
            here.
          </p>
        </div>

        {resultUrl ? (
          <div>
            <div className="overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
              <img
                src={resultUrl}
                alt="Converted Word document"
                className="mx-auto max-h-[700px] w-auto rounded-lg bg-white shadow-sm"
              />
            </div>

            <div className="mt-4 text-center text-sm text-slate-500">
              Output size: {formatSize(resultSize)} ·{" "}
              {format.toUpperCase()} · 2X Quality
            </div>
          </div>
        ) : (
          <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
            <div className="text-center">
              <div className="mb-3 text-4xl">
                🖼️
              </div>

              <p className="font-medium text-slate-600">
                No result yet
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Upload a Word document and convert it.
              </p>
            </div>
          </div>
        )}

        {/* Download Always Visible */}
        <button
          type="button"
          onClick={downloadImage}
          disabled={!resultUrl}
          className="mt-5 w-full rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Download{" "}
          {format === "png" ? "PNG" : "JPG"} Image
        </button>
      </div>
    </div>
  );
}