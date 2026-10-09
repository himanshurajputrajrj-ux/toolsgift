"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { useLanguage } from "@/app/providers/LanguageProvider";
import { AuthCard } from "./AuthCard";
import { Field } from "./Field";
import { FormAlert, SubmitButton } from "./Controls";
import { authErrorMessage, submitJson } from "./api";

export function ForgotPasswordForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (busy) {
      return;
    }

    setError(null);

    if (!email.trim()) {
      setFieldError(t.auth.errRequired);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFieldError(t.auth.errInvalidEmail);
      return;
    }

    setFieldError(null);
    setBusy(true);

    const result = await submitJson("/api/auth/forgot-password", {
      email: email.trim(),
    });

    setBusy(false);

    if (!result.ok) {
      setError(authErrorMessage(t, result.code));
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <AuthCard
        title={t.auth.sentTitle}
        subtitle={t.auth.sentSubtitle}
        footer={
          <Link
            href="/login"
            className="font-bold text-[#9b7818] underline-offset-4 hover:underline darkmode:text-[#f4d77b]"
          >
            {t.auth.backToLogin}
          </Link>
        }
      />
    );
  }

  return (
    <AuthCard
      title={t.auth.forgotTitle}
      subtitle={t.auth.forgotSubtitle}
      footer={
        <Link
          href="/login"
          className="font-bold text-[#9b7818] underline-offset-4 hover:underline darkmode:text-[#f4d77b]"
        >
          {t.auth.backToLogin}
        </Link>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormAlert message={error} />

        <Field
          label={t.auth.email}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          error={fieldError}
          onChange={(event) => setEmail(event.target.value)}
        />

        <SubmitButton busy={busy}>{t.auth.sendResetLink}</SubmitButton>
      </form>
    </AuthCard>
  );
}
