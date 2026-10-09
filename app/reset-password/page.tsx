import type { Metadata } from "next";

import { ResetPasswordForm } from "@/app/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset password - ToolsGift",
  description: "Choose a new password for your ToolsGift account.",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";

  return <ResetPasswordForm token={token} />;
}
