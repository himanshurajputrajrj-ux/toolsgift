import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/app/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password - ToolsGift",
  description:
    "Request a secure link to reset the password of your ToolsGift account.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
