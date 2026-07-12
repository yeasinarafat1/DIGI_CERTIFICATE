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
