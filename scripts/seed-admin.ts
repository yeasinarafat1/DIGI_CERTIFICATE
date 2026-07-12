import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  const { auth } = await import("@/lib/auth");
  const [name, email, password] = process.argv.slice(2);

  if (!name || !email || !password) {
    console.error("Usage: npx tsx scripts/seed-admin.ts <name> <email> <password>");
    process.exit(1);
  }

  await auth.api.signUpEmail({
    body: { name, email, password },
  });

  console.log(`Admin account created for ${email}. You can now log in at /admin/login.`);
}

main().catch((err) => {
  console.error("Failed to create admin account:", err);
  process.exit(1);
});
