/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Monitor, 
  FileSpreadsheet, 
  FileCheck, 
  Users, 
  Briefcase, 
  Award, 
  CheckCircle, 
  Keyboard, 
  BarChart3, 
  Sparkles,
  Layers
} from 'lucide-react';
import { INSTITUTE_NAME, INSTITUTE_TAGLINE } from '@/utils/index';
import { INSTITUTE_STATS } from '@/utils/data';

export default function AboutSection() {
  const highlights = [
    {
      icon: Monitor,
      title: '1-to-1 Practical PC Lab',
      desc: 'Each student is assigned their own high-spec desktop workstation. Practice directly in Microsoft 365, Tally, and Google Workspace environments.',
      badge: 'Individual Station'
    },
    {
      icon: FileSpreadsheet,
      title: 'Corporate Excel & Data Analysis',
      desc: 'From simple sums to advanced dynamic formulas (XLOOKUP, nested conditions, pivot charts, macros, and financial summaries).',
      badge: 'High Demand'
    },
    {
      icon: FileCheck,
      title: 'Executive Documentation & Formatting',
      desc: 'Professional business letter drafting, mail merge, legal contracts, table of contents indexing, and official corporate styling in MS Word.',
      badge: 'Essential'
    },
    {
      icon: Keyboard,
      title: 'Bilingual Touch Typing Mastery',
      desc: 'Double your typing speed with ergonomics, shortcut key muscle memory, and flawless English & Bengali typing accuracy benchmarks.',
      badge: 'Speed Booster'
    },
    {
      icon: BarChart3,
      title: 'Computerized Accounting & Tally',
      desc: 'Master commercial accounting entries, inventory management, invoice generation, VAT/Tax deductions, and balance sheets.',
      badge: 'Finance Track'
    },
    {
      icon: Briefcase,
      title: 'Dedicated Job Placement Cell',
      desc: 'Resume rebuilding, mock interviews, office aptitude testing, and direct interviews scheduled with 45+ hiring partner organizations.',
      badge: 'Guaranteed Prep'
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50/50 border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E2954]/10 text-[#0E2954] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E5252A]" />
            About DigiLearning Institute
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What We Do & Why Students Excel With Us
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            At <span className="font-semibold text-slate-900">{INSTITUTE_NAME}</span>, we bridge the gap between academic theory and practical corporate demand. We train students, job seekers, and office professionals in hands-on computer and administrative applications.
          </p>
        </div>

        {/* Live Metrics / How many students finished the course */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-black text-[#0E2954]">
              {INSTITUTE_STATS.graduatedStudents}
            </div>
            <div className="mt-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Graduated Students
            </div>
            <div className="mt-2 text-[11px] text-emerald-600 font-semibold flex items-center justify-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Finished All Modules
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-black text-[#E5252A]">
              {INSTITUTE_STATS.placementRate}
            </div>
            <div className="mt-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Job Placement Rate
            </div>
            <div className="mt-2 text-[11px] text-slate-500 font-medium">
              Within 60 days of graduation
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-black text-[#0E2954]">
              {INSTITUTE_STATS.hiringPartners}
            </div>
            <div className="mt-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Hiring Corporate Partners
            </div>
            <div className="mt-2 text-[11px] text-slate-500 font-medium">
              Banks, MNCs & IT Firms
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-black text-amber-500">
              {INSTITUTE_STATS.googleRating}
            </div>
            <div className="mt-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Google Student Rating
            </div>
            <div className="mt-2 text-[11px] text-slate-500 font-medium">
              Over {INSTITUTE_STATS.totalReviews} verified reviews
            </div>
          </div>
        </div>

        {/* 6 Feature Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#0E2954]/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#0E2954]/10 text-[#0E2954] flex items-center justify-center group-hover:bg-[#0E2954] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>
                
                <h3 className="mt-5 text-lg font-bold text-slate-900 group-hover:text-[#0E2954] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
