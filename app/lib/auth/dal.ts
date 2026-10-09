import { cache } from "react";
import { redirect } from "next/navigation";

import { readSession, toPublicUser } from "./session";
import type { PublicUser, SessionRecord } from "./types";

/**
 * Data Access Layer. Every protected page/action must go through these
 * helpers so authorization is checked close to the data.
 */
export const getSessionUser = cache(async (): Promise<{
  user: PublicUser;
  session: SessionRecord;
} | null> => {
  const result = await readSession({ allowCookieWrite: false });

  if (!result) {
    return null;
  }

  return { user: toPublicUser(result.user), session: result.session };
});

export async function requireSessionUser(nextPath: string): Promise<{
  user: PublicUser;
  session: SessionRecord;
}> {
  const result = await getSessionUser();

  if (!result) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  return result;
}
