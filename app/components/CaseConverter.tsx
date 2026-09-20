"use client";
import { useState } from "react";
const toTitleCase = (text: string) =>
  text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
const toSentenceCase = (text: string) =>
  text
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
export default function CaseConverter() {
  const [text, setText] = useState("");
  const uppercase = text.toUpperCase();
  const lowercase = text.toLowerCase();
  const titleCase = toTitleCase(text);
  const sentenceCase = toSentenceCase(text);
  const updateText = (value: string) => {
    setText(value);
  };
  const copyText = async (value: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
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
  };
  const results = [
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
      filename: "title-case-text.txt",
    },
    {
      title: "Sentence case",
      value: sentenceCase,
      filename: "sentence-case-text.txt",
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
            Convert text to uppercase, lowercase, title case or sentence case.
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
        {results.map((result) => (
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
          </div>
        ))}
      </section>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Your text is processed locally in your browser. Nothing is uploaded to
        a server.
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
              No. Text conversion is performed locally in your browser.
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
