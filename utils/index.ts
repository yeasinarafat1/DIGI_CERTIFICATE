/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, Student, StudentReview } from '@/types';
import { INITIAL_COURSES, STUDENT_REVIEWS } from './data';

export const TRAINING_CENTER_NAME = "DigiLearning";

const DEFAULT_STUDENTS: Student[] = [
  {
    id: "ST-2026-001",
    name: "Sarah Jenkins",
    courseName: "Full Stack Software Engineering",
    batchNo: "Batch-12",
    startDate: "2026-01-10",
    endDate: "2026-04-10",
    createdAt: "2026-04-10T12:00:00.000Z"
  },
  {
    id: "ST-2026-002",
    name: "Michael Chen",
    courseName: "Data Science & Machine Learning",
    batchNo: "Batch-08",
    startDate: "2026-02-15",
    endDate: "2026-05-15",
    createdAt: "2026-05-15T12:00:00.000Z"
  },
  {
    id: "ST-2026-003",
    name: "Amara Okafor",
    courseName: "Advanced UX/UI Product Design",
    batchNo: "Batch-15",
    startDate: "2026-03-01",
    endDate: "2026-06-01",
    createdAt: "2026-06-01T12:00:00.000Z"
  },
  {
    id: "ST-2026-004",
    name: "David Alves",
    courseName: "Cloud Architecture & DevOps",
    batchNo: "Batch-04",
    startDate: "2026-01-05",
    endDate: "2026-04-05",
    createdAt: "2026-04-05T12:00:00.000Z"
  },
  {
    id: "ST-2026-005",
    name: "Sophia Martinez",
    courseName: "Cybersecurity Operations",
    batchNo: "Batch-11",
    startDate: "2026-03-10",
    endDate: "2026-06-10",
    createdAt: "2026-06-10T12:00:00.000Z"
  }
];

export function getStudents(): Student[] {
  const data = localStorage.getItem('cvs_students');
  if (!data) {
    localStorage.setItem('cvs_students', JSON.stringify(DEFAULT_STUDENTS));
    return DEFAULT_STUDENTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_STUDENTS;
  }
}

export function saveStudents(students: Student[]): void {
  localStorage.setItem('cvs_students', JSON.stringify(students));
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  
  const date = new Date(year, month, day);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}


export const INSTITUTE_NAME = "DigiLearning";
export const INSTITUTE_TAGLINE = "Premier Office Applications & Career Development Institute";
export const INSTITUTE_ADDRESS = "Digital Complex, Level 4, Main Commercial Avenue";

export function getCourses(): Course[] {
  const data = localStorage.getItem('digilearning_courses') || localStorage.getItem('dizzy_courses');
  if (!data) {
    localStorage.setItem('digilearning_courses', JSON.stringify(INITIAL_COURSES));
    return INITIAL_COURSES;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_COURSES;
  }
}

export function saveCourses(courses: Course[]): void {
  localStorage.setItem('digilearning_courses', JSON.stringify(courses));
}

export function getReviews(): StudentReview[] {
  const data = localStorage.getItem('digilearning_reviews') || localStorage.getItem('dizzy_reviews');
  if (!data) {
    localStorage.setItem('digilearning_reviews', JSON.stringify(STUDENT_REVIEWS));
    return STUDENT_REVIEWS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return STUDENT_REVIEWS;
  }
}

export function saveReviews(reviews: StudentReview[]): void {
  localStorage.setItem('digilearning_reviews', JSON.stringify(reviews));
}

export function getAdminAuth(): boolean {
  return localStorage.getItem('digilearning_admin_auth') === 'true' || localStorage.getItem('dizzy_admin_auth') === 'true';
}

export function setAdminAuth(auth: boolean): void {
  localStorage.setItem('digilearning_admin_auth', auth ? 'true' : 'false');
}

