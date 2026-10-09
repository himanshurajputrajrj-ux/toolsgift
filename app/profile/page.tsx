import type { Metadata } from "next";

import { requireSessionUser } from "@/app/lib/auth/dal";
import { ProfilePanel } from "@/app/components/auth/ProfilePanel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your account - ToolsGift",
  description:
    "Manage your ToolsGift profile, personal information and password.",
  robots: { index: false, follow: false },
};

/**
 * Server-side guard: the Proxy only inspects the signed cookie, so a revoked
 * session must be rejected here before anything renders.
 *
 * `?error=` is the OAuth callback's failure signal (for example a declined
 * Google link); it is handed to the panel so the reason is shown in place.
 */
export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const errorCode = Array.isArray(params.error) ? params.error[0] : params.error;

  const { user } = await requireSessionUser("/profile");

  return (
    <ProfilePanel initialUser={user} errorCode={errorCode || undefined} />
  );
}
