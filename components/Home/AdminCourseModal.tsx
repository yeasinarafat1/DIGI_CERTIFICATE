/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  BookOpen, 
  Sparkles, 
  RotateCcw, 
  Layers,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { Course, CourseCategory } from '@/types';
import { INITIAL_COURSES } from '@/utils/data';

interface AdminCourseModalProps {
  isOpen: boolean;
  courses: Course[];
  onClose: () => void;
  onSaveCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
  onResetCourses: () => void;
}

export default function AdminCourseModal({
  isOpen,
  courses,
  onClose,
  onSaveCourse,
  onDeleteCourse,
  onResetCourses
}: AdminCourseModalProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    category: 'Advanced Excel',
    price: 35,
    originalPrice: 70,
    classesCount: 16,
    hoursCount: 32,
    rating: 4.9,
    reviewsCount: 120,
    badge: 'Popular',
    bgColor: '#FCECD8',
    iconType: 'excel',
    description: '',
    syllabus: ['Introduction to Core Tools', 'Advanced Formulas & Automation', 'Real Business Projects'],
    instructorName: 'Ataher Jamil',
    instructorId: 'mentor-1',
    level: 'Beginner'
  });

  const [syllabusInput, setSyllabusInput] = useState('');

  if (!isOpen) return null;

  const handleStartAdd = () => {
    setEditingId(null);
    setIsAddingNew(true);
    setFormData({
      id: `course-${Date.now()}`,
      title: '',
      category: 'Advanced Excel',
      price: 35,
      originalPrice: 70,
      classesCount: 16,
      hoursCount: 32,
      rating: 4.9,
      reviewsCount: 50,
      badge: 'New Batch',
      bgColor: '#FCECD8',
      iconType: 'excel',
      description: '',
      syllabus: ['Module 1: Foundations', 'Module 2: Practical Exercises', 'Module 3: Final Project'],
      instructorName: 'Ataher Jamil',
      instructorId: 'mentor-1',
      level: 'Beginner'
    });
    setSyllabusInput('Module 1: Foundations\nModule 2: Practical Exercises\nModule 3: Final Project');
  };

  const handleStartEdit = (course: Course) => {
    setIsAddingNew(true);
    setEditingId(course.id);
    setFormData({ ...course });
    setSyllabusInput(course.syllabus.join('\n'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const syllabusArray = syllabusInput
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const savedCourse: Course = {
      id: editingId || formData.id || `course-${Date.now()}`,
      title: formData.title || 'Untitled Course',
      category: (formData.category as CourseCategory) || 'MS Office Suite',
      price: Number(formData.price) || 29,
      originalPrice: Number(formData.originalPrice) || Number(formData.price) * 2,
      classesCount: Number(formData.classesCount) || 12,
      hoursCount: Number(formData.hoursCount) || 24,
      rating: Number(formData.rating) || 4.9,
      reviewsCount: Number(formData.reviewsCount) || 80,
      badge: formData.badge || '',
      bgColor: formData.bgColor || '#FCECD8',
      iconType: formData.iconType || 'excel',
      description: formData.description || 'Master practical computer office applications with dedicated mentors.',
      syllabus: syllabusArray.length > 0 ? syllabusArray : ['Practical Lab Exercises', 'Final Capstone Assessment'],
      instructorName: formData.instructorName || 'Ataher Jamil',
      instructorId: formData.instructorId || 'mentor-1',
      level: formData.level || 'Beginner'
    };

    onSaveCourse(savedCourse);
    setIsAddingNew(false);
    setEditingId(null);
  };

  const colorPalette = [
    { name: 'Peach', color: '#FCECD8' },
    { name: 'Mint Aqua', color: '#DAF4EE' },
    { name: 'Olive Green', color: '#D7EACB' },
    { name: 'Rose Pink', color: '#FDDCDC' },
    { name: 'Lavender', color: '#ECE4FA' },
    { name: 'Sky Blue', color: '#DCECF9' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#0E2954] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#E5252A]" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                DigiLearning • Course Management Admin
              </h3>
              <p className="text-xs text-blue-200">
                Add, edit, or remove office application courses live on the landing page
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {isAddingNew ? (
            /* =================================== */
            /* ADD / EDIT COURSE FORM */
            /* =================================== */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-sm font-bold text-slate-800">
                  {editingId ? 'Edit Course Details' : 'Create & Add New Course'}
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel & Back to List
                </button>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Advanced MS Excel & Business Analytics"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0E2954]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CourseCategory })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0E2954]"
                  >
                    <option value="Advanced Excel">Advanced Excel</option>
                    <option value="Office Documentation">Office Documentation</option>
                    <option value="Accounting & Tally">Accounting & Tally</option>
                    <option value="MS Office Suite">MS Office Suite</option>
                    <option value="Typing & Speed">Typing & Speed</option>
                  </select>
                </div>
              </div>

              {/* Price, Original Price, Classes, Hours */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tuition Price ($) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0E2954]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0E2954]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Total Classes
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.classesCount}
                    onChange={(e) => setFormData({ ...formData, classesCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0E2954]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Total Hours
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.hoursCount}
                    onChange={(e) => setFormData({ ...formData, hoursCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0E2954]"
                  />
                </div>
              </div>

              {/* Instructor, Badge & Icon Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Instructor Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Ataher Jamil"
                    value={formData.instructorName}
                    onChange={(e) => setFormData({ ...formData, instructorName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0E2954]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Best Seller, Job Ready"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0E2954]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Icon Theme
                  </label>
                  <select
                    value={formData.iconType}
                    onChange={(e) => setFormData({ ...formData, iconType: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0E2954]"
                  >
                    <option value="excel">Excel (Spreadsheet)</option>
                    <option value="word">Word (Document)</option>
                    <option value="powerpoint">PowerPoint (Presentation)</option>
                    <option value="accounting">Accounting / Tally</option>
                    <option value="typing">Keyboard / Speed</option>
                    <option value="access">Database / Access</option>
                    <option value="suite">Complete Suite</option>
                  </select>
                </div>
              </div>

              {/* Pastel Background Color Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Card Pastel Background Tone
                </label>
                <div className="flex items-center gap-3">
                  {colorPalette.map((cp) => (
                    <button
                      key={cp.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, bgColor: cp.color })}
                      className={`w-9 h-9 rounded-xl border-2 transition-transform ${
                        formData.bgColor === cp.color
                          ? 'border-[#0E2954] scale-110 shadow-sm'
                          : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: cp.color }}
                      title={cp.name}
                    />
                  ))}
                  <span className="text-xs text-slate-500 font-medium ml-2">
                    Selected: {formData.bgColor}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Overview of the course topics, outcomes, and software covered..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0E2954]"
                />
              </div>

              {/* Syllabus List */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Curriculum Modules (One module per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Module 1: Foundations&#10;Module 2: Practical Lab&#10;Module 3: Project"
                  value={syllabusInput}
                  onChange={(e) => setSyllabusInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0E2954]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#E5252A] hover:bg-[#CC1E23] text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingId ? 'Update Course' : 'Save & Publish Course'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* =================================== */
            /* EXISTING COURSES LIST */
            /* =================================== */
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    Active Institute Courses ({courses.length})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onResetCourses}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Defaults</span>
                  </button>

                  <button
                    onClick={handleStartAdd}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0E2954] hover:bg-[#091E3E] px-4 py-1.5 rounded-lg shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#E5252A]" />
                    <span>Add New Course</span>
                  </button>
                </div>
              </div>

              {/* Course Items Table/Cards */}
              <div className="space-y-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors shadow-xs"
                  >
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-200/60"
                        style={{ backgroundColor: course.bgColor }}
                      >
                        <BookOpen className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-slate-900">
                            {course.title}
                          </h5>
                          {course.badge && (
                            <span className="text-[9px] font-bold text-[#E5252A] bg-red-50 border border-red-200 px-2 py-0.2 rounded-full">
                              {course.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {course.category} • {course.classesCount} Classes • {course.hoursCount} Hours • Instructor: {course.instructorName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right mr-2">
                        <span className="text-xs font-bold text-[#0E2954] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                          ${course.price}
                        </span>
                      </div>

                      <button
                        onClick={() => handleStartEdit(course)}
                        className="p-2 text-slate-600 hover:text-[#0E2954] hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Course"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteCourse(course.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Changes are saved automatically to the live landing page session.</span>
          <button
            onClick={onClose}
            className="text-xs font-bold text-[#0E2954] hover:text-[#E5252A] hover:underline"
          >
            Close Admin
          </button>
        </div>

      </div>
    </div>
  );
}
