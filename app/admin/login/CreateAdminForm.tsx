'use client';

import { useActionState } from 'react';
import { ShieldPlus, UserPlus } from 'lucide-react';
import {
  createFirstAdminAction,
  type CreateFirstAdminState,
} from '@/lib/action/admin';

const createFirstAdminInitialState: CreateFirstAdminState = {
  success: false,
  message: '',
};

export function CreateAdminForm() {
  const [state, formAction, pending] = useActionState(
    createFirstAdminAction,
    createFirstAdminInitialState,
  );

  return (
    <form action={formAction} className="p-8 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1B3A5C] flex items-center justify-center gap-2">
          <ShieldPlus className="w-5 h-5 text-[#2D5F5D]" />
          Create First Admin
        </h3>
        <p className="text-gray-500 text-xs mt-1">
          No admin account exists yet. Create the first one to continue.
        </p>
      </div>

      {state.message && (
        <div
          className={`text-xs p-3 rounded-lg border font-medium ${
            state.success
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
              : 'bg-red-50 text-red-600 border-red-100'
          }`}
        >
          {state.message}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 bg-[#FAF8F5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-sm outline-none"
            placeholder="Admin name"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 bg-[#FAF8F5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-sm outline-none"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={8}
            required
            className="w-full px-4 py-3 bg-[#FAF8F5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-sm outline-none"
            placeholder="At least 8 characters"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending || state.success}
        className="w-full py-3 bg-[#2D5F5D] hover:bg-[#204543] text-white font-medium rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {pending ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            Create Admin
          </>
        )}
      </button>
    </form>
  );
}
