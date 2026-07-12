"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, LogIn, Award } from 'lucide-react';
import { signIn } from '@/lib/auth-client';
import { TRAINING_CENTER_NAME } from '@/utils';

export default function AdminLoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { error: signInError } = await signIn.email({
      email: email.trim(),
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message || 'Invalid admin credentials.');
      return;
    }

    router.push('/admin/dashboard');
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Decorative Mint & Coral Watercolor Splashes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8785A] opacity-[0.08] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8FBC9A] opacity-[0.08] rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative z-10">
        {/* Banner with training center styling */}
        <div className="bg-[#1B3A5C] px-6 py-8 text-center relative">
          <Link 
            href="/"
            className="absolute left-4 top-4 text-gray-300 hover:text-white text-xs flex items-center gap-1 transition-colors"
          >
            ← Public Site
          </Link>
          
          <div className="mx-auto bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
            <Award className="w-8 h-8 text-[#8FBC9A]" />
          </div>
          <h2 className="text-white text-lg font-medium tracking-wide">
            {TRAINING_CENTER_NAME}
          </h2>
          <p className="text-gray-300 text-xs mt-1">
            Certificate Verification System
          </p>
        </div>

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
      </div>
    </div>
  );
}
