'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LogIn } from 'lucide-react';
import { signIn } from '@/lib/auth-client';

export function AdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

  try {
      const { error: signInError } = await signIn.email({
        email: email.trim().toLowerCase(),
        password,
      });

      if (signInError) {
        setError(signInError.message || 'Invalid admin credentials.');
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
   };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#1B3A5C] flex items-center justify-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#2D5F5D]" />
          Administrative Sign In
        </h3>
        <p className="text-gray-500 text-xs mt-1">
          Authorized personnel only. No public registration.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 font-medium">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[#FAF8F5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-sm outline-none"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-[#2D5F5D] hover:bg-[#204543] text-white font-medium rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <LogIn className="w-4 h-4" />
            Sign In
          </>
        )}
      </button>
    </form>
  );
}
