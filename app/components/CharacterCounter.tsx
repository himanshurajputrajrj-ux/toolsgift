"use client";
import { useState } from "react";
type ShareState = {
  shareUrl: string;
  expiresAt: string;
};
const countWords = (text: string) => {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
};
const countSentences = (text: string) => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/[.!?]+(?=\s|$)/).filter(Boolean).length;
};
const countParagraphs = (text: string) => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph.trim()).length;
};
const copyText = async (value: string): Promise<boolean> => {
  if (!value) return false;
  try {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    textarea.style.width = "1px";
    textarea.style.height = "1px";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, value.length);
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    if (copied) {
      return true;
    }
  } catch (error) {
    console.error("Textarea copy failed:", error);
  }
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch (error) {
    console.error("Clipboard API copy failed:", error);
  }
  return false;
};
export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [shareState, setShareState] = useState<ShareState | null>(null);
  const [shareLoading, setShareLoading] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const characters = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, "").length;
  const words = countWords(text);
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const copyResult = async () => {
    if (!text) return;
    const copied = await copyText(text);
    setCopyMessage(
      copied
        ? "Text copied successfully."
        : "Copy failed. Please copy the text manually."
    );
    if (copied) {
      setTimeout(() => setCopyMessage(""), 2000);
    }
  };
  const downloadText = () => {
    if (!text) return;
    const blob = new Blob([text], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "character-counter-text.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const createShareLink = async (): Promise<ShareState | null> => {
    if (!text || shareLoading) return null;
    if (shareState) {
      return shareState;
    }
    setShareLoading(true);
    setShareMessage("");
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool: "character-counter",
          resultTitle: "Character Counter",
          value: text,
          filename: "character-counter-text.txt",
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.shareUrl) {
        throw new Error(data.error || "Failed to create share link.");
      }
      const newShareState: ShareState = {
        shareUrl: data.shareUrl,
        expiresAt: data.expiresAt,
      };
      setShareState(newShareState);
      return newShareState;
    } catch (error) {
      console.error("Share link creation failed:", error);
      setShareMessage("Failed to generate share link. Please try again.");
      return null;
    } finally {
      setShareLoading(false);
    }
  };
  const generateLink = async () => {
    if (!text) return;
    const share = await createShareLink();
    if (share) {
      setShareMessage("Share link generated successfully.");
      setTimeout(() => setShareMessage(""), 2500);
    }
  };
  const shareResult = async () => {
    if (!text) return;
    const share = await createShareLink();
    if (!share) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "ToolsGift Character Counter",
          text: "Check out this shared Character Counter result.",
          url: share.shareUrl,
        });
        setShareMessage("Shared successfully.");
        setTimeout(() => setShareMessage(""), 2500);
      } else {
        const copied = await copyText(share.shareUrl);
        setShareMessage(
          copied
            ? "Sharing is not supported here, so the share link was copied."
            : "Sharing is not supported here. Please copy the link manually."
        );
      }
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }
      console.error("Native sharing failed:", error);
      const copied = await copyText(share.shareUrl);
      setShareMessage(
        copied
          ? "Share failed, so the share link was copied instead."
          : "Share failed. Please copy the link manually."
      );
    }
  };
  const copyShareLink = async () => {
    if (!shareState?.shareUrl) return;
    const copied = await copyText(shareState.shareUrl);
    setShareMessage(
      copied
        ? "Share link copied successfully."
        : "Copy failed. Please copy the link manually."
    );
    if (copied) {
      setTimeout(() => setShareMessage(""), 2000);
    }
  };
  const clearText = () => {
    setText("");
    setShareState(null);
    setCopyMessage("");
    setShareMessage("");
  };
  const stats = [
    { label: "Characters", value: characters },
    { label: "Without spaces", value: charactersWithoutSpaces },
    { label: "Words", value: words },
    { label: "Sentences", value: sentences },
    { label: "Paragraphs", value: paragraphs },
  ];
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Character Counter
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Count characters, spaces, words, sentences and paragraphs instantly.
          </p>
        </div>
        <textarea
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setShareState(null);
            setShareMessage("");
          }}
          className="mt-6 min-h-80 w-full resize-y rounded-xl border border-gray-300 bg-gray-50 p-5 text-base leading-7 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          placeholder="Type or paste your text here..."
          aria-label="Text for character counting"
        />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copyResult}
            disabled={!text}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Copy Text
          </button>
          <button
            type="button"
            onClick={downloadText}
            disabled={!text}
            className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Download Text
          </button>
          <button
            type="button"
            onClick={clearText}
            disabled={!text}
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Clear
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={generateLink}
            disabled={!text || shareLoading}
            className="rounded-xl border border-blue-600 bg-white px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900 dark:text-blue-400 dark:hover:bg-gray-800"
          >
            {shareLoading ? "Generating..." : "Generate Link"}
          </button>
          <button
            type="button"
            onClick={shareResult}
            disabled={!text || shareLoading}
            className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Share
          </button>
        </div>
        {shareState && (
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
            <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
              Share Link
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={shareState.shareUrl}
                readOnly
                className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                aria-label="Generated share link"
              />
              <button
                type="button"
                onClick={copyShareLink}
                className="rounded-xl bg-gray-800 px-5 py-3 font-semibold text-white transition hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Copy Link
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              This link expires one month after it is generated.
            </p>
          </div>
        )}
        {copyMessage && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {copyMessage}
          </p>
        )}
        {shareMessage && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {shareMessage}
          </p>
        )}
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Your text is processed locally in your browser. It is only uploaded
          to ToolsGift when you choose to generate or share a link.
        </p>
      </section>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          About Character Counter
        </h2>
        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
          ToolsGift Character Counter is a free online tool for counting
          characters in text. It shows total characters, characters without
          spaces, words, sentences and paragraphs, making it useful for social
          media posts, titles, assignments, forms and other text with character
          limits.
        </p>
      </section>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="mt-5 space-y-5">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              How do I count characters in text?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Paste or type your text into the Character Counter and the
              character count updates automatically.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Does the character count include spaces?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes. The tool shows both total characters and characters without
              spaces.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Is this Character Counter free?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes. ToolsGift Character Counter is free to use.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Is my text uploaded to a server?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              No. Counting is performed locally in your browser. Your text is
              only uploaded to ToolsGift when you choose to generate or share a
              link.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Can I copy, download or share the text?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes. You can copy the text, download it as a TXT file, or
              generate a share link that can be shared with others.
            </p>
          </div>
        </div>
      </section>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Related Tools
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Word Counter", "/tools/word-counter"],
            ["Image to Text", "/tools/image-to-text"],
            ["Image Converter", "/tools/converter"],
            ["Image Resizer", "/tools/resizer"],
            ["Image Compressor", "/tools/compressor"],
            ["Compress Image to KB", "/tools/compress-image-to-kb"],
          ].map(([title, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 font-semibold text-gray-900 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:hover:text-blue-400"
            >
              {title}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
