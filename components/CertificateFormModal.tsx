"use client";

import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, RefreshCw } from 'lucide-react';
import { Certificate } from '@/lib/db/schema';

interface CertificateFormModalProps {
  certificate: Certificate | null; // Null if adding, Certificate if editing
  existingCertificates: Certificate[];
  onClose: () => void;
  onSave: (certificate: Certificate) => void;
}

export default function CertificateFormModal({ certificate, existingCertificates, onClose, onSave }: CertificateFormModalProps) {
  const isEdit = !!certificate;
  
  // State maps to the new schema
  const [id, setId] = useState(''); // Maps to certificateId
  const [role, setRole] = useState('student'); // New Role field
  const [name, setName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [batchNo, setBatchNo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [error, setError] = useState('');

  // Suggestions for auto ID based on role
  const createSuggestedId = (currentRole: string) => {
    const years = new Date().getFullYear();
    const randomNum = Math.floor(100 + Math.random() * 900);
    const prefix = currentRole === 'mentor' ? 'MNT' : 'DGL';
    return `${prefix}-${years}-${randomNum}`;
  };

  const suggestNewId = () => {
    setId(createSuggestedId(role));
  };

  // Update auto-ID if role changes while adding new record
  useEffect(() => {
    if (!isEdit && !id) {
      setId(createSuggestedId(role));
    }
  }, [role, isEdit]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (certificate) {
        setId(certificate.certificateId);
        setRole(certificate.role || 'student');
        setName(certificate.name);
        setCourseName(certificate.courseName);
        setBatchNo(certificate.batchNo);
        setStartDate(certificate.startDate);
        setEndDate(certificate.endDate);
      } else {
        setId(createSuggestedId('student'));
        setRole('student');
        setName('');
        setCourseName('');
        setBatchNo('');
        setStartDate('');
        setEndDate('');
      }
      setError('');
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [certificate]);

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
      setError('Certificate ID must only contain letters, numbers, hyphens or underscores.');
      return;
    }

    // Check if ID is unique when adding
    if (!isEdit) {
      const idExists = existingCertificates.some(
        c => String(c.certificateId).trim().toLowerCase() === id.trim().toLowerCase()
      );
      
      if (idExists) {
        setError(`Certificate ID "${id}" already exists. Please choose a unique ID.`);
        return;
      }
    }

    // Check dates
    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date cannot be later than end date.');
      return;
    }

    // Construct the object to match your new Drizzle schema
    const savedCertificate = {
      ...certificate, // Spreading retains numeric DB 'id' and 'createdAt' in Edit mode
      certificateId: id.trim(),
      role,
      name: name.trim(),
      courseName: courseName.trim(),
      batchNo: batchNo.trim(),
      startDate,
      endDate,
    } as Certificate;

    onSave(savedCertificate);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#1B3A5C] px-6 py-4 flex items-center justify-between text-white">
          <h3 className="text-lg font-bold tracking-wide">
            {isEdit ? 'Edit Registry Record' : 'Add New Registry Record'}
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
            
            {/* Role Selection (New) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-1.5">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  if (!isEdit) setId(createSuggestedId(e.target.value)); // Auto-update ID prefix if adding
                }}
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-sm outline-none font-medium text-gray-700"
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>

            {/* Certificate ID */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#1B3A5C] uppercase tracking-wider mb-1.5">
                Certificate ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  disabled={isEdit}
                  required
                  placeholder="e.g. DGL-2026-042"
                  className="flex-1 px-3 py-2.5 bg-[#FAF8F5] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-sm outline-none disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed font-mono"
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

            {/* Full Name */}
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
                {role === 'mentor' ? 'Mentorship Program / Course' : 'Course Name'}
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
                Start Date
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
                End Date
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
              {isEdit ? 'Save Changes' : 'Generate Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}