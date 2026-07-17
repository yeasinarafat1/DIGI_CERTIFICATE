import React from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { formatDate, TRAINING_CENTER_NAME } from '@/utils';
import { Certificate, Student } from '@/lib/db/schema'; // Ensure this matches your schema import

export default function StudentCertificate({ data }: { data: Certificate }) {
  return (
    <div 
      id="certificate-print-area"
      className="w-full bg-white text-gray-800 p-6 md:p-10 relative rounded-2xl shadow-xl border-4 md:border-8 border-[#1B3A5C] select-none font-sans"
      style={{ backgroundImage: "radial-gradient(circle, #FAF8F5 0%, #FFFFFF 100%)" }}
    >
      <div className="absolute inset-1.5 md:inset-2.5 border border-dashed border-[#1B3A5C]/20 pointer-events-none rounded-xl" />
      <div className="absolute inset-3 md:inset-4 border border-[#1B3A5C]/10 pointer-events-none rounded-lg" />
      
      <div className="absolute top-2.5 left-2.5 w-6 h-6 border-t-2 border-l-2 border-[#1B3A5C]" />
      <div className="absolute top-2.5 right-2.5 w-6 h-6 border-t-2 border-r-2 border-[#1B3A5C]" />
      <div className="absolute bottom-2.5 left-2.5 w-6 h-6 border-b-2 border-l-2 border-[#1B3A5C]" />
      <div className="absolute bottom-2.5 right-2.5 w-6 h-6 border-b-2 border-r-2 border-[#1B3A5C]" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-100 relative z-10 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md">
            <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-[#1B3A5C] tracking-tight">{TRAINING_CENTER_NAME}</h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-wide">Suagazi Bazar, Sadar South, Cumilla-3504</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#1E8449]/10 text-[#1E8449] px-3 py-1 rounded-full text-[10px] font-bold border border-[#1E8449]/20 uppercase tracking-widest shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" /> Verified
        </div>
      </div>

      <div className="py-6 space-y-6 text-center relative z-10">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#2D5F5D] tracking-widest block">Certificate of Achievement</span>
          <p className="text-xs text-gray-500 italic">This is to officially certify that</p>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B3A5C] tracking-wide">{data.name}</h2>
          <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-[#2D5F5D]/30 to-transparent mx-auto" />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-gray-500 italic">has successfully completed the training program in</p>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 px-4 leading-snug">{data.courseName}</h3>
          <p className="text-xs font-semibold text-[#1B3A5C]">Conducted by {TRAINING_CENTER_NAME} IT</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 relative z-10 text-xs text-gray-600 bg-[#FAF8F5]/50 p-4 rounded-xl border border-gray-100">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Credential ID</span>
          <span className="font-mono font-bold text-[#1B3A5C] bg-[#1B3A5C]/5 px-2 py-0.5 rounded inline-block">{data.certificateId}</span>
        </div>
        <div className="space-y-1 text-center">
          <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Training Period</span>
          <span className="font-semibold text-gray-800">{formatDate(data.startDate)} - {formatDate(data.endDate)}</span>
        </div>
        <div className="space-y-1 text-center sm:text-right">
          <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Authorized Authority</span>
          <span className="font-bold text-gray-800 block">Ataher Jamil</span>
        </div>
      </div>
    </div>
  );
}