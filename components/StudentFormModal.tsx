"use client"; // Important if using Next.js App Router

import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, RefreshCw } from 'lucide-react';
import { Student } from '@/lib/db/schema';

interface StudentFormModalProps {
  student: Student | null; // Null if adding, Student if editing
  existingStudents: Student[];
  onClose: () => void;
  onSave: (student: Student) => void;
}

export default function StudentFormModal({ student, existingStudents, onClose, onSave }: StudentFormModalProps) {
  const isEdit = !!student;
  
  // We use 'id' in state for the input field, but it maps to 'studentId' in the DB schema
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [batchNo, setBatchNo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [error, setError] = useState('');

  // Suggestions for auto ID
  const suggestNewId = () => {
    const years = new Date().getFullYear();
    const randomNum = Math.floor(100 + Math.random() * 900);
    setId(`ST-${years}-${randomNum}`);
  };

  useEffect(() => {
    if (student) {
      // Safely access studentId (fallback to id if types get mixed up during transition)
      setId(String(student.studentId || student.id));
      setName(student.name);
      setCourseName(student.courseName);
      setBatchNo(student.batchNo);
      setStartDate(student.startDate);
      setEndDate(student.endDate);
    } else {
      // Pre-fill with empty or auto suggest
      setName('');
      setCourseName('');
      setBatchNo('');
      setStartDate('');
      setEndDate('');
      suggestNewId();
    }
    setError('');
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!id.trim() || !name.trim() || !courseName.trim() || !batchNo.trim() || !startDate || !endDate) {
      setError('All fields are required.');
      return;
    }

    const idPattern = /^[a-zA-Z0-9_\-]+$/;
    if (!idPattern.test(id)) {
      setError('Student ID must only contain letters, numbers, hyphens or underscores.');
      return;
    }

    // Check if ID is unique when adding
    if (!isEdit) {
      // Safely convert to String to prevent .toLowerCase() crash on numeric IDs
      const idExists = existingStudents.some(
        s => String(s.studentId || s.id).trim().toLowerCase() === id.trim().toLowerCase()
      );
      
      if (idExists) {
        setError(`Student ID "${id}" already exists. Please choose a unique ID.`);
        return;
      }
    }

    // Check dates
    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date cannot be later than end date.');
      return;
    }

    // Construct the object to match your Drizzle schema
    const savedStudent = {
      ...student, // Spreading retains the numeric DB 'id' and 'createdAt' if we are in Edit mode
      studentId: id.trim(),
      name: name.trim(),
      courseName: courseName.trim(),
      batchNo: batchNo.trim(),
      startDate,
      endDate,
    } as Student;

    onSave(savedStudent);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#1B3A5C] px-6 py-4 flex items-center justify-between text-white">
          <h3 className="text-lg font-bold tracking-wide">
            {isEdit ? 'Edit Student Certificate' : 'Add New Student Certificate'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 font-medium flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student ID */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-1.5">
                Student ID / Certificate ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  disabled={isEdit}
                  required
                  placeholder="e.g. ST-2026-042"
                  className="flex-1 px-3 py-2.5 bg-[#FAF8F5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-sm outline-none disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                />
                {!isEdit && (
                  <button
                    type="button"
                    onClick={suggestNewId}
                    title="Generate Random ID"
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-[10px] text-gray-500 mt-1">
                Unique identifier linked to the certificate QR verification page.
              </p>
            </div>

            {/* Student Name */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Johnathan Doe"
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-sm outline-none"
              />
            </div>

            {/* Course Name */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-1.5">
                Course Name
              </label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
                placeholder="e.g. Full Stack Web Development"
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-sm outline-none"
              />
            </div>

            {/* Batch No */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-1.5">
                Batch Number
              </label>
              <input
                type="text"
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
                required
                placeholder="e.g. Batch-42"
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-sm outline-none"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-1.5">
                Course Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-sm outline-none"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-1.5">
                Course End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-sm outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#2D5F5D] hover:bg-[#204543] text-white font-medium rounded-xl transition-all text-sm flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" />
              {isEdit ? 'Save Changes' : 'Generate Certificate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}