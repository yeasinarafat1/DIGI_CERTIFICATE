'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Users, 
  ChevronRight,
  Loader2
} from 'lucide-react';
import { getMentors } from '@/lib/action/mentor'; // Adjust path if needed
import { Mentor } from '@/types';

// Pastel colors from your original design to cycle through
const PASTEL_COLORS = [
  '#FCECD8', // Warm peach
  '#DAF4EE', // Soft Mint
  '#D7EACB', // Soft Olive Green
  '#FDDCDC', // Pastel Rose
  '#ECE4FA', // Soft Lavender
  '#DCECF9'  // Soft Sky Blue
];

interface MentorsSectionProps {
  onSelectMentor: (mentor: any) => void;
}

export default function MentorsSection({ onSelectMentor }: MentorsSectionProps) {
  const [mentors, setMentors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMentors() {
      setIsLoading(true);
      try {
        const result = await getMentors();
        
        if (result.success && result.data) {
          // Map DB schema to match your UI's expected format
          const formattedMentors = result.data.map((dbMentor, index) => ({
            id: dbMentor.id,
            name: dbMentor.name,
            role: dbMentor.roleTitle || 'Instructor',
            title: dbMentor.designation || 'Mentor',
            experience: `${dbMentor.yearsExperience || 0}+ Years Experience`,
            specialties: dbMentor.specialties || [],
            studentsTaught: dbMentor.studentsCoached || 0,
            rating: parseFloat(dbMentor.rating || '0'),
            imageUrl: dbMentor.avatarUrl || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
            bgColor: PASTEL_COLORS[index % PASTEL_COLORS.length], // Assign colors dynamically
            bio: dbMentor.biography || '',
            companyTag: 'Verified Mentor'
          }));
          
          setMentors(formattedMentors);
        }
      } catch (error) {
        console.error("Failed to fetch mentors for section:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMentors();
  }, []);

  return (
    <section id="mentors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Meet with our Mentors
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Learn office productivity directly from certified corporate instructors with real industry experience.
            </p>
          </div>

          <button
            onClick={() => mentors.length > 0 && onSelectMentor(mentors[0])}
            disabled={isLoading || mentors.length === 0}
            id="mentors-explore-btn"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-700 hover:border-[#0E2954] hover:text-[#0E2954] rounded-xl text-xs font-bold transition-colors shadow-sm shrink-0 disabled:opacity-50"
          >
            <span>Explore All Instructors</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#E5252A]" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="mt-10 flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-[#0E2954]" />
            <p className="text-sm font-medium">Loading mentors...</p>
          </div>
        ) : mentors.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">No mentors found. Please check back later.</p>
          </div>
        ) : (
          /* Mentor Cards Grid */
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                onClick={() => onSelectMentor(mentor)}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col transform hover:-translate-y-1"
              >
                {/* Photo Area with Pastel Backdrop */}
                <div 
                  className="h-64 sm:h-72 w-full relative flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: mentor.bgColor }}
                >
                  <img
                    src={mentor.imageUrl}
                    alt={mentor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
                    }}
                  />
                  
                  {/* Floating Role Pill on Photo Bottom */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3.5 py-1 rounded-full shadow-md border border-white text-[10px] sm:text-xs font-bold text-slate-700 whitespace-nowrap">
                    {mentor.role}
                  </div>
                </div>

                {/* Card Footer with Name & Quick Stats */}
                <div className="p-6 text-center flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0E2954] transition-colors">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {mentor.title} • {mentor.experience}
                    </p>
                  </div>

                  {/* Specialties Tags */}
                  <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                    {mentor.specialties.slice(0, 3).map((tag: string) => (
                      <span 
                        key={tag}
                        className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {mentor.specialties.length > 3 && (
                       <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full">
                         +{mentor.specialties.length - 3}
                       </span>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{mentor.studentsTaught.toLocaleString()}+ Students</span>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{mentor.rating.toFixed(1)}</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}