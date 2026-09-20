"use client";
import { useMemo, useState } from "react";
type Unit = {
  label: string;
  value: string;
  factor?: number;
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
export default function UnitConverter() {
  const [category, setCategory] = useState("Length");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
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
  const handleCategoryChange = (newCategory: string) => {
    const newUnits = unitsByCategory[newCategory];
    setCategory(newCategory);
    setFromUnit(newUnits[0].value);
    setToUnit(newUnits[1]?.value ?? newUnits[0].value);
    setValue("");
  };
  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
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
              onChange={(event) => setValue(event.target.value)}
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
              {formatResult(result) || "Result will appear here"}
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
              onChange={(event) => setFromUnit(event.target.value)}
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
              onChange={(event) => setToUnit(event.target.value)}
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
              No. Calculations are performed directly in your browser.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}