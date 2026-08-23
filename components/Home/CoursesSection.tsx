/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Star, 
  Clock, 
  BookOpen, 
  Plus, 
  ChevronRight, 
  FileSpreadsheet, 
  FileText, 
  Presentation, 
  Database, 
  Calculator, 
  Keyboard, 
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Users
} from 'lucide-react';
import { Course, CourseCategory } from '@/types';

interface CoursesSectionProps {
  courses: Course[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenAdmin: () => void;
  onViewCourseDetails: (course: Course) => void;
  onEnrollCourse: (course: Course) => void;
}

export default function CoursesSection({
  courses,
  activeCategory,
  onSelectCategory,
  onOpenAdmin,
  onViewCourseDetails,
  onEnrollCourse
}: CoursesSectionProps) {
  
  const categories: { label: string; value: string }[] = [
    { label: 'All Courses', value: 'All' },
    { label: 'Advanced Excel', value: 'Advanced Excel' },
    { label: 'Office Documentation', value: 'Office Documentation' },
    { label: 'Accounting & Tally', value: 'Accounting & Tally' },
    { label: 'MS Office Suite', value: 'MS Office Suite' },
    { label: 'Typing & Speed', value: 'Typing & Speed' }
  ];

  const filteredCourses = activeCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  const getCourseIcon = (iconType: Course['iconType']) => {
    switch (iconType) {
      case 'excel':
        return <FileSpreadsheet className="w-12 h-12 text-emerald-800" />;
      case 'word':
        return <FileText className="w-12 h-12 text-blue-800" />;
      case 'powerpoint':
        return <Presentation className="w-12 h-12 text-orange-800" />;
      case 'accounting':
        return <Calculator className="w-12 h-12 text-teal-800" />;
      case 'typing':
        return <Keyboard className="w-12 h-12 text-purple-800" />;
      case 'access':
        return <Database className="w-12 h-12 text-rose-800" />;
      case 'suite':
      default:
        return <BookOpen className="w-12 h-12 text-indigo-800" />;
    }
  };

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Explore Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Popular Courses
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Pick from our targeted office productivity tracks or full professional diplomas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Add Course Admin Shortcut */}
            <button
              onClick={onOpenAdmin}
              id="courses-add-course-btn"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-dashed border-[#0E2954]/40 text-[#0E2954] bg-[#0E2954]/5 hover:bg-[#0E2954]/10 rounded-xl text-xs font-bold transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-[#E5252A]" />
              <span>Add / Manage Courses</span>
            </button>

            {/* Explore Classes Button */}
            <button
              onClick={() => onSelectCategory('All')}
              id="courses-explore-all-btn"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-700 hover:border-[#0E2954] hover:text-[#0E2954] rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              <span>Explore All ({courses.length})</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4 pt-2 border-b border-slate-100 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0E2954] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Course Cards Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => {
            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group transform hover:-translate-y-1"
              >
                {/* Pastel Top Illustration Container */}
                <div 
                  className="h-44 w-full p-6 flex flex-col items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ backgroundColor: course.bgColor || '#FCECD8' }}
                >
                  {/* Subtle decorative circles */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/30 pointer-events-none" />
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-black/5 pointer-events-none" />
                  
                  {/* Visual Graphic Representation */}
                  <div className="relative z-10 p-3 bg-white/80 backdrop-blur-xs rounded-2xl shadow-sm border border-white/60">
                    {getCourseIcon(course.iconType)}
                  </div>

                  {/* Level Pill */}
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-slate-700 bg-white/90 px-2 py-0.5 rounded-md shadow-xs">
                    {course.level}
                  </span>

                  {/* Badge */}
                  {course.badge && (
                    <span className="absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-wider text-[#E5252A] bg-white/95 px-2.5 py-0.5 rounded-full shadow-xs">
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Label & Price Pill */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-500 truncate">
                        {course.category}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {course.originalPrice && (
                          <span className="text-xs text-slate-400 line-through font-normal">
                            ${course.originalPrice}
                          </span>
                        )}
                        <span className="text-xs font-bold text-[#0E2954] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                          ${course.price}
                        </span>
                      </div>
                    </div>

                    {/* Course Title */}
                    <h3 
                      onClick={() => onViewCourseDetails(course)}
                      className="mt-3 font-bold text-base text-slate-900 line-clamp-2 leading-snug cursor-pointer group-hover:text-[#0E2954] transition-colors"
                      title={course.title}
                    >
                      {course.title}
                    </h3>

                    {/* Instructor / Mentor note */}
                    <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1">
                      <span>Instructor:</span>
                      <span className="font-semibold text-slate-700">{course.instructorName}</span>
                    </p>
                  </div>

                  {/* Footer Metadata */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.classesCount} Classes</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.hoursCount} Hours</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-700 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{course.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Enroll & View Syllabus Buttons */}
                  <div className="mt-4 grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onViewCourseDetails(course)}
                      className="w-full py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
                    >
                      Syllabus
                    </button>
                    <button
                      onClick={() => onEnrollCourse(course)}
                      className="w-full py-2 text-xs font-bold text-white bg-[#E5252A] hover:bg-[#CC1E23] rounded-lg transition-colors text-center shadow-xs"
                    >
                      Enroll
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state fallback */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl mt-8 border border-dashed border-slate-300">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="mt-3 text-lg font-bold text-slate-700">No courses in this category yet</h3>
            <p className="mt-1 text-sm text-slate-500">You can add custom courses directly through the Admin Portal.</p>
            <button
              onClick={onOpenAdmin}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#0E2954] text-white text-xs font-semibold rounded-lg"
            >
              <Plus className="w-4 h-4 text-[#E5252A]" /> Add New Course
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
