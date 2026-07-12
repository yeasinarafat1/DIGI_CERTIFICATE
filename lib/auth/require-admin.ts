import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export class UnauthorizedAdminError extends Error {
  constructor(message = "Unauthorized: please sign in.") {
    super(message);
    this.name = "UnauthorizedAdminError";
  }
}

/**
 * Throws if there's no valid session. Since this app has no external users,
 * anyone with a valid session is an admin.
 */
export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new UnauthorizedAdminError();
  }

  return session.user;
}
