'use server';

import { db } from '@/lib/db'; // Adjust this path to where your db instance is exported
import { students } from '@/lib/db/schema'; // Adjust this path to your schema file
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Use Drizzle's utility to infer the required insert types, 
// omitting auto-generated fields like id and timestamps.
export type AddStudentInput = typeof students.$inferInsert;

export async function addStudentAction(data: Omit<AddStudentInput, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    // 1. Insert the record into the database
    const [newStudent] = await db.insert(students).values({
      studentId: data.studentId,
      name: data.name,
      courseName: data.courseName,
      batchNo: data.batchNo,
      startDate: data.startDate, // Ensure this is a string formatted as 'YYYY-MM-DD'
      endDate: data.endDate,     // Ensure this is a string formatted as 'YYYY-MM-DD'
    }).returning();

    // 2. Revalidate the dashboard page so the new data appears immediately without a hard refresh
    revalidatePath('/admin/dashboard');

    return { 
      success: true, 
      message: 'Student added successfully!',
      student: newStudent 
    };

  } catch (error) {
    console.error('Failed to add student:', error);
    
    // Handle specific database errors (like duplicate studentId)
    if (error instanceof Error && error.message.includes('duplicate key')) {
       return { success: false, message: 'A student with this ID already exists.' };
    }

    return { 
      success: false, 
      message: 'An unexpected error occurred while adding the student.' 
    };
  }
}


export async function getStudentsAction() {
  try {
    // Fetch all students, ordered by most recent first
    const allStudents = await db.select().from(students).orderBy(desc(students.createdAt));

    return {
      success: true,
      data: allStudents,
    };
  } catch (error) {
    console.error('Failed to fetch students:', error);
    return {
      success: false,
      message: 'Could not retrieve student registry.',
      data: [],
    };
  }
}


export async function getStudentByStudentIdAction(studentId: string) {
  try {
    // Look for the student where the studentId column matches the input
    const [student] = await db
      .select()
      .from(students)
      .where(eq(students.studentId, studentId.trim()))
      .limit(1);

    if (!student) {
      return {
        success: false,
        message: 'No certificate found matching this ID.',
        data: null,
      };
    }

    return {
      success: true,
      data: student,
    };
  } catch (error) {
    console.error('Database error during verification:', error);
    return {
      success: false,
      message: 'A technical error occurred while verifying the credential.',
      data: null,
    };
  }
}

export async function deleteStudentAction(id: number) {
  try {
    // 1. Delete the record where the numeric primary key matches
    await db.delete(students).where(eq(students.id, id));

    // 2. Clear the cache for the dashboard so the list updates immediately
    revalidatePath('/admin/dashboard');

    return {
      success: true,
      message: 'Student record deleted successfully.',
    };
  } catch (error) {
    console.error('Failed to delete student:', error);
    return {
      success: false,
      message: 'An error occurred while trying to delete the record.',
    };
  }
}

export interface UpdateStudentInput {
  id: number; // The numeric DB primary key
  studentId: string;
  name: string;
  courseName: string;
  batchNo: string;
  startDate: string;
  endDate: string;
}

export async function updateStudentAction(data: UpdateStudentInput) {
  try {
    // 1. Update the record where the numeric primary key matches
    const [updatedStudent] = await db
      .update(students)
      .set({
        studentId: data.studentId.trim(),
        name: data.name.trim(),
        courseName: data.courseName.trim(),
        batchNo: data.batchNo.trim(),
        startDate: data.startDate,
        endDate: data.endDate,
        updatedAt: new Date(), // Manually update the timestamp
      })
      .where(eq(students.id, data.id))
      .returning();

    // 2. Clear the cache so the dashboard reflects the changes instantly
    revalidatePath('/admin/dashboard');

    return {
      success: true,
      message: 'Student record updated successfully.',
      student: updatedStudent,
    };
  } catch (error) {
    console.error('Failed to update student:', error);

    // Handle specific database errors (like changing the ID to one that already exists)
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return { 
        success: false, 
        message: 'A student with this ID already exists. Please choose a unique Student ID.' 
      };
    }

    return {
      success: false,
      message: 'An unexpected error occurred while updating the record.',
    };
  }
}