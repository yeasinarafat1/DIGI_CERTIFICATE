/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  X, 
  Star, 
  Users, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Mail, 
  Briefcase, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Mentor, Course } from '@/types';

interface MentorModalProps {
  mentor: Mentor | null;
  courses: Course[];
  onClose: () => void;
  onSelectCourse: (course: Course) => void;
}

export default function MentorModal({
  mentor,
  courses,
  onClose,
  onSelectCourse
}: MentorModalProps) {
  if (!mentor) return null;

  const mentorCourses = courses.filter(c => c.instructorName.toLowerCase().includes(mentor.name.toLowerCase().split(' ')[0]) || c.instructorId === mentor.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
        
        {/* Pastel Header with Mentor Photo */}
        <div 
          className="p-6 sm:p-8 relative flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-black/5"
          style={{ backgroundColor: mentor.bgColor }}
        >
          <img
            src={mentor.imageUrl}
            alt={mentor.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white shadow-md"
          />

          <div className="text-center sm:text-left flex-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0E2954] bg-white/90 px-3 py-1 rounded-full shadow-xs">
              {mentor.role}
            </span>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
              {mentor.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
              {mentor.title} • {mentor.experience}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-700">
              <span className="flex items-center gap-1 font-bold">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                {mentor.studentsTaught}+ Students Coached
              </span>
              <span className="flex items-center gap-1 font-bold text-amber-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {mentor.rating.toFixed(1)} / 5.0 Rating
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* Biography */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Instructor Biography
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {mentor.bio}
            </p>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Core Specialties & Software Mastery
            </h4>
            <div className="flex flex-wrap gap-2">
              {mentor.specialties.map((item) => (
                <span 
                  key={item}
                  className="text-xs font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>

          {/* Courses Taught by This Mentor */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Courses Taught by {mentor.name}
            </h4>
            <div className="space-y-2.5">
              {(mentorCourses.length > 0 ? mentorCourses : courses.slice(0, 2)).map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onClose();
                    onSelectCourse(c);
                  }}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-[#0E2954] bg-slate-50/60 hover:bg-white transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: c.bgColor }}
                    >
                      <BookOpen className="w-4 h-4 text-slate-700" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 group-hover:text-[#0E2954]">
                        {c.title}
                      </h5>
                      <span className="text-[11px] text-slate-500">
                        {c.classesCount} Classes • ${c.price}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#E5252A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#0E2954] hover:bg-[#091E3E] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
}
