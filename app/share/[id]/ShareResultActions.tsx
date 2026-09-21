"use client";

import { useState } from "react";

type ShareResultActionsProps = {
  value: string;
  filename: string;
};

export default function ShareResultActions({
  value,
  filename,
}: ShareResultActionsProps) {
  const [copyMessage, setCopyMessage] = useState("");

  const copyText = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");

        textarea.value = value;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        const copied = document.execCommand("copy");

        document.body.removeChild(textarea);

        if (!copied) {
          throw new Error("Copy failed");
        }
      }

      setCopyMessage("Copied!");
      setTimeout(() => setCopyMessage(""), 2000);
    } catch {
      setCopyMessage("Copy failed. Please copy manually.");
    }
  };

  const downloadText = () => {
    const blob = new Blob([value], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyText}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Copy
        </button>

        <button
          type="button"
          onClick={downloadText}
          className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Download
        </button>
      </div>

      {copyMessage && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {copyMessage}
        </p>
      )}
    </div>
  );
}