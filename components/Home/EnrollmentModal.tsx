/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Tag, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2,
  Clock,
  Award
} from 'lucide-react';
import { Course, CardOffer } from '@/types';
import { INSTITUTE_NAME } from '@/utils/index';

interface EnrollmentModalProps {
  isOpen: boolean;
  initialCourse?: Course | null;
  initialOffer?: CardOffer | null;
  courses: Course[];
  onClose: () => void;
}

export default function EnrollmentModal({
  isOpen,
  initialCourse,
  initialOffer,
  courses,
  onClose
}: EnrollmentModalProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    batchSlot: 'Weekend Intensive (Sat-Sun 10am - 1pm)',
    experience: 'Beginner (Basic PC knowledge)'
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState('');

  useEffect(() => {
    if (initialCourse) {
      setSelectedCourseId(initialCourse.id);
    } else if (courses.length > 0) {
      setSelectedCourseId(courses[0].id);
    }

    if (initialOffer) {
      setCouponCode(initialOffer.code);
      applyCoupon(initialOffer.code);
    }
  }, [initialCourse, initialOffer, courses]);

  if (!isOpen) return null;

  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  const applyCoupon = (codeToTest: string) => {
    const code = codeToTest.trim().toUpperCase();
    if (code === 'DIZZY40') {
      setDiscountPercent(40);
      setCouponApplied(true);
      setCouponError('');
    } else if (code === 'DIPLOMA60') {
      setDiscountPercent(60);
      setCouponApplied(true);
      setCouponError('');
    } else if (code === 'GROUP25') {
      setDiscountPercent(25);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid or expired coupon code. Try DIZZY40');
      setCouponApplied(false);
      setDiscountPercent(0);
    }
  };

  const handleApplyCouponBtn = (e: React.FormEvent) => {
    e.preventDefault();
    applyCoupon(couponCode);
  };

  const basePrice = currentCourse ? currentCourse.price : 35;
  const discountAmount = Math.round((basePrice * discountPercent) / 100);
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const handleSubmitEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    const generatedId = `DZ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setRegistrationId(generatedId);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-fade-in">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#0E2954] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#E5252A]" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                DigiLearning Admission Portal
              </h3>
              <p className="text-xs text-blue-200">
                Reserve your workstation in upcoming office application batch
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

        {isSuccess ? (
          /* ======================================= */
          /* REGISTRATION SUCCESS CARD */
          /* ======================================= */
          <div className="p-8 text-center space-y-6 overflow-y-auto flex-1">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Seat Reserved Successfully
              </span>
              <h4 className="mt-3 text-2xl font-extrabold text-slate-900">
                Welcome to DigiLearning, {formData.fullName}!
              </h4>
              <p className="mt-2 text-xs text-slate-600 max-w-md mx-auto">
                Your admission application for <span className="font-bold text-slate-900">{currentCourse?.title}</span> has been confirmed.
              </p>
            </div>

            {/* Registration Slip Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto space-y-2.5 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-200 font-semibold text-slate-500">
                <span>Registration Reference:</span>
                <span className="font-mono font-bold text-[#0E2954]">{registrationId}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Selected Course:</span>
                <span className="font-semibold text-slate-900">{currentCourse?.title}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Batch Timing:</span>
                <span className="font-semibold text-slate-900">{formData.batchSlot}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Student Email:</span>
                <span className="font-semibold text-slate-900">{formData.email}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Tuition Total:</span>
                <span className="font-bold text-emerald-700">${finalPrice}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#0E2954] hover:bg-[#091E3E] text-white text-xs font-bold rounded-xl shadow-md"
              >
                Done & Return to Homepage
              </button>
            </div>
          </div>
        ) : (
          /* ======================================= */
          /* ENROLLMENT FORM */
          /* ======================================= */
          <form onSubmit={handleSubmitEnrollment} className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-5">
            
            {/* 1. Select Course */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Select Course Track *
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0E2954] bg-white"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} — ${c.price} ({c.classesCount} Classes)
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Personal Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0E2954]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0E2954]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0E2954]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Preferred Batch Slot
                </label>
                <select
                  value={formData.batchSlot}
                  onChange={(e) => setFormData({ ...formData, batchSlot: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0E2954] bg-white"
                >
                  <option value="Morning Batch (9:00 AM - 11:00 AM)">Morning Batch (9:00 AM - 11:00 AM)</option>
                  <option value="Afternoon Batch (2:00 PM - 4:00 PM)">Afternoon Batch (2:00 PM - 4:00 PM)</option>
                  <option value="Evening Batch (6:30 PM - 8:30 PM)">Evening Batch (6:30 PM - 8:30 PM)</option>
                  <option value="Weekend Intensive (Sat-Sun 10am - 1pm)">Weekend Intensive (Sat-Sun 10am - 1pm)</option>
                </select>
              </div>
            </div>

            {/* 3. Card Offer / Voucher Code Input */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Have a Voucher / Offer Card Code?
              </label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. DIGI40 or DIPLOMA60"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 uppercase font-mono px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0E2954] bg-white"
                />
                <button
                  type="button"
                  onClick={handleApplyCouponBtn}
                  className="px-4 py-2 bg-[#0E2954] hover:bg-[#091E3E] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Apply
                </button>
              </div>

              {couponApplied && (
                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Card offer applied! You saved {discountPercent}% (${discountAmount}).</span>
                </p>
              )}

              {couponError && (
                <p className="text-xs text-rose-500 font-medium">
                  {couponError}
                </p>
              )}

              {/* Price Calculation Box */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-medium text-slate-600">
                <span>Standard Tuition:</span>
                <span>${basePrice}</span>
              </div>
              {couponApplied && (
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Card Discount ({discountPercent}%):</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm font-bold text-slate-900 pt-1">
                <span>Payable Amount:</span>
                <span className="text-base text-[#0E2954] font-black">${finalPrice}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#E5252A] hover:bg-[#CC1E23] text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Confirm Admission (${finalPrice})
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
