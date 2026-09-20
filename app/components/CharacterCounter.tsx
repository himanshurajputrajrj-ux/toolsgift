"use client";
import { useState } from "react";
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
  return trimmed.split(/\n\s*\n/).filter((paragraph) => paragraph.trim()).length;
};
export default function CharacterCounter() {
  const [text, setText] = useState("");
  const characters = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, "").length;
  const words = countWords(text);
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const copyText = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
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
  const clearText = () => {
    setText("");
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
          onChange={(event) => setText(event.target.value)}
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
            onClick={copyText}
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
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Your text is processed locally in your browser. Nothing is uploaded
          to a server.
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
              No. Counting is performed locally in your browser.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Can I copy or download the text?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes. You can copy the text or download it as a TXT file.
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
