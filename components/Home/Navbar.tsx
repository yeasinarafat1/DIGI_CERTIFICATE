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
    { label: 'Enrollment Steps', href: '#steps' },
    { label: 'Mentors', href: '#mentors' },
    
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center group">
            <img src="/HERO SECTION-01.svg" className='w-[150px] h-auto' alt="" />
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

         

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            
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
          
        </div>
      )}
    </header>
  );
}
