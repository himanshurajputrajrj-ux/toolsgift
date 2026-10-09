"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { useAuth } from "@/app/providers/AuthProvider";
import { useLanguage } from "@/app/providers/LanguageProvider";
import type { PublicUser } from "@/app/lib/auth/types";
import { Field } from "./Field";
import { FormAlert, FormSuccess } from "./Controls";
import { GoogleButton, GoogleIcon } from "./GoogleButton";
import { authErrorMessage, submitJson } from "./api";

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="text-lg font-black tracking-tight text-slate-900">
        {title}
      </h2>
      {description ? (
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      ) : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Avatar({ name, email }: { name: string; email: string }) {
  const initial =
    name.trim().charAt(0).toUpperCase() || email.charAt(0).toUpperCase();

  return (
    <span
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#c9a227] text-2xl font-black text-[#202124]"
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

export function ProfilePanel({
  initialUser,
  errorCode,
}: {
  initialUser?: PublicUser;
  errorCode?: string;
}) {
  const { t, locale } = useLanguage();
  const { user, status, refresh, signOut } = useAuth();
  const router = useRouter();

  const [nameDraft, setNameDraft] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSaved, setProfileSaved] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
  }>({});
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // The server passes the authorized user so the page paints immediately;
  // the AuthProvider keeps it fresh afterwards.
  const resolvedUser = user ?? initialUser ?? null;
  const hasPassword = (user ?? initialUser)?.hasPassword ?? false;
  const googleLinked = (user ?? initialUser)?.googleLinked ?? false;
  // Error carried back by the Google OAuth callback (?error=... on /profile).
  const linkError = errorCode ? authErrorMessage(t, errorCode) : null;

  if (status === "loading" && !resolvedUser) {
    return (
      <div className="mx-auto max-w-3xl space-y-5 px-5 py-12">
        <div className="h-28 animate-pulse rounded-2xl border border-black/10 bg-white" />
        <div className="h-64 animate-pulse rounded-2xl border border-black/10 bg-white" />
        <div className="h-64 animate-pulse rounded-2xl border border-black/10 bg-white" />
      </div>
    );
  }

  if (!resolvedUser) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <div className="rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-slate-900">
            {t.auth.errNotAuthenticated}
          </h1>          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-black text-[#202124] transition hover:bg-[#f4c430]"
            >
              {t.auth.signIn}
            </Link>
            <Link
              href="/signup"
              className="rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm font-black text-[#202124] transition hover:bg-black/[0.04]"
            >
              {t.auth.signUp}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayName = nameDraft ?? resolvedUser.name;

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (savingProfile) {
      return;
    }

    setProfileError(null);
    setProfileSaved(false);

    const trimmed = displayName.trim();

    if (trimmed.length < 2 || trimmed.length > 80) {
      setProfileError(t.auth.errName);
      return;
    }

    setSavingProfile(true);

    const result = await submitJson("/api/auth/me", { name: trimmed }, "PATCH");

    setSavingProfile(false);

    if (!result.ok) {
      setProfileError(authErrorMessage(t, result.code));
      return;
    }

    setNameDraft(null);
    setProfileSaved(true);
    await refresh();
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (savingPassword) {
      return;
    }

    setPasswordError(null);
    setPasswordSaved(false);

    const next: typeof passwordErrors = {};

    if (hasPassword && !currentPassword) {
      next.currentPassword = t.auth.errRequired;
    }

    if (
      newPassword.length < 8 ||
      !/[a-zA-Z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword)
    ) {
      next.newPassword = t.auth.errWeakPassword;
    } else if (newPassword !== confirmPassword) {
      next.newPassword = t.auth.errPasswordMismatch;
    }

    setPasswordErrors(next);

    if (Object.keys(next).length > 0) {
      return;
    }

    setSavingPassword(true);

    const result = await submitJson("/api/auth/change-password", {
      currentPassword,
      newPassword,
    });

    setSavingPassword(false);

    if (!result.ok) {
      setPasswordError(authErrorMessage(t, result.code));

      if (result.field === "password" || result.code === "wrong_password") {
        setPasswordErrors({
          currentPassword: authErrorMessage(t, result.code),
        });
      }

      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordSaved(true);
    await refresh();
  }

  const memberSince = new Date(resolvedUser.createdAt).toLocaleDateString(
    locale,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="mx-auto max-w-3xl space-y-5 px-5 py-12">
      <header className="flex flex-wrap items-center gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-7">
        <Avatar name={resolvedUser.name} email={resolvedUser.email} />

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-black tracking-tight text-slate-900">
            {resolvedUser.name}
          </h1>
          <p className="truncate text-sm text-slate-600">{resolvedUser.email}</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {t.auth.memberSince} {memberSince}
          </p>
        </div>

        <span className="rounded-full border border-[#c9a227]/40 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#9b7818] darkmode:text-[#f4d77b]">
          {resolvedUser.plan.id === "free" ? t.auth.planFree : t.auth.planPremium}
        </span>
      </header>

      <Card
        title={t.auth.personalInfo}
        description={t.auth.personalInfoDesc}
      >
        <form onSubmit={handleProfileSubmit} noValidate className="space-y-4">
          <FormAlert message={profileError} />
          <FormSuccess message={profileSaved ? t.auth.changesSaved : null} />

          <Field
            label={t.auth.name}
            type="text"
            name="name"
            autoComplete="name"
            value={displayName}
            onChange={(event) => {
              setNameDraft(event.target.value);
              setProfileSaved(false);
            }}
          />

          <div>
            <span className="mb-1.5 block text-sm font-bold text-slate-700">
              {t.auth.email}
            </span>
            <p className="rounded-xl border border-black/10 bg-slate-50 px-4 py-3 text-[15px] font-semibold text-black/70">
              {resolvedUser.email}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={savingProfile}
              className="rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-black text-[#202124] shadow-sm transition hover:bg-[#f4c430] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {savingProfile ? t.auth.pleaseWait : t.auth.saveChanges}
            </button>
          </div>
        </form>
      </Card>

      <Card title={t.auth.security} description={t.auth.securityDesc}>
        <form onSubmit={handlePasswordSubmit} noValidate className="space-y-4">
          <FormAlert message={passwordError} />
          <FormSuccess
            message={passwordSaved ? t.auth.passwordChanged : null}
          />

          {hasPassword ? (
            <Field
              label={t.auth.currentPassword}
              type="password"
              name="currentPassword"
              autoComplete="current-password"
              placeholder="••••••••"
              value={currentPassword}
              error={passwordErrors.currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
          ) : null}

          <Field
            label={t.auth.newPassword}
            type="password"
            name="newPassword"
            autoComplete="new-password"
            placeholder="••••••••"
            value={newPassword}
            error={passwordErrors.newPassword}
            hint={t.auth.passwordHint}
            onChange={(event) => setNewPassword(event.target.value)}
          />

          <Field
            label={t.auth.confirmPassword}
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={savingPassword}
              className="rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-black text-[#202124] shadow-sm transition hover:bg-[#f4c430] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {savingPassword ? t.auth.pleaseWait : t.auth.changePasswordCta}
            </button>
          </div>
        </form>
      </Card>

      <Card
        title={t.auth.connectedAccounts}
        description={t.auth.connectedAccountsDesc}
      >
        <FormAlert message={linkError} />

        <div className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-slate-50 px-4 py-3 darkmode:border-white/10 darkmode:bg-white/[0.04]">
          <span className="flex items-center gap-2.5 text-sm font-black text-slate-800 darkmode:text-slate-100">
            <GoogleIcon />
            Google
          </span>

          {googleLinked ? (
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-700 darkmode:border-emerald-500/40 darkmode:bg-transparent darkmode:text-emerald-300">
              {t.auth.googleLinked}
            </span>
          ) : null}
        </div>

        {googleLinked ? null : (
          <div className="mt-3">
            <GoogleButton
              label={t.auth.linkGoogle}
              href="/api/auth/google?from=/profile&returnTo=%2Fprofile"
            />
          </div>
        )}
      </Card>

      <Card title={t.auth.sessions} description={t.auth.sessionsDesc}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={async () => {
              await signOut({ all: true });
              router.push("/login");
            }}
            className="rounded-xl border border-red-300 bg-white px-5 py-2.5 text-sm font-black text-red-600 transition hover:bg-red-50 darkmode:border-red-500/40 darkmode:bg-transparent darkmode:text-red-300 darkmode:hover:bg-red-500/10"
          >
            {t.auth.signOutEverywhere}
          </button>
        </div>
      </Card>
    </div>
  );
}
