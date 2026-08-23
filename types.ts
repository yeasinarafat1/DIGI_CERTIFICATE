/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Student {
  id: string; // Unique Student ID / Certificate ID
  name: string;
  courseName: string;
  batchNo: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  createdAt: string; // ISO date string
}

export type RouteType = 'home' | 'admin-login' | 'admin-dashboard' | 'verify';

export interface RouteState {
  type: RouteType;
  studentId?: string; // used for verify route
}


export type CourseCategory = 
  | 'All'
  | 'MS Office Suite'
  | 'Advanced Excel'
  | 'Office Documentation'
  | 'Accounting & Tally'
  | 'Typing & Speed';

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  price: number;
  originalPrice?: number;
  classesCount: number;
  hoursCount: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  bgColor: string; // Tailored pastel color matching demo (e.g., #FCECD8, #DAF4EE, etc.)
  iconType: 'excel' | 'word' | 'powerpoint' | 'access' | 'accounting' | 'typing' | 'workspace' | 'suite';
  description: string;
  syllabus: string[];
  instructorId: string;
  instructorName: string;
  isPopular?: boolean;
  level: 'Beginner' | 'Intermediate' | 'Mastery';
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  title: string;
  experience: string;
  specialties: string[];
  studentsTaught: number;
  rating: number;
  imageUrl: string;
  bgColor: string; // Pastel background
  bio: string;
  companyTag?: string;
}

export interface StudentReview {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  courseName: string;
  reviewText: string;
  date: string;
  verifiedGraduate: boolean;
}

export interface JobPlacementRecord {
  id: string;
  studentName: string;
  placedCompany: string;
  role: string;
  batch: string;
  packageRange: string;
  hiredDate: string;
  avatarUrl: string;
  quote?: string;
}

export interface CardOffer {
  id: string;
  code: string;
  title: string;
  discount: string;
  description: string;
  badge: string;
  bgColor: string;
  validUntil: string;
}

export interface LearningStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

