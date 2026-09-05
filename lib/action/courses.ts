'use server';

import { db } from '@/lib//db';
import { courses } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '../auth/require-admin';
// Adjust this import to point to your actual auth utility

export type CourseInput = {
  title: string;
  category: string;
  level: string;
  price: number;
  originalPrice: number;
  classesCount: number;
  hoursCount: number;
  rating: string; 
  reviewsCount: number;
  badge: string;
  bgColor: string;
  iconType: string;
  isPopular: boolean;
  description: string;
  syllabus: string[];
  mentorId: number | null;
};

// --- GET ALL COURSES ---
export async function getCourses() {
  try {
    await requireAdmin();

   const allCourses = await db.select().from(courses).orderBy(desc(courses.createdAt));

    return { success: true, data: allCourses };
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return { success: false, message: 'Please sign in to continue.', data: [], unauthorized: true };
    }
    return { success: false, message: 'Could not retrieve courses.', data: [] };
  }
}

// --- ADD COURSE ---
export async function addCourse(data: CourseInput) {
  try {
    await requireAdmin();

    if (!data.title || data.title.trim() === '') {
      return { success: false, message: 'Course title is required' };
    }

    await db.insert(courses).values({
      title: data.title,
      category: data.category || null,
      level: data.level || null,
      price: data.price || 0,
      originalPrice: data.originalPrice || null,
      classesCount: data.classesCount || 0,
      hoursCount: data.hoursCount || 0,
      rating: data.rating ? data.rating : '0.0',
      reviewsCount: data.reviewsCount || 0,
      badge: data.badge || null,
      bgColor: data.bgColor || null,
      iconType: data.iconType || null,
      isPopular: data.isPopular || false,
      description: data.description || null,
      syllabus: data.syllabus || [],
      mentorId: data.mentorId || null,
    });

    revalidatePath('/'); 
    revalidatePath('/admin/courses'); 

    return { success: true, message: 'Course added successfully.' };
  } catch (error) {
    console.error('Failed to add course:', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return { success: false, message: 'Please sign in to continue.', unauthorized: true };
    }
    return { success: false, message: 'Failed to add course.' };
  }
}

// --- UPDATE COURSE ---
export async function updateCourse(id: number, data: CourseInput) {
  try {
    await requireAdmin();

    await db.update(courses)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(courses.id, id));

    revalidatePath('/');
    revalidatePath('/admin/courses');

    return { success: true, message: 'Course updated successfully.' };
  } catch (error) {
    console.error('Failed to update course:', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return { success: false, message: 'Please sign in to continue.', unauthorized: true };
    }
    return { success: false, message: 'Failed to update course.' };
  }
}

// --- DELETE COURSE ---
export async function deleteCourse(id: number) {
  try {
    await requireAdmin();

    await db.delete(courses).where(eq(courses.id, id));
    
    revalidatePath('/');
    revalidatePath('/admin/courses');
    
    return { success: true, message: 'Course deleted successfully.' };
  } catch (error) {
    console.error('Failed to delete course:', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return { success: false, message: 'Please sign in to continue.', unauthorized: true };
    }
    return { success: false, message: 'Failed to delete course.' };
  }
}