"use client";

import { useEffect, useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";

type BackgroundType =
  | "transparent"
  | "white"
  | "black"
  | "gray"
  | "blue"
  | "green"
  | "navy"
  | "purple"
  | "burgundy"
  | "teal"
  | "beige"
  | "darkgray"
  | "custom";

export default function BackgroundRemover() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  const [background, setBackground] =
    useState<BackgroundType>("transparent");

  const [customColor, setCustomColor] =
    useState("#2563eb");

  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (originalUrl) {
        URL.revokeObjectURL(originalUrl);
      }

      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
      }
    };
  }, [originalUrl, resultUrl]);

  /* =========================
     FILE SELECTION
  ========================= */

  const selectFile = (selectedFile?: File) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setError("");
    setFile(selectedFile);

    if (originalUrl) {
      URL.revokeObjectURL(originalUrl);
    }

    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setOriginalUrl(
      URL.createObjectURL(selectedFile)
    );

    setResultUrl("");
    setProgress(0);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    selectFile(event.target.files?.[0]);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    selectFile(
      event.dataTransfer.files?.[0]
    );
  };

  /* =========================
     APPLY BACKGROUND
  ========================= */

  const makeBackgroundImage = async (
    blob: Blob,
    type: BackgroundType
  ) => {
    /*
      Transparent result
    */

    if (type === "transparent") {
      return URL.createObjectURL(blob);
    }

    const transparentUrl =
      URL.createObjectURL(blob);

    try {
      const image = new Image();

      await new Promise<void>(
        (resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = reject;
          image.src = transparentUrl;
        }
      );

      const canvas =
        document.createElement("canvas");

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const ctx =
        canvas.getContext("2d");

      if (!ctx) {
        throw new Error(
          "Canvas is not supported."
        );
      }

      /*
        Default
      */

      let color = "#ffffff";

      /*
        Professional Colors
      */

      if (type === "white") {
        color = "#ffffff";
      }

      if (type === "black") {
        color = "#000000";
      }

      if (type === "gray") {
        color = "#e5e7eb";
      }

      if (type === "blue") {
        color = "#2563eb";
      }

      if (type === "green") {
        color = "#22c55e";
      }

      if (type === "navy") {
        color = "#172554";
      }

      if (type === "purple") {
        color = "#6d28d9";
      }

      if (type === "burgundy") {
        color = "#7f1d1d";
      }

      if (type === "teal") {
        color = "#0f766e";
      }

      if (type === "beige") {
        color = "#e7d8c9";
      }

      if (type === "darkgray") {
        color = "#374151";
      }

      if (type === "custom") {
        color = customColor;
      }

      /*
        Paint Background
      */

      ctx.fillStyle = color;

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      /*
        Put Removed-Background Subject
        On Top
      */

      ctx.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
      );

      URL.revokeObjectURL(
        transparentUrl
      );

      const outputBlob =
        await new Promise<Blob | null>(
          (resolve) => {
            canvas.toBlob(
              resolve,
              "image/png",
              1
            );
          }
        );

      if (!outputBlob) {
        throw new Error(
          "Could not create image."
        );
      }

      return URL.createObjectURL(
        outputBlob
      );
    } catch (error) {
      URL.revokeObjectURL(
        transparentUrl
      );

      throw error;
    }
  };

  /* =========================
     REMOVE BACKGROUND
  ========================= */

  const removeBg = async () => {
    if (!file) return;

    setProcessing(true);
    setProgress(0);
    setError("");

    try {
      const blob =
        await removeBackground(
          file,
          {
            progress: (
              _key: string,
              current: number,
              total: number
            ) => {
              if (total > 0) {
                const percentage =
                  Math.round(
                    (current / total) *
                      100
                  );

                setProgress(
                  Math.max(
                    0,
                    Math.min(
                      100,
                      percentage
                    )
                  )
                );
              }
            },
          }
        );

      const finalUrl =
        await makeBackgroundImage(
          blob,
          background
        );

      if (resultUrl) {
        URL.revokeObjectURL(
          resultUrl
        );
      }

      setResultUrl(finalUrl);
      setProgress(100);
    } catch (err) {
      console.error(err);

      setError(
        "Background removal failed. Please try another image."
      );
    } finally {
      setProcessing(false);
    }
  };

  /* =========================
     DOWNLOAD
  ========================= */

  const downloadResult = () => {
    if (!resultUrl) return;

    const link =
      document.createElement("a");

    link.href = resultUrl;

    link.download =
      background === "transparent"
        ? "background-removed.png"
        : "background-changed.png";

    document.body.appendChild(link);

    link.click();

    link.remove();
  };

  /* =========================
     CLEAR
  ========================= */

  const clearAll = () => {
    if (originalUrl) {
      URL.revokeObjectURL(
        originalUrl
      );
    }

    if (resultUrl) {
      URL.revokeObjectURL(
        resultUrl
      );
    }

    setFile(null);
    setOriginalUrl("");
    setResultUrl("");
    setProgress(0);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  /* =========================
     BACKGROUND OPTIONS
  ========================= */

  const backgroundOptions = [
    {
      id: "transparent" as const,
      name: "Transparent",
      preview:
        "bg-[linear-gradient(45deg,#e5e7eb_25%,transparent_25%),linear-gradient(-45deg,#e5e7eb_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e5e7eb_75%),linear-gradient(-45deg,transparent_75%,#e5e7eb_75%)] bg-[length:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0px]",
    },

    {
      id: "white" as const,
      name: "White",
      preview: "bg-white",
    },

    {
      id: "black" as const,
      name: "Black",
      preview: "bg-black",
    },

    {
      id: "gray" as const,
      name: "Light Gray",
      preview: "bg-slate-200",
    },

    {
      id: "blue" as const,
      name: "Professional Blue",
      preview: "bg-blue-600",
    },

    {
      id: "green" as const,
      name: "Chroma Green",
      preview: "bg-green-500",
    },

    {
      id: "navy" as const,
      name: "Navy Blue",
      preview: "bg-[#172554]",
    },

    {
      id: "purple" as const,
      name: "Royal Purple",
      preview: "bg-[#6d28d9]",
    },

    {
      id: "burgundy" as const,
      name: "Burgundy",
      preview: "bg-[#7f1d1d]",
    },

    {
      id: "teal" as const,
      name: "Teal",
      preview: "bg-[#0f766e]",
    },

    {
      id: "beige" as const,
      name: "Warm Beige",
      preview: "bg-[#e7d8c9]",
    },

    {
      id: "darkgray" as const,
      name: "Dark Gray",
      preview: "bg-[#374151]",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      {/* =========================
          HEADER
      ========================= */}

      <div className="mx-auto max-w-3xl text-center">

        <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#202124] shadow-sm">
          AI Image Tool
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[#202124] sm:text-5xl">
          Background Remover
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          Remove image backgrounds and replace them with professional colors.
        </p>

      </div>

      {/* =========================
          MAIN GRID
      ========================= */}

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]">

        {/* =====================
            LEFT
        ===================== */}

        <div className="space-y-6">

          {/* UPLOAD */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-[#202124]">
              Upload Image
            </h2>

            <div
              onDragOver={(event) =>
                event.preventDefault()
              }
              onDrop={handleDrop}
              onClick={() =>
                inputRef.current?.click()
              }
              className="mt-5 cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center transition hover:border-slate-500 hover:bg-slate-100"
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                ↑
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#202124]">
                Drop your image here
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                or click to browse from your computer
              </p>

              <p className="mt-3 text-xs text-slate-400">
                JPG, PNG, WebP and other common image formats
              </p>

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

            </div>

            {file && (
              <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">

                <div className="truncate text-sm font-semibold text-[#202124]">
                  {file.name}
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>

              </div>
            )}

          </div>

          {/* BACKGROUND COLORS */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-[#202124]">
              Choose Background
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Select a professional background for your image.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

              {backgroundOptions.map(
                (option) => (

                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setBackground(
                        option.id
                      );
                      setResultUrl("");
                    }}
                    className={`rounded-2xl border p-3 text-left transition ${
                      background ===
                      option.id
                        ? "border-[#202124] bg-slate-100 ring-2 ring-slate-200"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >

                    <div
                      className={`h-16 w-full rounded-xl border border-slate-200 ${option.preview}`}
                    />

                    <div className="mt-3 text-sm font-bold text-[#202124]">
                      {option.name}
                    </div>

                  </button>

                )
              )}

              {/* CUSTOM */}

              <button
                type="button"
                onClick={() => {
                  setBackground(
                    "custom"
                  );
                  setResultUrl("");
                }}
                className={`rounded-2xl border p-3 text-left transition ${
                  background ===
                  "custom"
                    ? "border-[#202124] bg-slate-100 ring-2 ring-slate-200"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >

                <div
                  className="h-16 w-full rounded-xl border border-slate-200"
                  style={{
                    backgroundColor:
                      customColor,
                  }}
                />

                <div className="mt-3 text-sm font-bold text-[#202124]">
                  Custom Color
                </div>

              </button>

            </div>

            {/* CUSTOM COLOR */}

            {background === "custom" && (
              <div className="mt-5 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">

                <input
                  type="color"
                  value={customColor}
                  onChange={(event) => {
                    setCustomColor(
                      event.target.value
                    );
                    setResultUrl("");
                  }}
                  className="h-12 w-16 cursor-pointer rounded-lg border border-slate-300 bg-white p-1"
                />

                <div>

                  <div className="text-sm font-bold text-[#202124]">
                    Custom Background
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    {customColor}
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* ACTIONS */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <button
              type="button"
              onClick={removeBg}
              disabled={
                !file || processing
              }
              className="w-full rounded-xl bg-[#202124] px-5 py-4 font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              {processing
                ? `Removing Background${
                    progress
                      ? ` ${progress}%`
                      : "..."
                  }`
                : "Remove Background"}
            </button>

            <button
              type="button"
              onClick={downloadResult}
              disabled={!resultUrl}
              className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-5 py-4 font-bold text-[#202124] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Download Result
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-5 py-3.5 font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Clear
            </button>

            {/* PROGRESS */}

            {processing && (
              <div className="mt-5">

                <div className="mb-2 flex justify-between text-xs font-semibold text-slate-500">

                  <span>
                    Processing image...
                  </span>

                  <span>
                    {progress}%
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                  <div
                    className="h-full rounded-full bg-[#202124] transition-all"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>
            )}

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

          </div>

        </div>

        {/* =====================
            RIGHT PREVIEW
        ===================== */}

        <div className="lg:sticky lg:top-6 lg:self-start">

          <div className="rounded-3xl border border-slate-200 bg-slate-100 p-4 shadow-sm sm:p-6">

            <div className="mb-4 flex items-center justify-between">

              <div>

                <h2 className="font-bold text-[#202124]">
                  Preview
                </h2>

                <p className="text-xs text-slate-500">
                  Before & after
                </p>

              </div>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
                LIVE
              </span>

            </div>

            {/* ORIGINAL */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

              <div className="border-b border-slate-200 px-4 py-3">

                <span className="text-sm font-bold text-[#202124]">
                  Original
                </span>

              </div>

              <div className="flex min-h-[260px] items-center justify-center p-4">

                {originalUrl ? (
                  <img
                    src={originalUrl}
                    alt="Original image"
                    className="max-h-[330px] max-w-full rounded-xl object-contain"
                  />
                ) : (
                  <div className="text-center text-sm text-slate-400">
                    Upload an image to preview
                  </div>
                )}

              </div>

            </div>

            {/* RESULT */}

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">

              <div className="border-b border-slate-200 px-4 py-3">

                <span className="text-sm font-bold text-[#202124]">
                  Result
                </span>

              </div>

              <div className="flex min-h-[260px] items-center justify-center p-4">

                {resultUrl ? (
                  <img
                    src={resultUrl}
                    alt="Background removed result"
                    className="max-h-[330px] max-w-full rounded-xl object-contain"
                  />
                ) : (
                  <div className="text-center text-sm text-slate-400">
                    Your processed image will appear here
                  </div>
                )}

              </div>

            </div>

            {resultUrl && (
              <div className="mt-4 rounded-xl bg-white px-4 py-3 text-center text-xs font-semibold text-emerald-600">
                Background processed successfully.
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}
