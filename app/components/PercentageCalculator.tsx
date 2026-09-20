"use client";
import { useState } from "react";
export default function PercentageCalculator() {
  const [percentage, setPercentage] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const calculate = () => {
    const percent = Number(percentage);
    const number = Number(value);
    if (!Number.isFinite(percent) || !Number.isFinite(number)) {
      setResult(null);
      return;
    }
    setResult((percent / 100) * number);
  };
  const clear = () => {
    setPercentage("");
    setValue("");
    setResult(null);
  };
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Percentage Calculator
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Calculate a percentage of any number instantly.
          </p>
        </div>
        <div className="mx-auto mt-6 grid max-w-2xl gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="percentage"
              className="mb-2 block font-semibold text-gray-900 dark:text-white"
            >
              Percentage (%)
            </label>
            <input
              id="percentage"
              type="number"
              value={percentage}
              onChange={(event) => setPercentage(event.target.value)}
              placeholder="e.g. 20"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="value"
              className="mb-2 block font-semibold text-gray-900 dark:text-white"
            >
              Number
            </label>
            <input
              id="value"
              type="number"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="e.g. 500"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={calculate}
            disabled={!percentage || !value}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={clear}
            className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Clear
          </button>
        </div>
        {result !== null && (
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center dark:border-blue-900 dark:bg-blue-950/40">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              Result
            </p>
            <p className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
              {result}
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {percentage}% of {value} = {result}
            </p>
          </div>
        )}
      </section>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          About Percentage Calculator
        </h2>
        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
          ToolsGift Percentage Calculator helps you quickly calculate what a
          percentage of a number is. Enter a percentage and a number to get the
          result instantly.
        </p>
      </section>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="mt-5 space-y-5">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              How do I calculate a percentage of a number?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Enter the percentage and the number, then select Calculate. The
              result is calculated using the percentage divided by 100,
              multiplied by the number.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              What is 20% of 500?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              20% of 500 is 100.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Can I calculate decimal percentages?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes. You can enter decimal percentages such as 12.5%.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Is the Percentage Calculator free?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes. ToolsGift Percentage Calculator is free to use.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Does the calculator work on mobile?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Yes. The calculator works in modern desktop and mobile browsers.
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
            ["Case Converter", "/tools/case-converter"],
            ["Image Compressor", "/tools/compressor"],
            ["Image Resizer", "/tools/resizer"],
            ["PDF Compressor", "/tools/pdf-compressor"],
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
