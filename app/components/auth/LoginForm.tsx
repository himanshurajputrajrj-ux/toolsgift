"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { useAuth } from "@/app/providers/AuthProvider";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { AuthCard } from "./AuthCard";
import { Field } from "./Field";
import { AuthDivider, GoogleButton } from "./GoogleButton";
import { FormAlert, SubmitButton } from "./Controls";
import { authErrorMessage, submitJson } from "./api";

type FieldErrors = { email?: string; password?: string };

export function LoginForm({
  nextPath,
  errorCode,
}: {
  nextPath: string;
  errorCode?: string;
}) {
  const { t } = useLanguage();
  const { refresh } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(() =>
    errorCode ? authErrorMessage(t, errorCode) : null
  );
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (busy) {
      return;
    }

    setError(null);

    const next: FieldErrors = {};

    if (!email.trim()) {
      next.email = t.auth.errRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = t.auth.errInvalidEmail;
    }

    if (!password) {
      next.password = t.auth.errRequired;
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      return;
    }

    setBusy(true);

    const result = await submitJson("/api/auth/login", {
      email: email.trim(),
      password,
    });

    if (!result.ok) {
      setBusy(false);
      setError(authErrorMessage(t, result.code));

      if (result.field === "email" || result.field === "password") {
        setErrors({ [result.field]: authErrorMessage(t, result.code) });
      }

      return;
    }

    await refresh();
    router.push(nextPath);
  }

  return (
    <AuthCard
      title={t.auth.loginTitle}
      subtitle={t.auth.loginSubtitle}
      footer={
        <>
          {t.auth.noAccount}{" "}
          <Link
            href="/signup"
            className="font-bold text-[#9b7818] underline-offset-4 hover:underline darkmode:text-[#f4d77b]"
          >
            {t.auth.createAccountCta}
          </Link>
        </>
      }
    >
      <div className="space-y-4">
        <GoogleButton
          href={`/api/auth/google?from=/login&returnTo=${encodeURIComponent(nextPath)}`}
        />
        <AuthDivider />
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
        <FormAlert message={error} />

        <Field
          label={t.auth.email}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          error={errors.email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Field
          label={t.auth.password}
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-black/55 underline-offset-4 hover:text-[#9b7818] hover:underline darkmode:text-slate-400 darkmode:hover:text-[#f4d77b]"
          >
            {t.auth.forgotPassword}
          </Link>
        </div>

        <SubmitButton busy={busy}>{t.auth.loginCta}</SubmitButton>
      </form>
    </AuthCard>
  );
}
