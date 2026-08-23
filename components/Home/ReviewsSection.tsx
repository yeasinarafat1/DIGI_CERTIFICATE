/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, MessageSquare, Plus, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { StudentReview } from '@/types';

interface ReviewsSectionProps {
  reviews: StudentReview[];
  onOpenAddReview: () => void;
}

export default function ReviewsSection({ reviews, onOpenAddReview }: ReviewsSectionProps) {
  const [activePageIndex, setActivePageIndex] = useState(0);

  return (
    <section id="reviews" className="py-20 bg-[#FAF8F5] border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Matching the Demo Image */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What Our Happy Students Says
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Build skills with our courses and mentor from world-class practical experts.
            </p>
          </div>

          {/* "Give Your Review" Button matching demo */}
          <button
            onClick={onOpenAddReview}
            id="reviews-give-review-btn"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#0E2954] text-[#0E2954] hover:bg-[#0E2954] hover:text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#E5252A]" />
            <span>Give Your Review</span>
          </button>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.slice(0, 6).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-center relative group"
            >
              <div>
                {/* Student Avatar with green online dot */}
                <div className="relative inline-block mx-auto">
                  <img
                    src={review.avatarUrl}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-slate-50 mx-auto"
                  />
                  <span className="absolute bottom-0 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                </div>

                {/* Subtitle / Role */}
                <div className="mt-3 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                  {review.role}
                </div>

                {/* Student Name */}
                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {review.name}
                </h3>

                {/* 5 Gold Stars */}
                <div className="mt-2 flex justify-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Course Tag */}
                <div className="mt-2 text-[10px] font-semibold text-[#0E2954] bg-[#0E2954]/5 px-2.5 py-0.5 rounded-full inline-block">
                  {review.courseName}
                </div>

                {/* Review Text */}
                <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  "{review.reviewText}"
                </p>
              </div>

              {/* Verified Certificate Stamp */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Alumnus
                </span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0E2954]" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
        </div>

      </div>
    </section>
  );
}
