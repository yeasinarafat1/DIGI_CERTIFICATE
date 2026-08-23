/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  MessageCircle, 
   
  Send, 
  ArrowUp,
  Award,
  Globe,
  Sparkles,
  Check
} from 'lucide-react';
import { INSTITUTE_NAME } from '@/utils/index';
import Logo from './Logo';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#091E3E] text-white pt-16 pb-8 border-t border-[#12315E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                  Digi<span className="text-[#E5252A]">Learning</span>
                </span>
                <span className="text-[10px] text-slate-300 font-semibold tracking-wider uppercase mt-0.5">
                  Office Applications Institute
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              Level up your skills, and get dream job with passion. Practical hands-on computer and office application mastery with guaranteed career placement support.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#hero" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E5252A] flex items-center justify-center text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#hero" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E5252A] flex items-center justify-center text-white transition-colors">
                <Send className="w-4 h-4" />
              </a>
              <a href="#hero" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E5252A] flex items-center justify-center text-white transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#hero" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E5252A] flex items-center justify-center text-white transition-colors">
                <Sparkles className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
              <li><a href="#mentors" className="hover:text-white transition-colors">Mentors</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Testimonial</a></li>
              <li><a href="#steps" className="hover:text-white transition-colors">Join</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#about" className="hover:text-white transition-colors">Help center</a></li>
              <li><a href="#placement" className="hover:text-white transition-colors">Terms of service</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Legal</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>

          {/* Column 4: Stay up to date input */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Stay up to date
            </h4>
            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-400 pr-10"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 p-1.5 bg-[#E5252A] hover:bg-[#CC1E23] rounded-lg text-white transition-colors"
                title="Send"
              >
                {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400 font-medium">
                Thank you for subscribing to DigiLearning updates!
              </p>
            )}
            <p className="text-[11px] text-slate-400">
              Receive notifications for upcoming weekend batches and corporate hiring drives.
            </p>
          </div>

        </div>

        {/* Bottom Copyright Bar with Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            ©2026 - All Rights Reserved by {INSTITUTE_NAME} • Office Applications Institute
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-white transition-colors font-medium text-[11px]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
