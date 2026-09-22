"use client";

import { useEffect, useState } from "react";

type ShareImage = {
  url: string;
  name: string;
};

type ShareResultProps = {
  tool: string;
  resultTitle: string;
  value?: string;
  filename: string;
  imageUrl?: string;
  images?: ShareImage[];
};

export default function ShareResult({
  tool,
  resultTitle,
  value = "",
  filename,
  imageUrl,
  images,
}: ShareResultProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const imagesKey = images?.map((image) => `${image.url}:${image.name}`).join("|") || "";

  useEffect(() => {
    setShareUrl("");
    setMessage("");
  }, [imageUrl, imagesKey, value]);

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

    if (!value.trim() && !imageUrl && !images?.length) {
      setMessage("There is no result to share.");
      return null;
    }

    setLoading(true);
    setMessage("");

    try {
      let response: Response;

      if (images?.length) {
        const formData = new FormData();

        formData.append("tool", tool);
        formData.append("resultTitle", resultTitle);
        formData.append("filename", filename);

        for (const image of images) {
          const blob = await fetch(image.url).then((result) => result.blob());

          formData.append(
            "images",
            new File([blob], image.name, { type: blob.type })
          );
        }

        response = await fetch("/api/share", {
          method: "POST",
          body: formData,
        });
      } else if (imageUrl) {
        const blob = await fetch(imageUrl).then((result) => result.blob());
        const formData = new FormData();

        formData.append("tool", tool);
        formData.append("resultTitle", resultTitle);
        formData.append("filename", filename);
        formData.append(
          "image",
          new File([blob], filename, { type: blob.type })
        );

        response = await fetch("/api/share", {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch("/api/share", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tool, resultTitle, value, filename }),
        });
      }

      const data = await response.json();

      if (!response.ok || !data.shareUrl) {
        throw new Error(data.error || "Failed to create share link.");
      }

      setShareUrl(data.shareUrl);

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
