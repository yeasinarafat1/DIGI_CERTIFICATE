# Progress

## Completed Work

- Added a dedicated `UnauthorizedAdminError` in [lib/auth/require-admin.ts](lib/auth/require-admin.ts) and updated `addStudentAction` in [lib/action/student.ts](lib/action/student.ts) to handle that error separately from unexpected failures.
- Updated [drizzle/20260711174828_overjoyed_tarantula/migration.sql](drizzle/20260711174828_overjoyed_tarantula/migration.sql) to backfill legacy `admins` rows into the new auth tables before dropping the old table.
- The migration preserves legacy admin identity data by creating matching `user` rows and credential `account` rows, then drops `admins` only after the backfill succeeds.
- Added a fail-fast guard in [lib/auth-client.ts](lib/auth-client.ts) so `NEXT_PUBLIC_APP_URL` must be present before `createAuthClient` runs.
- Added a first-admin bootstrap server action in [lib/action/admin.ts](lib/action/admin.ts). It creates Better Auth `user` and credential `account` rows only when no admin/user exists.
- Split the admin login page into a server-rendered gate plus client forms in [app/admin/login/page.tsx](app/admin/login/page.tsx), [app/admin/login/AdminLoginForm.tsx](app/admin/login/AdminLoginForm.tsx), and [app/admin/login/CreateAdminForm.tsx](app/admin/login/CreateAdminForm.tsx). The setup form is shown only when there are no admins.

## Validation

- Ran targeted error checks on the edited TypeScript files with no reported errors.
- Ran `git diff --check` on the migration after the final rewrite; it passed.
- Read the local Next 16 docs for Server Actions, forms, and the `use server` directive before implementing the server action flow.

## Notes

- I skipped adding a separate role backfill because the current auth schema does not contain a role table or role field to preserve.
- I chose a runtime guard for `NEXT_PUBLIC_APP_URL` because the project README does not currently document that environment variable.
- Public sign-up remains disabled in Better Auth. The bootstrap path is an internal server action and double-checks that no admin exists before creating credentials.
