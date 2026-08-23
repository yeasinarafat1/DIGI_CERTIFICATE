/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'light' is for light backgrounds, 'dark' is for dark backgrounds (like footer)
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ 
  className = '', 
  variant = 'light', 
  size = 'md',
  showText = true 
}: LogoProps) {
  const isDark = variant === 'dark';

  // Sizing mappings
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Exact Vector Icon from Logo: Navy 'D' with inward Red Triangle */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Main Navy 'D' shape */}
          <path
            d="M20 18C20 15 23 13 26 13H52C74 13 90 28 90 50C90 72 74 87 52 87H26C23 87 20 85 20 82V68C20 66 22 64 24 64H50C59 64 68 58 68 50C68 42 59 36 50 36H24C22 36 20 34 20 32V18Z"
            fill={isDark ? '#FFFFFF' : '#0E2954'}
          />
          {/* Vibrant Red Arrow / Triangle nestled inside */}
          <path
            d="M20 40L42 50L20 60Z"
            fill="#E5252A"
          />
        </svg>
      </div>

      {/* Brand Text: Digi (Navy/White) + L (Red) + earning (Navy/White) */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-black tracking-tight ${textSizes[size]} font-sans flex items-center`}>
            <span className={isDark ? 'text-white' : 'text-[#0E2954]'}>Digi</span>
            <span className="text-[#E5252A]">L</span>
            <span className={isDark ? 'text-white' : 'text-[#0E2954]'}>earning</span>
          </span>
          <span className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
            Office Applications Institute
          </span>
        </div>
      )}
    </div>
  );
}
