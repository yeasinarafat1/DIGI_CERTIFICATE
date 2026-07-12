'use server';

import { hashPassword } from 'better-auth/crypto';
import { count, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
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

  const existingAdminCount = await getAdminCount();

  if (existingAdminCount > 0) {
    return {
      success: false,
      message: 'An admin account already exists. Please sign in instead.',
    };
  }

  const [existingUser] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existingUser) {
    return {
      success: false,
      message: 'An account with this email already exists.',
    };
  }

  const userId = crypto.randomUUID();
  const passwordHash = await hashPassword(password);

  try {
    await db.insert(user).values({
      id: userId,
      name,
      email,
      emailVerified: true,
    });

    await db.insert(account).values({
      id: crypto.randomUUID(),
      accountId: userId,
      providerId: 'credential',
      userId,
      password: passwordHash,
    });
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
