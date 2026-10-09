import { fail, isSameOrigin, ok, readJsonBody } from "@/app/lib/auth/api";
import {
  destroyAllUserSessions,
  destroyCurrentSession,
  readSession,
} from "@/app/lib/auth/session";

type LogoutBody = {
  all?: unknown;
};

export async function POST(request: Request): Promise<Response> {
  if (!isSameOrigin(request)) {
    return fail("invalid_request");
  }

  const body = await readJsonBody<LogoutBody>(request);
  const everywhere = body?.all === true;

  if (everywhere) {
    const current = await readSession();

    if (current) {
      await destroyAllUserSessions(current.user.id);
    } else {
      await destroyCurrentSession();
    }

    return ok({});
  }

  await destroyCurrentSession();
  return ok({});
}
