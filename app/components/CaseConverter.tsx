"use client";

import { useState } from "react";

const toTitleCase = (text: string) =>
  text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

const toSentenceCase = (text: string) =>
  text
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());

type Result = {
  title: string;
  value: string;
  filename: string;
};

type ShareState = {
  shareUrl: string;
  expiresAt: string;
};

export default function CaseConverter() {
  const [text, setText] = useState("");

  const [shareStates, setShareStates] = useState<
    Record<string, ShareState | undefined>
  >({});

  const [loadingShare, setLoadingShare] = useState<string | null>(null);

  const [shareMessage, setShareMessage] = useState<
    Record<string, string | undefined>
  >({});

  const uppercase = text.toUpperCase();
  const lowercase = text.toLowerCase();
  const titleCase = toTitleCase(text);
  const sentenceCase = toSentenceCase(text);

  const updateText = (value: string) => {
    setText(value);
  };

  /*
   * Robust copy function.
   * First tries Clipboard API.
   * If that is unavailable, uses the browser fallback.
   */
  const copyText = async (value: string): Promise<boolean> => {
    if (!value) return false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        return true;
      }

      const textarea = document.createElement("textarea");

      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      textarea.style.opacity = "0";
      textarea.setAttribute("readonly", "");

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      const copied = document.execCommand("copy");

      document.body.removeChild(textarea);

      if (!copied) {
        throw new Error("Copy failed");
      }

      return true;
    } catch (error) {
      console.error("Copy failed:", error);
      return false;
    }
  };

  const downloadText = (value: string, filename: string) => {
    if (!value) return;

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

  const clearText = () => {
    setText("");
    setShareStates({});
    setShareMessage({});
  };

  const createShareLink = async (result: Result) => {
    if (!result.value || loadingShare) return null;

    const existingShare = shareStates[result.title];

    if (existingShare) {
      return existingShare;
    }

    setLoadingShare(result.title);

    setShareMessage((previous) => ({
      ...previous,
      [result.title]: undefined,
    }));

    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool: "case-converter",
          resultTitle: result.title,
          value: result.value,
          filename: result.filename,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create share link.");
      }

      const newShare: ShareState = {
        shareUrl: data.shareUrl,
        expiresAt: data.expiresAt,
      };

      setShareStates((previous) => ({
        ...previous,
        [result.title]: newShare,
      }));

      return newShare;
    } catch (error) {
      console.error("Share link error:", error);

      setShareMessage((previous) => ({
        ...previous,
        [result.title]:
          error instanceof Error
            ? error.message
            : "Failed to create share link.",
      }));

      return null;
    } finally {
      setLoadingShare(null);
    }
  };

  const generateLink = async (result: Result) => {
    const share = await createShareLink(result);

    if (!share) return;

    const copied = await copyText(share.shareUrl);

    if (copied) {
      setShareMessage((previous) => ({
        ...previous,
        [result.title]: "Link generated and copied.",
      }));
    } else {
      setShareMessage((previous) => ({
        ...previous,
        [result.title]:
          "Link generated. Copy it using the Copy Link button.",
      }));
    }
  };

  const shareResult = async (result: Result) => {
    if (!result.value || loadingShare) return;

    const share = await createShareLink(result);

    if (!share) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `ToolsGift - ${result.title}`,
          text: "View this result on ToolsGift.",
          url: share.shareUrl,
        });

        setShareMessage((previous) => ({
          ...previous,
          [result.title]: "Share dialog opened.",
        }));
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        setShareMessage((previous) => ({
          ...previous,
          [result.title]: "Link generated. You can copy it below.",
        }));
      }
    } else {
      const copied = await copyText(share.shareUrl);

      setShareMessage((previous) => ({
        ...previous,
        [result.title]: copied
          ? "Sharing is not supported here. Link copied instead."
          : "Link generated. Copy it using the Copy Link button.",
      }));
    }
  };

  const copyShareLink = async (result: Result, shareUrl: string) => {
    const copied = await copyText(shareUrl);

    setShareMessage((previous) => ({
      ...previous,
      [result.title]: copied
        ? "Link copied!"
        : "Copy failed. Please select and copy the link manually.",
    }));
  };

  const results: Result[] = [
    {
      title: "UPPERCASE",
      value: uppercase,
      filename: "uppercase-text.txt",
    },
    {
      title: "lowercase",
      value: lowercase,
      filename: "lowercase-text.txt",
    },
    {
      title: "Title Case",
      value: titleCase,
      filename: "title-case.txt",
    },
    {
      title: "Sentence case",
      value: sentenceCase,
      filename: "sentence-case.txt",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Case Converter
          </h2>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Convert text to uppercase, lowercase, title case or sentence
            case.
          </p>
        </div>

        <textarea
          value={text}
          onChange={(event) => updateText(event.target.value)}
          className="mt-6 min-h-72 w-full resize-y rounded-xl border border-gray-300 bg-gray-50 p-5 text-base leading-7 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          placeholder="Type or paste your text here..."
          aria-label="Text for case conversion"
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => updateText(uppercase)}
            disabled={!text}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            UPPERCASE
          </button>

          <button
            type="button"
            onClick={() => updateText(lowercase)}
            disabled={!text}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            lowercase
          </button>

          <button
            type="button"
            onClick={() => updateText(titleCase)}
            disabled={!text}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Title Case
          </button>

          <button
            type="button"
            onClick={() => updateText(sentenceCase)}
            disabled={!text}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sentence case
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
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {results.map((result) => {
          const share = shareStates[result.title];
          const message = shareMessage[result.title];
          const isLoading = loadingShare === result.title;

          return (
            <div
              key={result.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {result.title}
              </h3>

              <textarea
                value={result.value}
                readOnly
                className="mt-4 min-h-48 w-full resize-y rounded-xl border border-gray-300 bg-gray-50 p-4 text-base leading-7 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                aria-label={`${result.title} result`}
              />

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => copyText(result.value)}
                  disabled={!result.value}
                  className="rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Copy
                </button>

                <button
                  type="button"
                  onClick={() =>
                    downloadText(result.value, result.filename)
                  }
                  disabled={!result.value}
                  className="rounded-xl bg-green-600 px-4 py-2.5 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Download
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => generateLink(result)}
                  disabled={!result.value || isLoading}
                  className="rounded-xl border border-blue-600 bg-white px-4 py-2.5 font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900 dark:hover:bg-gray-800"
                >
                  {isLoading ? "Generating..." : "Generate Link"}
                </button>

                <button
                  type="button"
                  onClick={() => shareResult(result)}
                  disabled={!result.value || isLoading}
                  className="rounded-xl bg-purple-600 px-4 py-2.5 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? "Preparing..." : "Share"}
                </button>
              </div>

              {share && (
                <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950">
                  <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Share Link
                  </p>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="text"
                      value={share.shareUrl}
                      readOnly
                      className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                      aria-label={`${result.title} share link`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        copyShareLink(result, share.shareUrl)
                      }
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Copy Link
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
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
        })}
      </section>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Your text is processed locally in your browser. It is only uploaded
        to ToolsGift when you choose to generate or share a link.
      </p>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          About Case Converter
        </h2>

        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
          ToolsGift Case Converter is a free online text tool for changing
          text between uppercase, lowercase, title case and sentence case.
          It is useful for editing documents, headings, captions, notes and
          other everyday text.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>

        <div className="mt-5 space-y-5">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              What is a case converter?
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              A case converter changes text capitalization into formats such
              as uppercase, lowercase, title case and sentence case.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Can I convert text to uppercase?
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes. Use the UPPERCASE option to convert the text instantly.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Can I convert text to lowercase?
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes. Use the lowercase option to convert all letters to
              lowercase.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Is this Case Converter free?
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes. ToolsGift Case Converter is free to use.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Is my text uploaded to a server?
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              No. Normal text conversion happens locally in your browser.
              Your text is uploaded only when you explicitly generate or
              share a link.
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
            ["Character Counter", "/tools/character-counter"],
            ["Image to Text", "/tools/image-to-text"],
            ["Image Converter", "/tools/converter"],
            ["Image Resizer", "/tools/resizer"],
            ["Image Compressor", "/tools/compressor"],
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