'use client';



import React, { useState, useEffect } from 'react';
import { 
  Course, 
  Mentor, 
  StudentReview, 
  CardOffer 
} from '@/types';
import { 
  getCourses, 
  saveCourses, 
  getReviews, 
  saveReviews,
  INSTITUTE_NAME 
} from '@/utils/index';
import { INITIAL_COURSES, STUDENT_REVIEWS } from '@/utils/data';

// Sub-components
import Navbar from '@/components/Home/Navbar';
import HeroSection from '@/components/Home/HeroSection';
import AboutSection from '@/components/Home/AboutSection';
import CoursesSection from '@/components/Home/CoursesSection';
import LearningStepsSection from '@/components/Home/LearningStepsSection';
import MentorsSection from '@/components/Home/MentorsSection';

import ReviewsSection from '@/components/Home/ReviewsSection';
import ContactSection from '@/components/Home/ContactSection';

import Footer from '@/components/Home/Footer';

// Modals
import AdminCourseModal from '@/components/Home/AdminCourseModal';
import CourseDetailsModal from '@/components/Home/CourseDetailsModal';
import EnrollmentModal from '@/components/Home/EnrollmentModal';
import ReviewModal from '@/components/Home/ReviewModal';
import MentorModal from '@/components/Home/MentorModal';

export default function HomePage() {
  // Courses state
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Reviews state
  const [reviews, setReviews] = useState<StudentReview[]>([]);

  // Modal active states
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<Course | null>(null);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);
  const [selectedOfferForEnroll, setSelectedOfferForEnroll] = useState<CardOffer | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  // Initialize data from localStorage or defaults
  // Running this in useEffect ensures it only happens on the client, avoiding hydration mismatches
  useEffect(() => {
    setCourses(INITIAL_COURSES);
    setReviews(STUDENT_REVIEWS);
  }, []);

  // Course handlers
  const handleSaveCourse = (savedCourse: Course) => {
    let updated: Course[];
    const exists = courses.some(c => c.id === savedCourse.id);
    if (exists) {
      updated = courses.map(c => c.id === savedCourse.id ? savedCourse : c);
    } else {
      updated = [savedCourse, ...courses];
    }
    setCourses(updated);
    saveCourses(updated);
  };

  const handleDeleteCourse = (courseId: string) => {
    const updated = courses.filter(c => c.id !== courseId);
    setCourses(updated);
    saveCourses(updated);
  };

  const handleResetCourses = () => {
    setCourses(INITIAL_COURSES);
    saveCourses(INITIAL_COURSES);
  };

  // Review handler
  const handleAddReview = (newReview: StudentReview) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviews(updated);
  };

  // Open Enrollment with course
  const handleOpenEnrollWithCourse = (course?: Course) => {
    setSelectedCourseForEnroll(course || null);
    setSelectedOfferForEnroll(null);
    setIsEnrollModalOpen(true);
  };


  // Search from hero
  const handleHeroSearch = (category: string) => {
    if (category && category !== 'All') {
      setActiveCategory(category);
    } else {
      setActiveCategory('All');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-[#0E2954]/10 selection:text-[#0E2954]">
      
      {/* 1. Header / Navbar */}
      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenEnroll={() => handleOpenEnrollWithCourse()}
      />

      {/* Main Serial Landing Page Flow */}
      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <HeroSection 
          onSearchCourse={handleHeroSearch}
          onOpenEnroll={() => handleOpenEnrollWithCourse()}
        />

        {/* 3. About Institute / What We Do / Graduate Metrics */}
        <AboutSection />

        {/* 4. Popular Courses Section (with live Category Filters & Admin Trigger) */}
        <CoursesSection 
          courses={courses}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onViewCourseDetails={(course) => setSelectedCourseForDetails(course)}
          onEnrollCourse={(course) => handleOpenEnrollWithCourse(course)}
        />

        {/* 5. Serial Learning Steps & Card Offer Process */}
        <LearningStepsSection 
         
        />

        {/* 6. Mentors / Instructors Section */}
        <MentorsSection 
          onSelectMentor={(mentor) => setSelectedMentor(mentor)}
        />

      

        {/* 8. Student Reviews & Testimonials Section */}
        <ReviewsSection 
          reviews={reviews}
          
        />

        {/* 9. Contact / Get in Touch Section */}
        <ContactSection />

       

      </main>

      {/* 11. Rich Royal Plum Footer */}
      <Footer />

      {/* ========================================== */}
      {/* INTERACTIVE MODALS */}
      {/* ========================================== */}

      {/* 1. Admin Course Management Modal */}
      <AdminCourseModal
        isOpen={isAdminOpen}
        courses={courses}
        onClose={() => setIsAdminOpen(false)}
        onSaveCourse={handleSaveCourse}
        onDeleteCourse={handleDeleteCourse}
        onResetCourses={handleResetCourses}
      />

      {/* 2. Course Details & Syllabus Modal */}
      <CourseDetailsModal
        course={selectedCourseForDetails}
        onClose={() => setSelectedCourseForDetails(null)}
       
      />

      {/* 3. Admission & Voucher Enrollment Modal */}
      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        initialCourse={selectedCourseForEnroll}
        initialOffer={selectedOfferForEnroll}
        courses={courses}
        onClose={() => setIsEnrollModalOpen(false)}
      />

      {/* 4. Student Review Submission Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        courses={courses}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />

      {/* 5. Mentor Profile Modal */}
      <MentorModal
        mentor={selectedMentor}
        courses={courses}
        onClose={() => setSelectedMentor(null)}
        onSelectCourse={(course) => setSelectedCourseForDetails(course)}
      />

    </div>
  );
}