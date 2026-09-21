"use client";
import { useMemo, useState } from "react";
type Unit = {
  label: string;
  value: string;
  factor?: number;
};
type ShareState = {
  shareUrl: string;
  expiresAt: string;
};
const unitsByCategory: Record<string, Unit[]> = {
  Length: [
    { label: "Kilometer (km)", value: "km", factor: 1000 },
    { label: "Meter (m)", value: "m", factor: 1 },
    { label: "Centimeter (cm)", value: "cm", factor: 0.01 },
    { label: "Millimeter (mm)", value: "mm", factor: 0.001 },
    { label: "Mile (mi)", value: "mi", factor: 1609.344 },
    { label: "Yard (yd)", value: "yd", factor: 0.9144 },
    { label: "Foot (ft)", value: "ft", factor: 0.3048 },
    { label: "Inch (in)", value: "in", factor: 0.0254 },
  ],
  Weight: [
    { label: "Kilogram (kg)", value: "kg", factor: 1 },
    { label: "Gram (g)", value: "g", factor: 0.001 },
    { label: "Milligram (mg)", value: "mg", factor: 0.000001 },
    { label: "Pound (lb)", value: "lb", factor: 0.45359237 },
    { label: "Ounce (oz)", value: "oz", factor: 0.028349523125 },
    { label: "Stone (st)", value: "st", factor: 6.35029318 },
  ],
  Temperature: [
    { label: "Celsius (C)", value: "c" },
    { label: "Fahrenheit (F)", value: "f" },
    { label: "Kelvin (K)", value: "k" },
  ],
};
function convertTemperature(value: number, from: string, to: string) {
  let celsius = value;
  if (from === "f") celsius = (value - 32) * (5 / 9);
  if (from === "k") celsius = value - 273.15;
  if (to === "c") return celsius;
  if (to === "f") return celsius * (9 / 5) + 32;
  return celsius + 273.15;
}
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
export default function UnitConverter() {
  const [category, setCategory] = useState("Length");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [shareState, setShareState] = useState<ShareState | null>(null);
  const [shareLoading, setShareLoading] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const units = unitsByCategory[category];
  const result = useMemo(() => {
    if (value.trim() === "") return "";
    const number = Number(value);
    if (!Number.isFinite(number)) return "";
    if (category === "Temperature") {
      return convertTemperature(number, fromUnit, toUnit);
    }
    const from = units.find((unit) => unit.value === fromUnit);
    const to = units.find((unit) => unit.value === toUnit);
    if (!from?.factor || !to?.factor) return "";
    return (number * from.factor) / to.factor;
  }, [category, value, fromUnit, toUnit, units]);
  const formatResult = (number: number | string) => {
    if (number === "") return "";
    const parsed = Number(number);
    if (!Number.isFinite(parsed)) return "";
    return Number(parsed.toFixed(10)).toString();
  };
  const formattedResult = formatResult(result);
  const getUnitLabel = (unitValue: string) => {
    return (
      units.find((unit) => unit.value === unitValue)?.label || unitValue
    );
  };
  const getResultText = () => {
    if (!formattedResult) return "";
    return `${value} ${getUnitLabel(fromUnit)} = ${formattedResult} ${getUnitLabel(toUnit)}`;
  };
  const handleCategoryChange = (newCategory: string) => {
    const newUnits = unitsByCategory[newCategory];
    setCategory(newCategory);
    setFromUnit(newUnits[0].value);
    setToUnit(newUnits[1]?.value ?? newUnits[0].value);
    setValue("");
    setShareState(null);
    setShareMessage("");
  };
  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setShareState(null);
    setShareMessage("");
  };
  const handleFromUnitChange = (newUnit: string) => {
    setFromUnit(newUnit);
    setShareState(null);
    setShareMessage("");
  };
  const handleToUnitChange = (newUnit: string) => {
    setToUnit(newUnit);
    setShareState(null);
    setShareMessage("");
  };
  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setShareState(null);
    setShareMessage("");
  };
  const createShareLink = async (): Promise<ShareState | null> => {
    if (!formattedResult || shareLoading) return null;
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
          tool: "unit-converter",
          resultTitle: "Unit Converter",
          value: getResultText(),
          filename: "unit-converter-result.txt",
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
  const copyResult = async () => {
    const resultText = getResultText();
    if (!resultText) return;
    const copied = await copyText(resultText);
    setShareMessage(
      copied
        ? "Result copied successfully."
        : "Copy failed. Please copy the result manually."
    );
    if (copied) {
      setTimeout(() => setShareMessage(""), 2000);
    }
  };
  const generateLink = async () => {
    if (!formattedResult) return;
    const share = await createShareLink();
    if (share) {
      setShareMessage("Share link generated successfully.");
      setTimeout(() => setShareMessage(""), 2500);
    }
  };
  const shareResult = async () => {
    if (!formattedResult) return;
    const share = await createShareLink();
    if (!share) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "ToolsGift Unit Converter",
          text: "Check out this shared Unit Converter result.",
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
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-5">
          <label
            htmlFor="unit-category"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Conversion Type
          </label>
          <select
            id="unit-category"
            value={category}
            onChange={(event) => handleCategoryChange(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          >
            {Object.keys(unitsByCategory).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
          <div>
            <label
              htmlFor="unit-value"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Value
            </label>
            <input
              id="unit-value"
              type="number"
              inputMode="decimal"
              value={value}
              onChange={(event) => handleValueChange(event.target.value)}
              placeholder="Enter a value"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <button
            type="button"
            onClick={swapUnits}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Swap
          </button>
          <div>
            <label
              htmlFor="unit-result"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Result
            </label>
            <div
              id="unit-result"
              className="min-h-[48px] rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200"
            >
              {formattedResult || "Result will appear here"}
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="from-unit"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              From
            </label>
            <select
              id="from-unit"
              value={fromUnit}
              onChange={(event) => handleFromUnitChange(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              {units.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="to-unit"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              To
            </label>
            <select
              id="to-unit"
              value={toUnit}
              onChange={(event) => handleToUnitChange(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              {units.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {formattedResult && (
          <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyResult}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Copy Result
              </button>
              <button
                type="button"
                onClick={generateLink}
                disabled={shareLoading}
                className="rounded-xl border border-blue-600 bg-white px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-slate-800"
              >
                {shareLoading ? "Generating..." : "Generate Link"}
              </button>
              <button
                type="button"
                onClick={shareResult}
                disabled={shareLoading}
                className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Share
              </button>
            </div>
            {shareState && (
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                  Share Link
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={shareState.shareUrl}
                    readOnly
                    className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    aria-label="Generated share link"
                  />
                  <button
                    type="button"
                    onClick={copyShareLink}
                    className="rounded-xl bg-slate-800 px-5 py-3 font-semibold text-white transition hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600"
                  >
                    Copy Link
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  This link expires one month after it is generated.
                </p>
              </div>
            )}
            {shareMessage && (
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                {shareMessage}
              </p>
            )}
          </div>
        )}
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          About Unit Converter
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Convert common length, weight and temperature units instantly with
          this free browser-based unit converter. Enter a value, choose the
          source and target units, and the result updates instantly.
        </p>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="mt-5 space-y-5">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              What units can I convert?
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              The tool currently supports common length, weight and temperature
              units.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Is the Unit Converter free?
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Yes. The converter is free to use.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Are my values uploaded?
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              No. Calculations are performed directly in your browser. Values
              are only uploaded to ToolsGift when you choose to generate or
              share a link.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
