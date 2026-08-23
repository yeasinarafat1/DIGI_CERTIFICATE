/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCircle, Mail, Phone, MapPin, MessageSquare, Clock } from 'lucide-react';
import { INSTITUTE_NAME, INSTITUTE_ADDRESS } from '@/utils/index';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Matching Demo */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Have questions about upcoming batches, computer lab timings, or course fees? Send us a message.
          </p>
        </div>

        {submitted ? (
          <div className="mt-8 p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-emerald-900">
              Message Received Successfully!
            </h3>
            <p className="text-xs text-emerald-700 max-w-md mx-auto">
              Thank you {formData.firstName}. Our admissions advisor will reach out to you via {formData.email || 'email'} and phone within 2 hours.
            </p>
          </div>
        ) : (
          /* Form Layout - EXACT MATCH to the demo image */
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            
            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E2954]/20 focus:border-[#0E2954] text-sm text-slate-800 placeholder-slate-400 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E2954]/20 focus:border-[#0E2954] text-sm text-slate-800 placeholder-slate-400 bg-white"
                />
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E2954]/20 focus:border-[#0E2954] text-sm text-slate-800 placeholder-slate-400 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E2954]/20 focus:border-[#0E2954] text-sm text-slate-800 placeholder-slate-400 bg-white"
                />
              </div>
            </div>

            {/* Row 3: Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                required
                placeholder="Anything else you wanna communicate"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0E2954]/20 focus:border-[#0E2954] text-sm text-slate-800 placeholder-slate-400 bg-white resize-none"
              />
            </div>

            {/* Submit Button Matching Demo Style */}
            <div>
              <button
                type="submit"
                id="contact-submit-btn"
                className="px-8 py-3 rounded-full bg-[#0E2954] hover:bg-[#E5252A] text-white text-xs font-bold transition-all shadow-xs"
              >
                Submit
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
