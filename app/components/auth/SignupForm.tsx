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

type FieldErrors = { name?: string; email?: string; password?: string };

export function SignupForm({ errorCode }: { errorCode?: string }) {
  const { t } = useLanguage();
  const { refresh } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
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

    if (name.trim().length < 2 || name.trim().length > 80) {
      next.name = t.auth.errName;
    }

    if (!email.trim()) {
      next.email = t.auth.errRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = t.auth.errInvalidEmail;
    }

    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      next.password = t.auth.errWeakPassword;
    } else if (password !== confirm) {
      next.password = t.auth.errPasswordMismatch;
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      return;
    }

    setBusy(true);

    const result = await submitJson("/api/auth/signup", {
      name: name.trim(),
      email: email.trim(),
      password,
    });

    if (!result.ok) {
      setBusy(false);
      setError(authErrorMessage(t, result.code));

      if (result.field) {
        setErrors({ [result.field]: authErrorMessage(t, result.code) });
      }

      return;
    }

    await refresh();
    router.push("/profile");
  }

  return (
    <AuthCard
      title={t.auth.signupTitle}
      subtitle={t.auth.signupSubtitle}
      footer={
        <>
          {t.auth.haveAccount}{" "}
          <Link
            href="/login"
            className="font-bold text-[#9b7818] underline-offset-4 hover:underline darkmode:text-[#f4d77b]"
          >
            {t.auth.signInCta}
          </Link>
        </>
      }
    >
      <div className="space-y-4">
        <GoogleButton
          href="/api/auth/google?from=/signup&returnTo=%2Fprofile"
        />
        <AuthDivider />
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
        <FormAlert message={error} />

        <Field
          label={t.auth.name}
          type="text"
          name="name"
          autoComplete="name"
          placeholder={t.auth.namePlaceholder}
          value={name}
          error={errors.name}
          onChange={(event) => setName(event.target.value)}
        />

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

        <SubmitButton busy={busy}>{t.auth.signupCta}</SubmitButton>
      </form>
    </AuthCard>
  );
}
