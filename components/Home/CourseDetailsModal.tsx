'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useTransition } from 'react';
import { 
  X, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Star, 
  Award, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Monitor,
  Users,
  PlayCircle,
  Loader2,
  Copy,
  Check
} from 'lucide-react';
import { Course } from '@/types';
import { verifyStudentAccess } from '@/lib/action/certificate'; // Adjust path as needed

interface CourseDetailsModalProps {
  course: Course | null;
  onClose: () => void;
}

export default function CourseDetailsModal({
  course,
  onClose,
}: CourseDetailsModalProps) {
  // Verification states
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  const [isPending, startTransition] = useTransition();

  if (!course) return null;

  // Handlers
  const handleVerify = () => {
    setVerifyError(null);
    
    startTransition(async () => {
      const result = await verifyStudentAccess(studentId, course.title);
      
      if (result.success && result.url) {
        setPlaylistUrl(result.url);
      } else {
        setVerifyError(result.message);
      }
    });
  };

  const handleCopyLink = () => {
    if (playlistUrl) {
      navigator.clipboard.writeText(playlistUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleCloseVerifyModal = () => {
    setIsVerifyModalOpen(false);
    // Reset states after closing animation frame
    setTimeout(() => {
      setStudentId('');
      setVerifyError(null);
      setPlaylistUrl(null);
      setIsCopied(false);
    }, 200);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
          
          {/* Pastel Header */}
          <div 
            className="p-6 sm:p-8 relative flex items-center justify-between border-b border-black/5"
            style={{ backgroundColor: course.bgColor || '#FCECD8' }}
          >
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0E2954] bg-white/90 px-3 py-1 rounded-full shadow-sm">
                {course.category} • {course.level} Level
              </span>
              <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {course.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 max-w-md font-medium">
                Instructor: <span className="font-bold">{course.instructorName}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <div>
                <div className="text-xs font-semibold text-slate-400">Total Classes</div>
                <div className="text-base font-bold text-slate-800">{course.classesCount} Classes</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400">Lab Hours</div>
                <div className="text-base font-bold text-slate-800">{course.hoursCount} Hours</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400">Rating</div>
                <div className="text-base font-bold text-amber-600 flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{Number(course.rating).toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Course Overview
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Syllabus Modules */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Curriculum & Hands-on Modules
              </h4>
              <div className="space-y-2.5">
                {course.syllabus.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs text-slate-800 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="p-4 rounded-2xl bg-[#0E2954]/5 border border-[#0E2954]/10 space-y-2 text-xs text-slate-700">
              <div className="font-bold text-[#0E2954] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E5252A]" />
                <span>What You Receive Upon Enrollment</span>
              </div>
              <ul className="space-y-1.5 pl-5 list-disc text-slate-600">
                <li>Individual high-speed PC station in our dedicated computer lab</li>
                <li>Official QR-verifiable certificate recognized by partner employers</li>
                <li>Free lifetime access to classroom templates and formula cheat-sheets</li>
                <li>Direct referral to corporate hiring cell upon course completion</li>
              </ul>
            </div>

          </div>

          {/* Modal Footer CTA */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Tuition Investment</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#0E2954]">৳{course.price}</span>
                {course.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">৳{course.originalPrice}</span>
                )}
              </div>
            </div>
            
            {/* New Verification Trigger Button */}
            <button 
              onClick={() => setIsVerifyModalOpen(true)}
              className="px-6 py-3 bg-[#E5252A] hover:bg-[#CC1E23] text-white text-sm font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Access Course Videos</span>
            </button>
          </div>

        </div>
      </div>

      {/* --- NESTED VERIFICATION MODAL --- */}
      {isVerifyModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col ring-1 ring-slate-900/5">
            
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                Student Verification
              </h3>
              <button 
                onClick={handleCloseVerifyModal}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {!playlistUrl ? (
                /* Verification Step */
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">
                    To access the video lectures for <span className="font-semibold text-slate-800">{course.title}</span>, please enter your official Student ID.
                  </p>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Student ID Number
                    </label>
                    <input 
                      type="text" 
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. DGL-2026-1001"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        verifyError 
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 bg-rose-50/30' 
                          : 'border-slate-200 focus:border-[#0E2954] focus:ring-[#0E2954]/20 bg-slate-50'
                      }`}
                    />
                    {verifyError && (
                      <p className="text-xs font-medium text-rose-500 mt-1">{verifyError}</p>
                    )}
                  </div>

                  <button 
                    onClick={handleVerify}
                    disabled={isPending || !studentId.trim()}
                    className="w-full mt-2 py-3 bg-[#0E2954] hover:bg-[#091E3E] text-white text-sm font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying Record...
                      </>
                    ) : (
                      'Verify Enrollment'
                    )}
                  </button>
                </div>
              ) : (
                /* Success Step */
                <div className="text-center space-y-5 py-2">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-slate-800">Verification Successful!</h4>
                    <p className="text-sm text-slate-500 mt-1">Your access link has been generated below.</p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3">
                    <div className="truncate text-xs font-medium text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-100 w-full text-left">
                      {playlistUrl}
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className="p-2 shrink-0 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors shadow-sm"
                      title="Copy Link"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <a 
                    href={playlistUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#E5252A] hover:bg-[#CC1E23] text-white text-sm font-bold rounded-xl shadow-sm transition-colors"
                  >
                    Open Playlist <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}