import type { Metadata } from "next";

import { LoginForm } from "@/app/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in - ToolsGift",
  description:
    "Sign in to your ToolsGift account to manage your profile, password and settings.",
  robots: { index: false, follow: false },
};

/**
 * Only same-site absolute paths are allowed as post-login destinations so
 * this can never be used as an open redirect.
 */
function safeNextPath(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;

  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) {
    return "/profile";
  }

  return raw;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const errorCode = Array.isArray(params.error) ? params.error[0] : params.error;

  return (
    <LoginForm
      nextPath={safeNextPath(params.next)}
      errorCode={errorCode || undefined}
    />
  );
}
