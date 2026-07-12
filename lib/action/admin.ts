'use server';

import { hashPassword } from 'better-auth/crypto';
import { count } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { timingSafeEqual } from 'node:crypto';
import { db } from '@/lib/db';
import { account, user } from '@/lib/db/schema';

export type CreateFirstAdminState = {
  success: boolean;
  message: string;
};

export async function getAdminCount() {
  const [result] = await db.select({ value: count() }).from(user);
  return result?.value ?? 0;
}

export async function hasAdmins() {
  return (await getAdminCount()) > 0;
}

export async function createFirstAdminAction(
  _prevState: CreateFirstAdminState,
  formData: FormData,
): Promise<CreateFirstAdminState> {
  const submittedSetupToken = getString(formData, 'setupToken');
  const configuredSetupToken = process.env.ADMIN_SETUP_TOKEN?.trim() ?? '';

  if (!hasMatchingSetupToken(submittedSetupToken, configuredSetupToken)) {
    return {
      success: false,
      message: 'Invalid admin setup token.',
    };
  }

  const name = getString(formData, 'name');
  const email = getString(formData, 'email').toLowerCase();
  const password = getString(formData, 'password');

  if (!name || !email || !password) {
    return {
      success: false,
      message: 'Name, email, and password are required.',
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      message: 'Password must be at least 8 characters.',
    };
  }

  const userId = crypto.randomUUID();
  const passwordHash = await hashPassword(password);

  try {
    const bootstrapResult = (await db.execute(sql`
      WITH bootstrap_lock AS (
        SELECT pg_advisory_xact_lock(918273645)
      ),
      existing_admin_count AS (
        SELECT count(*)::int AS value FROM ${user}
      ),
      existing_user AS (
        SELECT id FROM ${user}
        WHERE ${user.email} = ${email}
        LIMIT 1
      ),
      inserted_user AS (
        INSERT INTO ${user} (id, name, email, email_verified)
        SELECT ${userId}, ${name}, ${email}, true
        WHERE (SELECT value FROM existing_admin_count) = 0
          AND NOT EXISTS (SELECT 1 FROM existing_user)
        RETURNING id
      ),
      inserted_account AS (
        INSERT INTO ${account} (id, account_id, provider_id, user_id, password)
        SELECT ${crypto.randomUUID()}, ${userId}, 'credential', ${userId}, ${passwordHash}
        FROM inserted_user
        RETURNING id
      )
      SELECT
        (SELECT value FROM existing_admin_count) AS admin_count,
        EXISTS(SELECT 1 FROM existing_user) AS existing_user_found,
        EXISTS(SELECT 1 FROM inserted_user) AS inserted_user_created,
        EXISTS(SELECT 1 FROM inserted_account) AS inserted_account_created
    `)) as {
      rows: Array<{
        admin_count: number;
        existing_user_found: boolean;
        inserted_user_created: boolean;
        inserted_account_created: boolean;
      }>;
    };

    const bootstrapRow = bootstrapResult.rows[0];

    if (!bootstrapRow) {
      return {
        success: false,
        message: 'Could not create the admin account. Please try again.',
      };
    }

    if (bootstrapRow.admin_count > 0) {
      return {
        success: false,
        message: 'An admin account already exists. Please sign in instead.',
      };
    }

    if (bootstrapRow.existing_user_found) {
      return {
        success: false,
        message: 'An account with this email already exists.',
      };
    }

    if (!bootstrapRow.inserted_user_created || !bootstrapRow.inserted_account_created) {
      return {
        success: false,
        message: 'Could not create the admin account. Please try again.',
      };
    }
  } catch (error) {
    console.error('Failed to create first admin:', error);

    return {
      success: false,
      message: 'Could not create the admin account. Please try again.',
    };
  }

  revalidatePath('/admin/login');

  return {
    success: true,
    message: 'Admin account created. You can sign in now.',
  };
}

function getString(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

function hasMatchingSetupToken(submittedToken: string, configuredToken: string) {
  if (!submittedToken || !configuredToken) {
    return false;
  }

  const submittedBuffer = Buffer.from(submittedToken);
  const configuredBuffer = Buffer.from(configuredToken);

  if (submittedBuffer.length !== configuredBuffer.length) {
    return false;
  }

  return timingSafeEqual(submittedBuffer, configuredBuffer);
}
