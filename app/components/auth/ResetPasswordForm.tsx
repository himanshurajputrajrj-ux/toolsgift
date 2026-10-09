"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { useLanguage } from "@/app/providers/LanguageProvider";
import { AuthCard } from "./AuthCard";
import { Field } from "./Field";
import { FormAlert, FormSuccess, SubmitButton } from "./Controls";
import { authErrorMessage, submitJson } from "./api";

export function ResetPasswordForm({ token }: { token: string }) {
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (busy) {
      return;
    }

    setError(null);

    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      setErrors({ password: t.auth.errWeakPassword });
      return;
    }

    if (password !== confirm) {
      setErrors({ password: t.auth.errPasswordMismatch });
      return;
    }

    setErrors({});
    setBusy(true);

    const result = await submitJson("/api/auth/reset-password", {
      token,
      password,
    });

    setBusy(false);

    if (!result.ok) {
      setError(authErrorMessage(t, result.code));
      return;
    }

    setDone(true);
  }

  if (!token) {
    return (
      <AuthCard
        title={t.auth.invalidLinkTitle}
        subtitle={t.auth.invalidLinkSubtitle}
        footer={
          <Link
            href="/forgot-password"
            className="font-bold text-[#9b7818] underline-offset-4 hover:underline darkmode:text-[#f4d77b]"
          >
            {t.auth.sendResetLink}
          </Link>
        }
      />
    );
  }

  if (done) {
    return (
      <AuthCard
        title={t.auth.updatedTitle}
        subtitle={t.auth.updatedSubtitle}
        footer={
          <Link
            href="/login"
            className="font-bold text-[#9b7818] underline-offset-4 hover:underline darkmode:text-[#f4d77b]"
          >
            {t.auth.goToSignIn}
          </Link>
        }
      >
        <FormSuccess message={t.auth.passwordChanged} />
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title={t.auth.resetTitle}
      subtitle={t.auth.resetSubtitle}
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
          label={t.auth.newPassword}
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={password}
          error={errors.password}
          hint={t.auth.passwordHint}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Field
          label={t.auth.confirmPassword}
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="••••••••"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
        />

        <SubmitButton busy={busy}>{t.auth.resetCta}</SubmitButton>
      </form>
    </AuthCard>
  );
}
