import { fail, isSameOrigin, ok, readJsonBody } from "@/app/lib/auth/api";
import { readSession, toPublicUser } from "@/app/lib/auth/session";
import { updateUser } from "@/app/lib/auth/store";
import { validateName } from "@/app/lib/auth/validate";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const current = await readSession();

  if (!current) {
    return ok({ user: null });
  }

  return ok({ user: toPublicUser(current.user) });
}

type ProfileBody = {
  name?: unknown;
};

export async function PATCH(request: Request): Promise<Response> {
  if (!isSameOrigin(request)) {
    return fail("invalid_request");
  }

  const current = await readSession();

  if (!current) {
    return fail("not_authenticated");
  }

  const body = await readJsonBody<ProfileBody>(request);

  if (!body) {
    return fail("invalid_request");
  }

  const name = validateName(body.name);
  if (!name.ok) {
    return fail(name.error, { field: "name" });
  }

  current.user.name = name.value;
  current.user.updatedAt = new Date().toISOString();
  await updateUser(current.user);

  return ok({ user: toPublicUser(current.user) });
}
