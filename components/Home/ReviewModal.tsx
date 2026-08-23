/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Star, Check, Sparkles, User, Building, BookOpen } from 'lucide-react';
import { StudentReview, Course } from '@/types';

interface ReviewModalProps {
  isOpen: boolean;
  courses: Course[];
  onClose: () => void;
  onSubmitReview: (review: StudentReview) => void;
}

export default function ReviewModal({
  isOpen,
  courses,
  onClose,
  onSubmitReview
}: ReviewModalProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [courseName, setCourseName] = useState(courses[0]?.title || 'Advanced MS Excel & Business Analytics');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !reviewText) return;

    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    const newReview: StudentReview = {
      id: `rev-${Date.now()}`,
      name,
      role: role || 'Office Executive',
      company: company || 'Corporate Alumnus',
      avatarUrl: randomAvatar,
      rating,
      courseName,
      reviewText,
      date: 'Recent Graduate',
      verifiedGraduate: true
    };

    onSubmitReview(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-fade-in">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#0E2954] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-[#E5252A] text-[#E5252A]" />
            <h3 className="text-base font-bold">Share Your Student Experience</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Thank You for Your Feedback!</h4>
            <p className="text-xs text-slate-500">Your review has been verified and published to the landing page.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Your Overall Rating
              </label>
              <div className="flex gap-2 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating ? 'fill-current' : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Andrew Williams"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0E2954]"
              />
            </div>

            {/* Role & Company */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Job Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Data Analyst / Secretary"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0E2954]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tech Corp / Studio"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0E2954]"
                />
              </div>
            </div>

            {/* Course Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Course Completed
              </label>
              <select
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0E2954] bg-white"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Review Comment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Review & Outcome *
              </label>
              <textarea
                rows={3}
                required
                placeholder="How did DigiLearning help your career, speed, or computer confidence?"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0E2954]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#E5252A] hover:bg-[#CC1E23] text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Post Review
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
