import type { Metadata } from "next";

import { SignupForm } from "@/app/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create account - ToolsGift",
  description:
    "Create a free ToolsGift account to keep your profile and settings with you across devices.",
  robots: { index: false, follow: false },
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const errorCode = Array.isArray(params.error) ? params.error[0] : params.error;

  return <SignupForm errorCode={errorCode || undefined} />;
}
