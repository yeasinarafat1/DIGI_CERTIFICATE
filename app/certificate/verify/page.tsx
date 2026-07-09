"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Search, Compass } from 'lucide-react';
import { TRAINING_CENTER_NAME } from '@/utils'; // Adjust path as needed

export default function SearchCertificatePage() {
  const router = useRouter();
  const [searchId, setSearchId] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      // Navigate to the dynamic verify route with the entered ID
      router.push(`/certificate/verify/${searchId.trim()}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden px-4 py-8 bg-[#FAF8F5]">
      {/* Decorative Mint & Coral Watercolor Splashes in Corners */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8785A] opacity-[0.07] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8FBC9A] opacity-[0.07] rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

      {/* Navigation and Branding Top header */}
      <header className="max-w-2xl mx-auto w-full flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1B3A5C] px-3.5 py-2">
          <Compass className="w-4 h-4 text-[#8FBC9A]" />
          {TRAINING_CENTER_NAME}
        </div>

        <button
          onClick={() => router.push('/admin/login')}
          className="text-xs font-semibold text-[#2D5F5D] hover:text-[#1B3A5C] transition-colors bg-white/60 hover:bg-white px-3.5 py-2 rounded-xl border border-gray-100 backdrop-blur-sm cursor-pointer shadow-sm"
        >
          Admin Portal
        </button>
      </header>

      {/* Main Search Card */}
      <div className="flex-1 flex items-center justify-center max-w-lg mx-auto w-full relative z-10 mb-8 animate-fade-in">
        <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-8 relative">
          
          {/* Icon & Description */}
          <div className="text-center space-y-4 mb-6">
            <div className="mx-auto w-14 h-14 bg-[#1B3A5C]/5 rounded-full flex items-center justify-center text-[#1B3A5C]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1B3A5C]">
                Public Credential Verification
              </h3>
              <p className="text-xs text-gray-500 px-2 leading-relaxed">
                Enter a unique Student/Certificate ID to instantly query our secure, authorized training registry database.
              </p>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-2" htmlFor="certificate-id">
                Student / Certificate ID
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  id="certificate-id"
                  type="text"
                  required
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="e.g. ST-2026-001"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-xs outline-none shadow-sm font-semibold"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5 px-1">
                Hint: Try <span className="font-bold text-gray-600">ST-2026-001</span> or <span className="font-bold text-gray-600">ST-2026-002</span> to test the forest green verified view!
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#2D5F5D] hover:bg-[#204543] text-white font-semibold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
            >
              <Search className="w-4 h-4" />
              Query Certificate Registry
            </button>
          </form>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="text-center text-[10px] text-gray-400 relative z-10 max-w-md mx-auto">
        <p>© 2026 {TRAINING_CENTER_NAME}. All rights reserved.</p>
        <p className="mt-1">Secured by Cryptographic Certification Registry and Instant QR Mapping.</p>
      </footer>
    </div>
  );
}