import { createAuthClient } from "better-auth/react";

const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

if (!appUrl) {
  throw new Error("NEXT_PUBLIC_APP_URL is required to initialize the auth client.");
}

export const authClient = createAuthClient({
  baseURL: appUrl,
});

export const { signIn, signOut, useSession } = authClient;
