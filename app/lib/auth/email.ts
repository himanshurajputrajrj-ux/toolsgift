type ResetEmailPayload = {
  to: string;
  name: string;
  resetUrl: string;
};

/**
 * Password reset delivery.
 *
 * Uses the Resend HTTP API directly so no extra dependency is required.
 * Configure `RESEND_API_KEY` and `AUTH_EMAIL_FROM` to enable delivery in
 * production. Without them the reset link is only logged in development so
 * the flow stays testable locally, and the API still answers generically to
 * avoid account enumeration.
 */
export async function sendPasswordResetEmail(
  payload: ResetEmailPayload
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_EMAIL_FROM;

  if (apiKey && from) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [payload.to],
        subject: "Reset your ToolsGift password",
        text: [
          `Hi ${payload.name},`,
          "",
          "Use the link below to choose a new ToolsGift password.",
          "This link expires in 15 minutes.",
          "",
          payload.resetUrl,
          "",
          "If you did not request this, you can safely ignore this email.",
        ].join("\n"),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(
        `[auth] Password reset email failed with status ${response.status}`
      );
    }

    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(`[auth] Password reset link for ${payload.to}: ${payload.resetUrl}`);
    return;
  }

  console.warn(
    "[auth] RESEND_API_KEY/AUTH_EMAIL_FROM are not configured; password reset email was not delivered."
  );
}
