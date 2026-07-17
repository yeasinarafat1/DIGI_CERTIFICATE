import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import { formatDate, TRAINING_CENTER_NAME } from '@/utils';
import { Certificate } from '@/lib/db/schema';
import Image from 'next/image';

export default function MentorCertificate({ data }: { data: Certificate }) {
  return (
    <div 
      id="certificate-print-area"
      className="w-full bg-[#FAF9F5] text-slate-800 p-4 sm:p-7 md:p-9 relative rounded-2xl shadow-2xl border-2 border-[#C5A059]/40 select-none overflow-hidden font-sans sm:aspect-[1.08/1] flex flex-col justify-between"
      style={{
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
        backgroundImage: "radial-gradient(circle at center, #FCFDFD 0%, #E6F0EB 100%)",
      }}
    >
      {/* Decorative Ornate Borders */}
      {/* Outer fine border */}
      <div className="absolute inset-1 sm:inset-2 border border-[#C5A059]/25 pointer-events-none rounded-xl" />
      
      {/* Main premium themed border */}
      <div className="absolute inset-2 sm:inset-3 md:inset-4 border-2 sm:border-[3px] md:border-4 border-[#0F4E3A] pointer-events-none rounded-lg" />
      
      {/* Inner fine borders */}
      <div className="absolute inset-3 sm:inset-5 md:inset-6 border border-[#C5A059]/30 pointer-events-none" />
      <div className="absolute inset-3.5 sm:inset-5.5 md:inset-7 border border-dashed border-[#0F4E3A]/25 pointer-events-none" />

      {/* Classic Corner Flourishes */}
      <div className="absolute top-3 left-3 w-3 h-3 sm:top-5 sm:left-5 sm:w-4 sm:h-4 md:top-6 md:left-6 md:w-5 md:h-5 border-t border-l border-[#C5A059] pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 sm:top-5 sm:right-5 sm:w-4 sm:h-4 md:top-6 md:right-6 md:w-5 md:h-5 border-t border-r border-[#C5A059] pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 sm:bottom-5 sm:left-5 sm:w-4 sm:h-4 md:bottom-6 md:left-6 md:w-5 md:h-5 border-b border-l border-[#C5A059] pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 sm:bottom-5 sm:right-5 sm:w-4 sm:h-4 md:bottom-6 md:right-6 md:w-5 md:h-5 border-b border-r border-[#C5A059] pointer-events-none" />

      {/* Security Guilloche Watermark Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-64 sm:h-64 rounded-full opacity-[0.02] border-[3px] sm:border-[4px] border-double border-[#0F4E3A] flex items-center justify-center pointer-events-none z-0">
        <div className="w-32 h-32 sm:w-52 sm:h-52 rounded-full border border-dashed border-[#0F4E3A] flex items-center justify-center">
          <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full border-[1.5px] sm:border-[2px] border-double border-[#0F4E3A] flex items-center justify-center">
            <Award className="w-8 h-8 sm:w-12 sm:h-12 opacity-5" />
          </div>
        </div>
      </div>

      {/* Top Header Section */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2.5 pb-3 sm:pb-4 border-b border-slate-200/50 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                     <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
                   </div>
          <div>
            <h1 className="text-xs sm:text-[13px] md:text-base font-bold tracking-[0.1em] sm:tracking-[0.12em] font-gothic text-[#0F4E3A]">
              {TRAINING_CENTER_NAME.toUpperCase()}
            </h1>
            <p className="text-[6px] sm:text-[8px] text-slate-400 uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium mt-0.5">
              Suagazi Bazar, Sadar South, Cumilla-3504
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-[#1E8449]/10 text-[#1E8449] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[7px] sm:text-[9px] font-bold border border-[#1E8449]/15 uppercase tracking-wider shrink-0 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified
        </div>
      </div>

      {/* Certificate Inner Details */}
      <div className="py-3 sm:py-4 md:py-5 space-y-3 sm:space-y-4 text-center relative z-10 my-auto">
        <div className="space-y-1 sm:space-y-1.5">
          <span className="text-[8px] sm:text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] sm:tracking-[0.3em] text-[#0F4E3A]">
            Certificate of Mentorship Excellence
          </span>
          <p className="text-[9px] sm:text-[11px] text-slate-400 italic">
            with high appreciation and deepest gratitude, this honor is awarded to
          </p>
        </div>

        {/* Recipient Name */}
        <div className="space-y-1 py-0.5">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-cursive text-[#C5A059] font-normal leading-tight filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
            {data.name}
          </h2>
          {/* Artistic Name Underline */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 max-w-[180px] sm:max-w-xs mx-auto mt-0.5">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent flex-1" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#C5A059]/60" />
            <div className="h-[1px] bg-gradient-to-l from-transparent via-[#C5A059]/40 to-transparent flex-1" />
          </div>
        </div>

        {/* Course/Mentorship Context */}
        <div className="space-y-2.5 sm:space-y-3">
          <p className="text-[9px] sm:text-[11px] text-slate-500 leading-relaxed max-w-md sm:max-w-lg mx-auto italic">
            for their outstanding dedication, expert leadership, and professional instruction as a technical Mentor in the field of
          </p>
          
          <h3 className="text-[11px] sm:text-xs md:text-base font-bold font-serif text-[#0F4E3A] tracking-wide py-1 px-2.5 sm:py-1.5 sm:px-4 bg-white/40 border border-slate-200/30 rounded-lg inline-block shadow-sm">
            {data.courseName}
          </h3>
          
          <p className="text-[7px] sm:text-[9px] font-bold tracking-widest uppercase text-[#0F4E3A]">
            Acknowledged and Honored by {TRAINING_CENTER_NAME}
          </p>
        </div>

        {/* Detailed Curriculum Footer */}
        <p className="text-[8px] sm:text-[9px] text-slate-400 italic max-w-md sm:max-w-lg mx-auto leading-relaxed">
          Through selfless commitment and expert guidance, they have shared valuable industry insights, fostered technological advancement, and significantly shaped the tech competency of our trainee cohorts.
        </p>
      </div>

      {/* Bottom Panel with Gold Foil Seal and Signatures */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 items-end gap-3.5 sm:gap-4 pt-3 sm:pt-4 border-t border-slate-200/50 text-[10px] sm:text-xs text-slate-600">
        
        {/* Left Column: Metadata */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="space-y-0.5">
            <span className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400 block tracking-wider">Credential ID</span>
            <span className="font-mono font-bold text-[#0F4E3A] bg-[#0F4E3A]/5 px-1.5 py-0.5 rounded border border-slate-200/60 inline-block text-[9px] sm:text-[10px]">
              {data.certificateId}
            </span>
          </div>
          
          <div className="space-y-0.5 text-[9px] sm:text-[10px]">
            <span className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400 block tracking-wider">
              Service Period
            </span>
            <p className="font-semibold text-slate-700">
              {formatDate(data.startDate)} — {formatDate(data.endDate)}
            </p>
            {/* <p className="text-[8px] sm:text-[9px] text-slate-500 font-medium">
              <span>Department:</span> {data.batchNo}
            </p> */}
          </div>
        </div>

        {/* Center Column: 3D Metallic Gold Foil Seal */}
        <div className="flex flex-col items-center justify-center relative select-none py-0.5">
          {/* Ribbon Tail 1 (Left angle) */}
          <div className="absolute top-6 w-2.5 h-8 bg-[#B8860B] origin-top rotate-[-12deg] shadow-sm pointer-events-none" 
               style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 85%, 0% 100%)" }} />
          {/* Ribbon Tail 2 (Right angle) */}
          <div className="absolute top-6 w-2.5 h-8 bg-[#926F12] origin-top rotate-[12deg] shadow-sm pointer-events-none" 
               style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 85%, 0% 100%)" }} />
          
          {/* Outer Serrated Sunburst Seal circle */}
          <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-[#FCE881] via-[#C5A059] to-[#926F12] p-[1px] shadow-md flex items-center justify-center relative z-10 border border-[#926F12]/20">
            {/* Inner serration effect */}
            <div className="w-full h-full rounded-full bg-[#D4AF37] p-0.5 flex items-center justify-center relative">
              {/* Inner gold concentric gold frame */}
              <div className="w-full h-full rounded-full border border-double border-[#FCE881]/50 flex flex-col items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-50 filter drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.15)]" />
                <span className="text-[4px] sm:text-[5px] font-sans font-bold text-yellow-50 tracking-wide">VERIFIED</span>
              </div>
            </div>
          </div>
          
          <span className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400 mt-1 tracking-wider font-semibold">Security Seal</span>
        </div>

        {/* Right Column: Signature of Authorized Authority */}
        <div className="space-y-1.5 text-center sm:text-right flex flex-col items-center sm:items-end">
          <span className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400 block tracking-wider font-semibold">Authorized Authority</span>
          
          {/* Handwritten Signature Simulator */}
          <div className="relative py-0.5 h-7 flex items-center">
            <span className="font-cursive text-xl sm:text-2xl text-slate-800 font-medium select-none -rotate-2 transform">
              Ataher Jamil
            </span>
            {/* Soft blue pen stroke simulator */}
            <div className="absolute bottom-0 right-0 w-20 sm:w-28 h-[1px] bg-[#1E3A8A]/25 -rotate-1 pointer-events-none" />
          </div>
          
          <div className="border-t border-slate-200 w-28 sm:w-36 pt-0.5 text-center sm:text-right">
            <p className="font-bold text-slate-700 text-[9px] sm:text-[10px]">Ataher Jamil</p>
            <p className="text-[7px] sm:text-[8px] text-slate-400">Co-founder & Lead Trainer</p>
          </div>
        </div>

      </div>
    </div>
  );
}