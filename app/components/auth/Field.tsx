"use client";

import { useId, useState, type InputHTMLAttributes } from "react";

import { useLanguage } from "@/app/providers/LanguageProvider";

type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  label: string;
  error?: string | null;
  hint?: string | null;
};

export function Field({
  label,
  error,
  hint,
  type = "text",
  ...props
}: FieldProps) {
  const { t } = useLanguage();
  const id = useId();
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-bold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={inputType}
          aria-invalid={error ? true : undefined}
          {...props}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] font-semibold text-[#202124] outline-none transition placeholder:font-normal placeholder:text-black/40 focus:border-[#c9a227] focus:ring-2 focus:ring-[#c9a227]/20 ${
            isPassword ? "pr-24" : ""
          } ${error ? "border-red-500" : "border-black/10"}`}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setVisible((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-black/50 transition hover:text-[#c9a227]"
            aria-label={visible ? t.auth.hidePassword : t.auth.showPassword}
          >
            {visible ? t.auth.hidePassword : t.auth.showPassword}
          </button>
        ) : null}
      </div>

      {hint && !error ? (
        <p className="mt-1.5 text-xs leading-5 text-slate-500">{hint}</p>
      ) : null}

      {error ? (
        <p role="alert" className="mt-1.5 text-xs font-semibold text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
