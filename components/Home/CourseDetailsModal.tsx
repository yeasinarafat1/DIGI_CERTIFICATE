/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
  Users
} from 'lucide-react';
import { Course } from '@/types';

interface CourseDetailsModalProps {
  course: Course | null;
  onClose: () => void;
 
}

export default function CourseDetailsModal({
  course,
  onClose,
 
}: CourseDetailsModalProps) {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
        
        {/* Pastel Header */}
        <div 
          className="p-6 sm:p-8 relative flex items-center justify-between border-b border-black/5"
          style={{ backgroundColor: course.bgColor || '#FCECD8' }}
        >
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0E2954] bg-white/90 px-3 py-1 rounded-full shadow-xs">
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
            className="absolute top-6 right-6 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-xs transition-colors"
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
                <span>{course.rating.toFixed(1)}</span>
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

        </div>

      </div>
    </div>
  );
}
