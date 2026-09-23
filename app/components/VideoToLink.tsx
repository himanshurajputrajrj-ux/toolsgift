"use client";

import { DragEvent, useEffect, useRef, useState } from "react";

type ExpiryOption = "1h" | "6h" | "24h" | "3d" | "7d";

const EXPIRY_OPTIONS: Array<{
  value: ExpiryOption;
  label: string;
}> = [
  { value: "1h", label: "1 Hour" },
  { value: "6h", label: "6 Hours" },
  { value: "24h", label: "24 Hours" },
  { value: "3d", label: "3 Days" },
  { value: "7d", label: "7 Days" },
];

const MAX_VIDEO_SIZE = 500 * 1024 * 1024;

export default function VideoToLink() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [expiry, setExpiry] = useState<ExpiryOption>("7d");
  const [shareUrl, setShareUrl] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const handleFile = (selectedFile: File) => {
    if (loading) return;

    setMessage("");
    setShareUrl("");
    setExpiresAt("");

    if (!selectedFile.type.startsWith("video/")) {
      setFile(null);
      setMessage("Please select a video file.");
      return;
    }

    if (selectedFile.size > MAX_VIDEO_SIZE) {
      setFile(null);
      setMessage("Maximum video size is 500 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (loading) return;

    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (loading) return;

    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (loading) return;

    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    if (loading) return;

    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const resetTool = () => {
    if (loading) return;

    setFile(null);
    setShareUrl("");
    setExpiresAt("");
    setMessage("");
    setIsDragging(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const getUploadId = () =>
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const generateLink = async () => {
    if (!file) {
      setMessage("Please select a video first.");
      return;
    }

    setLoading(true);
    setMessage("");
    setShareUrl("");
    setExpiresAt("");

    try {
      const { upload } = await import("@vercel/blob/client");

      const pathname = `video-uploads/${getUploadId()}-${file.name}`;

      const blob = await upload(pathname, file, {
        access: "private",
        handleUploadUrl: "/api/video-upload",
        multipart: true,
      });

      const response = await fetch("/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool: "video-to-link",
          resultTitle: "Video Share",
          filename: file.name,
          assetKey: blob.pathname,
          contentType: file.type,
          expiry,
        }),
      });

      const data = await response.json();

      if (!response.ok || typeof data.shareUrl !== "string") {
        throw new Error(data.error || "Failed to create share link.");
      }

      setShareUrl(data.shareUrl);
      setExpiresAt(data.expiresAt || "");
      setMessage("Share link generated successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to create share link."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setMessage("Link copied.");
    } catch {
      setMessage("Unable to copy the link automatically.");
    }
  };

  const shareLink = async () => {
    if (!shareUrl) {
      await generateLink();
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: "ToolsGift - Video Share",
          text: "View this video shared with ToolsGift.",
          url: shareUrl,
        });

        setMessage("Share link ready.");
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setMessage(
          "Sharing is not supported here, so the link was copied."
        );
      }
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      setMessage("Unable to share the link.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
          Sharing Tool
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Video {"\u2192"} Link
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Upload a video and create a shareable link with an expiry time.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-semibold text-slate-900">
          Link Expiry
        </h2>

        <label className="mb-2 block text-sm font-medium text-slate-700">
          How long should the link remain available?
        </label>

        <select
          value={expiry}
          onChange={(event) =>
            setExpiry(event.target.value as ExpiryOption)
          }
          disabled={loading}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {EXPIRY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <p className="mt-2 text-xs text-slate-500">
          Maximum link lifetime is 7 Days.
        </p>
      </div>

      <div
        role="button"
        tabIndex={loading ? -1 : 0}
        aria-disabled={loading}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (!loading) {
            inputRef.current?.click();
          }
        }}
        onKeyDown={(event) => {
          if (loading) return;

          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={`rounded-2xl border-2 border-dashed bg-white p-10 text-center transition ${
          loading
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer"
        } ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/30"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          onChange={handleInputChange}
          disabled={loading}
          className="hidden"
        />

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="6" width="15" height="12" rx="2" />
            <path d="M18 10l4-2v8l-4-2z" />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          {file ? "Video selected" : "Upload Video"}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Drag & drop your video here or click to browse
        </p>

        <p className="mt-2 text-xs text-slate-400">
          Maximum file size: 500 MB
        </p>
      </div>

      {message && (
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {message}
        </div>
      )}

      {file && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-900">
                {file.name}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {formatSize(file.size)} {"\u00B7"} {file.type || "Video"}
              </p>
            </div>

            <button
              type="button"
              onClick={resetTool}
              disabled={loading}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {file && previewUrl && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm">
          <video
            src={previewUrl}
            controls
            className="mx-auto max-h-[600px] w-full"
          />
        </div>
      )}

      <button
        type="button"
        onClick={generateLink}
        disabled={!file || loading}
        className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {loading
          ? "Uploading & Generating Link..."
          : "Generate Link"}
      </button>

      {shareUrl && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Your Video Link
          </h2>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={shareUrl}
              readOnly
              aria-label="Video share link"
              className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
            />

            <button
              type="button"
              onClick={copyLink}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Copy Link
            </button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={shareLink}
              className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Share
            </button>

            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Open Link
            </a>
          </div>

          {expiresAt && (
            <p className="mt-4 text-center text-sm text-slate-500">
              This link expires on{" "}
              {new Date(expiresAt).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
