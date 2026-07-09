"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  Award, 
  ShieldCheck, 
  AlertCircle, 
  Compass, 
  ArrowLeft, 
  CheckCircle2 
} from 'lucide-react';

// Adjusted imports

import { formatDate, TRAINING_CENTER_NAME } from '@/utils';
import { getStudentByStudentIdAction } from '@/lib/action/student';
import { Student } from '@/lib/db/schema';

export default function PublicVerifyPage() {
  const router = useRouter();
  const params = useParams();
  
  // Extract ID from URL catch-all segment (e.g. /verify/ST-2026-001)
  const rawId = params?.id;
  const urlId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [student, setStudent] = useState<Student | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyCredential = async () => {
      // 1. If no ID is provided in the URL, redirect back to the search page
      if (!urlId) {
        router.replace('/');
        return;
      }

      // 2. Call the Server Action to find the specific student
      const result = await getStudentByStudentIdAction(urlId);
      
      if (result.success) {
        setStudent(result.data as unknown as Student);
        setError(null);
      } else {
        setStudent(null);
        setError(result.message!);
      }
      
      setIsLoaded(true);
    };

    verifyCredential();
  }, [urlId, router]);

  // Prevent UI flickering while loading
  if (!isLoaded && urlId) return null;

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden px-4 py-8">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8785A] opacity-[0.07] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8FBC9A] opacity-[0.07] rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

      {/* Header */}
      <header className="max-w-2xl mx-auto w-full flex items-center justify-between mb-8 relative z-10">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-xs font-semibold text-[#1B3A5C] hover:text-[#2D5F5D] transition-colors bg-white/60 hover:bg-white px-3.5 py-2 rounded-xl border border-gray-100 backdrop-blur-sm cursor-pointer shadow-sm"
        >
          <Compass className="w-3.5 h-3.5" />
          Home / Search
        </button>

        <button
          onClick={() => router.push('/admin/login')}
          className="text-xs font-semibold text-[#2D5F5D] hover:text-[#1B3A5C] transition-colors bg-white/60 hover:bg-white px-3.5 py-2 rounded-xl border border-gray-100 backdrop-blur-sm cursor-pointer shadow-sm"
        >
          Admin Portal
        </button>
      </header>

      <div className="flex-1 flex items-center justify-center max-w-lg mx-auto w-full relative z-10 mb-8">
        
        {/* CASE 1: Student Found */}
        {student ? (
          <div className="w-full max-w-2xl space-y-6 animate-fade-in">
            <div className="bg-[#1E8449] text-white rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#8FBC9A]" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-bold text-sm tracking-wide">Official Credential Verified</h3>
                  <p className="text-xs text-white/80">Registered and Active Record Found.</p>
                </div>
              </div>
              <div className="bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono font-bold">
                ID: {student.studentId}
              </div>
            </div>

            {/* Certificate Graphic */}
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
                  <div className="w-12 h-12 bg-[#1B3A5C] rounded-xl flex items-center justify-center shrink-0 shadow-md">
                    <Award className="w-7 h-7 text-[#8FBC9A]" />
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
                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B3A5C] tracking-wide">{student.name}</h2>
                  <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-[#2D5F5D]/30 to-transparent mx-auto" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 italic">has successfully completed the training program in</p>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 px-4 leading-snug">{student.courseName}</h3>
                  <p className="text-xs font-semibold text-[#1B3A5C]">Conducted by {TRAINING_CENTER_NAME}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 relative z-10 text-xs text-gray-600 bg-[#FAF8F5]/50 p-4 rounded-xl border border-gray-100">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Credential ID</span>
                  <span className="font-mono font-bold text-[#1B3A5C] bg-[#1B3A5C]/5 px-2 py-0.5 rounded inline-block">{student.studentId}</span>
                </div>
                <div className="space-y-1 text-center">
                  <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Cohort Period</span>
                  <span className="font-semibold text-gray-800">{formatDate(student.startDate)} - {formatDate(student.endDate)}</span>
                </div>
                <div className="space-y-1 text-center sm:text-right">
                  <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Authorized Authority</span>
                  <span className="font-bold text-gray-800 block">Ataher Jamil</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-[#2D5F5D] hover:bg-[#204543] text-white font-semibold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" /> Print / Save as PDF
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Verify Another
              </button>
            </div>
          </div>
        ) : (
          /* CASE 2: Record Not Found */
          <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-8 text-center space-y-6 animate-fade-in">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-2">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-800 tracking-tight">Record Not Found</h3>
              <p className="text-xs text-gray-500 leading-relaxed px-4">
                No certificate matches the identifier: <span className="font-mono font-bold text-red-600">{urlId}</span>.
              </p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="w-full py-2.5 bg-[#2D5F5D] hover:bg-[#204543] text-white font-semibold rounded-xl text-xs transition-all shadow-sm"
            >
              Return to Search
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-[10px] text-gray-400 relative z-10 max-w-md mx-auto">
        <p>© 2026 {TRAINING_CENTER_NAME}. All rights reserved.</p>
      </footer>
    </div>
  );
}