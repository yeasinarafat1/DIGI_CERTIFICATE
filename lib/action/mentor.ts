'use server';

import { db } from '@/lib/db'; // Adjust this path to your actual Drizzle db instance
import { mentors } from '@/lib/db/schema'; // Adjust this path to your schema file
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Define the shape of the data coming from the client form
export type MentorInput = {
  name: string;
  roleTitle: string;
  designation: string;
  yearsExperience: string;
  studentsCoached: string;
  rating: string;
  avatarUrl: string;
  specialties: string[];
  biography: string;
};

export async function addMentor(data: MentorInput) {
  try {
    // 1. Basic validation (ensure name exists)
    if (!data.name || data.name.trim() === '') {
      return { success: false, error: 'Mentor name is required' };
    }

    // 2. Insert into the database using Drizzle
    await db.insert(mentors).values({
      name: data.name,
      roleTitle: data.roleTitle || null,
      designation: data.designation || null,
      // Convert string inputs to numbers (fallback to 0 if empty)
      yearsExperience: data.yearsExperience ? parseInt(data.yearsExperience, 10) : 0,
      studentsCoached: data.studentsCoached ? parseInt(data.studentsCoached, 10) : 0,
      rating: data.rating ? data.rating : '0.0', 
      avatarUrl: data.avatarUrl || null,
      specialties: data.specialties,
      biography: data.biography || null,
    });

    // 3. Revalidate the admin page so the new mentor appears immediately
    revalidatePath('/admin/mentors'); // Adjust this path to match your actual admin route

    return { success: true };
  } catch (error) {
    console.error('Failed to add mentor:', error);
    return { success: false, error: 'Failed to add mentor to the database' };
  }
}

export async function getMentors() {
  try {
    // Fetch all mentors and order them by newest first
    const allMentors = await db.select()
      .from(mentors)
      .orderBy(desc(mentors.createdAt));

    return { success: true, data: allMentors };
  } catch (error) {
    console.error('Failed to fetch mentors:', error);
    return { success: false, error: 'Failed to fetch mentors', data: [] };
  }
}

// --- UPDATE MENTOR ---
export async function updateMentor(id: number, data: MentorInput) {
  try {
    // 1. Basic validation
    if (!data.name || data.name.trim() === '') {
      return { success: false, error: 'Mentor name is required' };
    }

    // 2. Update the database using Drizzle
    await db.update(mentors)
      .set({
        name: data.name,
        roleTitle: data.roleTitle || null,
        designation: data.designation || null,
        yearsExperience: data.yearsExperience ? parseInt(data.yearsExperience, 10) : 0,
        studentsCoached: data.studentsCoached ? parseInt(data.studentsCoached, 10) : 0,
        rating: data.rating ? data.rating : '0.0',
        avatarUrl: data.avatarUrl || null,
        specialties: data.specialties,
        biography: data.biography || null,
        updatedAt: new Date(), // Manually update the timestamp if needed
      })
      .where(eq(mentors.id, id));

    // 3. Revalidate the page
    revalidatePath('/admin/mentors'); // Adjust to your actual admin route

    return { success: true };
  } catch (error) {
    console.error('Failed to update mentor:', error);
    return { success: false, error: 'Failed to update mentor in the database' };
  }
}

// --- DELETE MENTOR ---
export async function deleteMentor(id: number) {
  try {
    // Delete the mentor matching the provided ID
    await db.delete(mentors).where(eq(mentors.id, id));

    revalidatePath('/admin/mentors'); 

    return { success: true };
  } catch (error) {
    console.error('Failed to delete mentor:', error);
    return { success: false, error: 'Failed to delete mentor from the database' };
  }
}