'use server';

import { db } from '@/lib/db'; // Adjust this path to where your db instance is exported
import { certificates, students } from '@/lib/db/schema'; // Ensure you import the new certificates schema
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireAdmin, UnauthorizedAdminError } from '@/lib/auth/require-admin';

// Use Drizzle's utility to infer the required insert types from the certificates table
export type AddCertificateInput = typeof certificates.$inferInsert;

export async function addCertificateAction(data: Omit<AddCertificateInput, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    await requireAdmin();

    // 1. Insert the record into the database using the new certificates table
    const [newCertificate] = await db.insert(certificates).values({
      certificateId: data.certificateId, // Updated from studentId
      role: data.role || 'student',      // Added role field (defaults to 'student' if not provided)
      name: data.name,
      courseName: data.courseName,
      batchNo: data.batchNo,
      startDate: data.startDate, 
      endDate: data.endDate,     
    }).returning();

    // 2. Revalidate the dashboard page so the new data appears immediately
    revalidatePath('/admin/dashboard');

    return { 
      success: true, 
      message: 'Certificate added successfully!',
      certificate: newCertificate 
    };

  } catch (error) {
    console.error('Failed to add certificate:', error);

    if (error instanceof UnauthorizedAdminError) {
      return {
        success: false,
        message: 'Please sign in to continue.',
      };
    }
    
    // Handle specific database errors (like duplicate certificateId)
    if (error instanceof Error && error.message.includes('duplicate key')) {
       return { success: false, message: 'A certificate with this ID already exists.' };
    }

    return { 
      success: false, 
      message: 'An unexpected error occurred while adding the certificate.' 
    };
  }
}

export async function getCertificatesAction() {
  try {
    await requireAdmin();

    // Fetch all certificates, ordered by most recent first
    const allCertificates = await db.select().from(certificates).orderBy(desc(certificates.createdAt));

    return {
      success: true,
      data: allCertificates,
    };
  } catch (error) {
    console.error('Failed to fetch certificates:', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return { success: false, message: 'Please sign in to continue.', data: [], unauthorized: true };
    }
    return {
      success: false,
      message: 'Could not retrieve certificate registry.',
      data: [],
    };
  }
}

export async function getCertificateByIdAction(certificateId: string) {
  try {
    // Look for the record where the certificateId column matches the input
    const [certificate] = await db
      .select()
      .from(certificates)
      .where(eq(certificates.certificateId, certificateId.trim()))
      .limit(1);

    if (!certificate) {
      return {
        success: false,
        errorCode: 'not_found' as const,
        message: 'No certificate found matching this ID.',
        data: null,
      };
    }

    return {
      success: true,
      data: certificate,
    };
  } catch (error) {
    console.error('Database error during verification:', error);
    return {
      success: false,
      errorCode: 'verification_unavailable' as const,
      message: 'A technical error occurred while verifying the credential.',
      data: null,
    };
  }
}

export async function deleteCertificateAction(id: number) {
  try {
    await requireAdmin();

    // 1. Delete the record where the numeric primary key matches
    await db.delete(certificates).where(eq(certificates.id, id));

    // 2. Clear the cache for the dashboard
    revalidatePath('/admin/dashboard');

    return {
      success: true,
      message: 'Certificate record deleted successfully.',
    };
  } catch (error) {
    console.error('Failed to delete certificate:', error);
    return {
      success: false,
      message: 'An error occurred while trying to delete the record.',
    };
  }
}

export interface UpdateCertificateInput {
  id: number; // The numeric DB primary key
  certificateId: string; // Updated from studentId
  role: string;          // Added role field
  name: string;
  courseName: string;
  batchNo: string;
  startDate: string;
  endDate: string;
}

export async function updateCertificateAction(data: UpdateCertificateInput) {
  try {
    await requireAdmin();

    // 1. Update the record where the numeric primary key matches
    const [updatedCertificate] = await db
      .update(certificates)
      .set({
        certificateId: data.certificateId.trim(), // Updated from studentId
        role: data.role,                          // Added role field
        name: data.name.trim(),
        courseName: data.courseName.trim(),
        batchNo: data.batchNo.trim(),
        startDate: data.startDate,
        endDate: data.endDate,
        updatedAt: new Date(),
      })
      .where(eq(certificates.id, data.id))
      .returning();

    if (!updatedCertificate) {
      return {
        success: false,
        message: 'An unexpected error occurred while updating the record.',
      };
    }

    // 2. Clear the cache
    revalidatePath('/admin/dashboard');

    return {
      success: true,
      message: 'Certificate record updated successfully.',
      certificate: updatedCertificate,
    };
  } catch (error) {
    console.error('Failed to update certificate:', error);

    // Handle specific database errors
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return { 
        success: false, 
        message: 'A certificate with this ID already exists. Please choose a unique Certificate ID.' 
      };
    }

    return {
      success: false,
      message: 'An unexpected error occurred while updating the record.',
    };
  }
}

export async function verifyStudentAccess(studentId: string, courseTitle: string) {
  try {
    if (!studentId || studentId.trim() === '') {
      return { success: false, message: 'Student ID is required.' };
    }

    // 1. Query the database to see if the student ID exists
      // Look for the record where the certificateId column matches the input
    const [studentRecord] = await db
      .select()
      .from(certificates)
      .where(eq(certificates.certificateId, studentId.trim()))
      .limit(1);
  

    if (!studentRecord) {
      return { 
        success: false, 
        message: 'Invalid Student ID. Please ensure you are enrolled or contact administration.' 
      };
    }

    // 2. Return the success state along with the YouTube playlist URL
    // You can customize this URL based on the courseTitle if you have multiple playlists
    const playlistUrl = "https://www.youtube.com/playlist?list=PLQBhqUP90F0Q";

    return { 
      success: true, 
      url: playlistUrl, 
      message: 'Verification successful!' 
    };

  } catch (error) {
    console.error('Failed to verify student:', error);
    return { success: false, message: 'An error occurred during verification.' };
  }
}