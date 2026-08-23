/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Star, 
  FileSpreadsheet, 
  FileText, 
  Presentation, 
  Calculator, 
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-react';
import { HIRING_PARTNERS, INSTITUTE_STATS } from '@/utils/data';

interface HeroSectionProps {
  onSearchCourse: (category: string, hours: string) => void;
  onOpenEnroll: () => void;
}

export default function HeroSection({ onSearchCourse, onOpenEnroll }: HeroSectionProps) {
  const [selectedTopic, setSelectedTopic] = useState('Advanced Excel');
  const [selectedHours, setSelectedHours] = useState('20hrs in a Month');

  const handleStartSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchCourse(selectedTopic, selectedHours);
    const element = document.getElementById('courses');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-18 md:pb-24 overflow-hidden bg-gradient-to-b from-[#F0F5FA]/60 via-white to-white">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-100/30 via-red-100/20 to-slate-100/40 blur-3xl -z-10 pointer-events-none rounded-full" />
      
      {/* Decorative Floating Tech Pills */}
      <div className="hidden xl:flex absolute top-24 left-10 animate-float items-center gap-2 bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-2xl shadow-md border border-slate-100 text-xs font-semibold text-slate-700 pointer-events-none">
        <div className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center font-bold">
          <FileSpreadsheet className="w-4 h-4" />
        </div>
        <span>MS Excel & Pivot VLOOKUP</span>
      </div>

      <div className="hidden xl:flex absolute top-36 right-12 animate-float [animation-delay:2s] items-center gap-2 bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-2xl shadow-md border border-slate-100 text-xs font-semibold text-slate-700 pointer-events-none">
        <div className="w-7 h-7 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold">
          <FileText className="w-4 h-4" />
        </div>
        <span>MS Word Documentation</span>
      </div>

      <div className="hidden xl:flex absolute bottom-28 left-16 animate-float [animation-delay:1s] items-center gap-2 bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-2xl shadow-md border border-slate-100 text-xs font-semibold text-slate-700 pointer-events-none">
        <div className="w-7 h-7 bg-red-100 text-red-700 rounded-lg flex items-center justify-center font-bold">
          <Calculator className="w-4 h-4" />
        </div>
        <span>TallyPrime & Accounts</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main Display Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Advance your <span className="text-[#0E2954]">office & computer skills</span> with <span className="text-[#E5252A]">DigiLearning</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Build practical, career-ready computer skills and learn from certified corporate mentors with 100% job placement support.
        </p>

        {/* Google Rating Pill with 5 Avatars matching the demo */}
        <div className="mt-7 inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200/80">
          <div className="flex -space-x-2 overflow-hidden">
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Student" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Student" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Student" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Student" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
            <span className="font-bold text-sm">4.9</span>
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-slate-500 font-normal ml-1">Rated by {INSTITUTE_STATS.totalReviews} on Google</span>
          </div>
        </div>

        {/* Hero Interactive Search/Filter Widget */}
        <div className="mt-9 sm:mt-12 max-w-3xl mx-auto bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/90">
          <form onSubmit={handleStartSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Field 1: What do you want to learn? */}
            <div className="sm:col-span-5 text-left px-3 py-1">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                What do you want to learn?
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full mt-1 bg-transparent font-semibold text-slate-800 text-sm focus:outline-none cursor-pointer py-1"
              >
                <option value="All">All Office Applications</option>
                <option value="Advanced Excel">Advanced MS Excel & BI</option>
                <option value="Office Documentation">MS Word & Documentation</option>
                <option value="Accounting & Tally">Computerized Accounting & Tally</option>
                <option value="MS Office Suite">MS PowerPoint & Presentations</option>
                <option value="Typing & Speed">Touch Typing & Speed Booster</option>
                <option value="MS Office Suite">Complete Office Career Diploma</option>
              </select>
            </div>

            <div className="hidden sm:block sm:col-span-1 h-8 border-r border-slate-200 my-auto" />

            {/* Field 2: Hours you going to invest? */}
            <div className="sm:col-span-4 text-left px-3 py-1">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Hours you going to invest?
              </label>
              <select
                value={selectedHours}
                onChange={(e) => setSelectedHours(e.target.value)}
                className="w-full mt-1 bg-transparent font-semibold text-slate-800 text-sm focus:outline-none cursor-pointer py-1"
              >
                <option value="10hrs in a Month">10hrs in a Month (Light)</option>
                <option value="20hrs in a Month">20hrs in a Month (Standard)</option>
                <option value="40hrs in a Month">40hrs in a Month (Intensive)</option>
                <option value="Weekend Fast-Track">Weekend Fast-Track</option>
              </select>
            </div>

            {/* Field 3: Start Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                id="hero-start-btn"
                className="w-full py-3 sm:py-3.5 px-6 bg-[#E5252A] hover:bg-[#CC1E23] text-white font-semibold text-sm rounded-xl sm:rounded-2xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-1.5"
              >
                <span>Start</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

        {/* Mini Quick Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            100% Practical Computer Lab
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Verifiable QR Certificate
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#E5252A]" />
            Job Placement Cell Assistance
          </span>
        </div>

      </div>

      {/* Social Proof Partners Logo Bar */}
      <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Trusted by companies and corporate hiring partners
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all">
            {HIRING_PARTNERS.map((partner) => (
              <div key={partner.name} className="flex items-center gap-2 font-display text-lg sm:text-xl font-bold text-slate-700 tracking-tight">
                <span className="w-2 h-2 rounded-full bg-[#E5252A]" />
                <span>{partner.logoText}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
