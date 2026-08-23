/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck, 
  PlusCircle, 
  UserCheck, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { INSTITUTE_NAME } from '@/utils/index';
import Logo from './Logo';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenEnroll: (courseTitle?: string) => void;
}

export default function Navbar({ onOpenAdmin, onOpenEnroll }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Courses', href: '#courses' },
    { label: 'What We Do', href: '#about' },
    { label: 'Steps & Offers', href: '#steps' },
    { label: 'Mentors', href: '#mentors' },
    { label: 'Placement', href: '#placement' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center group">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-[#E5252A] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              id="navbar-admin-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-all border border-slate-200"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#0E2954]" />
              <span>Admin / Add Course</span>
            </button>

            {/* Enroll CTA */}
            <button
              onClick={() => onOpenEnroll()}
              id="navbar-enroll-btn"
              className="inline-flex items-center justify-center px-5 py-2 text-xs font-semibold text-white bg-[#E5252A] hover:bg-[#CC1E23] rounded-lg shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold border border-slate-200"
              title="Admin Mode"
            >
              Admin
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#E5252A] rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-[#0E2954]" />
              Admin Portal (Manage & Add Courses)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnroll();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#E5252A] rounded-lg shadow-sm"
            >
              Enroll in Upcoming Batch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
