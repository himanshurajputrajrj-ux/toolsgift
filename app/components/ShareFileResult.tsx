"use client";
import { useEffect, useState } from "react";
import { deleteShare } from "@/app/lib/shareDelete";
type ShareFileResultProps = {
  tool: string;
  resultTitle: string;
  file: Blob | File | string | null;
  filename: string;
};
export default function ShareFileResult({
  tool,
  resultTitle,
  file,
  filename,
}: ShareFileResultProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [shareId, setShareId] = useState("");
  const [deleteCapability, setDeleteCapability] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
// eslint-disable-next-line react-hooks/set-state-in-effect
    setShareUrl("");
    setMessage("");
    setShareId("");
    setDeleteCapability("");
  }, [file, filename]);
  const copyText = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(textarea);
      return copied;
    } catch {
      return false;
    }
  };
  const createShareLink = async (): Promise<string | null> => {
    if (shareUrl) {
      return shareUrl;
    }
    if (!file) {
      setMessage("There is no file to share.");
      return null;
    }
    setLoading(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("tool", tool);
      formData.append("resultTitle", resultTitle);
      formData.append("filename", filename);
      let uploadFile: File;
      if (typeof file === "string") {
        const fileResponse = await fetch(file);
        if (!fileResponse.ok) {
          throw new Error("Failed to read the generated file.");
        }
        const fileBlob = await fileResponse.blob();
        uploadFile = new File([fileBlob], filename, {
          type: fileBlob.type || "application/octet-stream",
        });
      } else {
        uploadFile =
          file instanceof File
            ? file
            : new File([file], filename, {
                type: file.type || "application/octet-stream",
              });
      }
      formData.append("file", uploadFile);
      if (uploadFile.size === 0) {
        setMessage("There is no file to share.");
        return null;
      }
      const response = await fetch("/api/share", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok || !data.shareUrl) {
        throw new Error(data.error || "Failed to create share link.");
      }
      setShareUrl(data.shareUrl);
      setShareId(typeof data.shareId === "string" ? data.shareId : "");
      setDeleteCapability(
        typeof data.deleteCapability === "string" ? data.deleteCapability : ""
      );
      return data.shareUrl;
    } catch {
      setMessage("Failed to create share link. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };
  const handleGenerateLink = async () => {
    const url = await createShareLink();
    if (!url) {
      return;
    }
    const copied = await copyText(url);
    setMessage(
      copied
        ? "Link generated and copied."
        : "Link generated. Copy it from the box below."
    );
  };
  const handleShare = async () => {
    const url = await createShareLink();
    if (!url) {
      return;
    }
    try {
      if (navigator.share) {
        await navigator.share({
          title: resultTitle,
          text: "Check out this result from ToolsGift.",
          url,
        });
        setMessage("Shared successfully.");
        return;
      }
      const copied = await copyText(url);
      setMessage(
        copied
          ? "Sharing is not supported here, so the link was copied."
          : "Sharing is not supported. Copy the link manually."
      );
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      const copied = await copyText(url);
      setMessage(
        copied
          ? "Share cancelled. Link copied instead."
          : "Share cancelled."
      );
    }
  };
  const handleCopyLink = async () => {
    if (!shareUrl) {
      return;
    }
    const copied = await copyText(shareUrl);
    setMessage(copied ? "Link copied!" : "Copy failed. Please copy manually.");
  };
  const handleDelete = async () => {
    if (!shareId || !deleteCapability) {
      return;
    }
    setLoading(true);
    setMessage("");
    const deleted = await deleteShare(shareId, deleteCapability);
    setLoading(false);
    if (!deleted) {
      setMessage("Failed to delete the share link.");
      return;
    }
    setShareUrl("");
    setShareId("");
    setDeleteCapability("");
    setMessage("Share link deleted.");
  };
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleGenerateLink}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Link"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          disabled={loading}
          className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Share
        </button>
      </div>
      {shareUrl && (
        <div className="mt-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={shareUrl}
              readOnly
              aria-label="Share link"
              className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Copy Link
            </button>
            {shareId && deleteCapability && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="rounded-xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900 dark:bg-gray-900 dark:text-red-400 dark:hover:bg-red-950"
              >
                {loading ? "Deleting..." : "Delete Link"}
              </button>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            This link expires in one month.
          </p>
        </div>
      )}
      {message && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>
      )}
    </div>
  );
}
