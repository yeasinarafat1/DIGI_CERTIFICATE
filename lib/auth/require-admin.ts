import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Throws if there's no valid session. Since this app has no external users,
 * anyone with a valid session is an admin.
 */
export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error("Unauthorized: please sign in.");
  }

  return session.user;
}
