/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Student } from '@/types';

export const TRAINING_CENTER_NAME = "Apex Leadership & Tech Academy";

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
