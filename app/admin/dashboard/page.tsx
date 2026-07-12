"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Award, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  QrCode, 
  LogOut, 
  Users, 
  FolderGit, 
  GraduationCap,
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
  User,
  ExternalLink
} from 'lucide-react';

import { formatDate } from '@/utils';
import StudentFormModal from '@/components/StudentFormModal';
import QRCodeModal from '@/components/QRCodeModal';
// Added updateStudentAction to imports
import { addStudentAction, deleteStudentAction, getStudentsAction, updateStudentAction } from '@/lib/action/student';
import { Student } from '@/lib/db/schema';
import { signOut, useSession } from '@/lib/auth-client';

type SortField = 'studentId' | 'name' | 'courseName' | 'batchNo' | 'startDate' | 'endDate';
type SortOrder = 'asc' | 'desc';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [activeTab, setActiveTab] = useState<'students' | 'overview'>('students');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [sortField, setSortField] = useState<SortField>('studentId');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedQRStudent, setSelectedQRStudent] = useState<Student | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      const result = await getStudentsAction();
      if (result.success && result.data) {
        setStudents(result.data as unknown as Student[]);
      } else {
        console.error("Failed to load students:", result.message);
      }
    };
    
    loadInitialData();
  }, []);

  const totalStudents = students.length;
  const totalBatches = useMemo(() => new Set(students.map(s => s.batchNo.trim().toUpperCase())).size, [students]);
  const activeCourses = useMemo(() => new Set(students.map(s => s.courseName.trim())).size, [students]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const processedStudents = useMemo(() => {
    let result = [...students];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        String(s.studentId).toLowerCase().includes(q) || 
        s.name.toLowerCase().includes(q) ||
        s.courseName.toLowerCase().includes(q) ||
        s.batchNo.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      const valA = String(a[sortField]).toLowerCase();
      const valB = String(b[sortField]).toLowerCase();
      
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [students, searchQuery, sortField, sortOrder]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [processedStudents, currentPage]);

  const totalPages = Math.max(1, Math.ceil(processedStudents.length / itemsPerPage));

  const handleLogout = async () => {
    await signOut();
    router.push('/admin/login');
  };

  const handleSaveStudent = async (savedStudent: Student) => {
    // Check if we are in EDIT mode by seeing if the numeric DB 'id' exists
    const isEditMode = !!savedStudent.id; 
    
    if (isEditMode) {
      // --- EDIT MODE ---
      try {
        const result = await updateStudentAction({
          id: savedStudent.id, // The numeric primary key
          studentId: savedStudent.studentId, // Match schema
          name: savedStudent.name,
          courseName: savedStudent.courseName,
          batchNo: savedStudent.batchNo,
          startDate: savedStudent.startDate,
          endDate: savedStudent.endDate,
        });

        if (result.success && result.student) {
          // Replace the old record with the fresh one from the DB
          const updated = students.map(s => s.id === savedStudent.id ? (result.student as unknown as Student) : s);
          setStudents(updated);
          setIsFormModalOpen(false);
          setEditingStudent(null);
        } else {
          alert(`Failed to update: ${result.message}`);
        }
      } catch (error) {
        console.error("Error updating student:", error);
        alert("An unexpected error occurred during the update.");
      }
    } else {
      // --- ADD MODE ---
      try {
        const result = await addStudentAction({
          studentId: savedStudent.studentId, 
          name: savedStudent.name,
          courseName: savedStudent.courseName,
          batchNo: savedStudent.batchNo,
          startDate: savedStudent.startDate,
          endDate: savedStudent.endDate,
        });

        if (result.success && result.student) {
          const updated = [result.student as unknown as Student, ...students];
          setStudents(updated);
          setIsFormModalOpen(false);
          setEditingStudent(null);
        } else {
          alert(`Failed to add student: ${result.message}`);
        }
      } catch (error) {
        console.error("Error saving student:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  const handleDeleteClick = async (student: Student) => {
    if (window.confirm(`Are you sure you want to delete the certificate for ${student.name} (ID: ${student.studentId})? This action cannot be undone.`)) {
      try {
        const result = await deleteStudentAction(student.id);

        if (result.success) {
          const updated = students.filter(s => s.id !== student.id);
          setStudents(updated);
        } else {
          alert(`Failed to delete: ${result.message}`);
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("An unexpected error occurred while deleting the record.");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-[#1B3A5C] text-white flex flex-col shrink-0 md:min-h-screen">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="bg-[#FAF8F5]/10 p-2 rounded-xl backdrop-blur-sm">
                <Award className="w-6 h-6 text-[#8FBC9A]" />
              </div>
              <div>
                <h1 className="font-bold text-sm tracking-wider uppercase">Apex Registry</h1>
                <p className="text-[10px] text-gray-400">Admin Control Panel</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                activeTab === 'students' 
                  ? 'bg-[#2D5F5D] text-white shadow-md' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              Students & Credentials
            </button>

            <button
              onClick={() => router.push('/')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all text-left cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-gray-400" />
              View Public Site
            </button>
          </nav>

          <div className="p-4 border-t border-white/10 bg-[#12273F]">
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className="w-8 h-8 rounded-full bg-[#2D5F5D] flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold truncate text-white">{session?.user.name || 'Administrator'}</p>
                <p className="text-[10px] text-gray-400 truncate">{session?.user.email || 'Signed in'}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-900/30 hover:bg-red-900/50 text-red-200 hover:text-red-100 rounded-xl text-xs font-semibold transition-all border border-red-500/10 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1B3A5C] tracking-tight">
                Certificate Administration
              </h2>
              <p className="text-gray-500 text-xs mt-0.5">
                Manage student registry records, generate secure verification QR codes, and issue new certificates.
              </p>
            </div>

            <button
              onClick={() => { setEditingStudent(null); setIsFormModalOpen(true); }}
              className="self-start px-5 py-3 bg-[#2D5F5D] hover:bg-[#204543] text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer hover:shadow-lg transform active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              Add New Student
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="bg-[#1B3A5C]/5 p-4 rounded-xl text-[#1B3A5C]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Students</p>
                <h4 className="text-2xl font-bold text-[#1B3A5C] mt-0.5">{totalStudents}</h4>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="bg-[#2D5F5D]/5 p-4 rounded-xl text-[#2D5F5D]">
                <FolderGit className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Batches</p>
                <h4 className="text-2xl font-bold text-[#1B3A5C] mt-0.5">{totalBatches}</h4>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="bg-[#8FBC9A]/15 p-4 rounded-xl text-teal-800">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Active Courses</p>
                <h4 className="text-2xl font-bold text-[#1B3A5C] mt-0.5">{activeCourses}</h4>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF8F5]/30">
              <div className="relative max-w-sm w-full">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search ID, name, course or batch..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D5F5D] focus:border-[#2D5F5D] transition-all text-xs outline-none shadow-sm"
                />
              </div>
              
              <div className="text-xs text-gray-400 font-medium">
                Showing {processedStudents.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, processedStudents.length)} of {processedStudents.length} entries
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1B3A5C]/5 text-[#1B3A5C] text-[11px] font-bold uppercase tracking-wider border-b border-gray-100 select-none">
                    <th onClick={() => handleSort('studentId')} className="p-4 cursor-pointer hover:bg-gray-100/50 transition-colors">
                      <div className="flex items-center gap-1.5">Student ID <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </th>
                    <th onClick={() => handleSort('name')} className="p-4 cursor-pointer hover:bg-gray-100/50 transition-colors">
                      <div className="flex items-center gap-1.5">Full Name <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </th>
                    <th onClick={() => handleSort('courseName')} className="p-4 cursor-pointer hover:bg-gray-100/50 transition-colors">
                      <div className="flex items-center gap-1.5">Course Name <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </th>
                    <th onClick={() => handleSort('batchNo')} className="p-4 cursor-pointer hover:bg-gray-100/50 transition-colors">
                      <div className="flex items-center gap-1.5">Batch No <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </th>
                    <th onClick={() => handleSort('startDate')} className="p-4 cursor-pointer hover:bg-gray-100/50 transition-colors">
                      <div className="flex items-center gap-1.5">Start Date <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </th>
                    <th onClick={() => handleSort('endDate')} className="p-4 cursor-pointer hover:bg-gray-100/50 transition-colors">
                      <div className="flex items-center gap-1.5">End Date <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {paginatedStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-400 font-medium">
                        No matching records found.
                      </td>
                    </tr>
                  ) : (
                    paginatedStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 font-mono font-bold text-[#1B3A5C]">{student.studentId}</td>
                        <td className="p-4 font-semibold text-gray-800">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                              <User className="w-3.5 h-3.5" />
                            </div>
                            {student.name}
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 font-medium">{student.courseName}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 font-medium rounded-md">{student.batchNo}</span>
                        </td>
                        <td className="p-4 text-gray-500">{formatDate(student.startDate)}</td>
                        <td className="p-4 text-gray-500">{formatDate(student.endDate)}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => { setSelectedQRStudent(student); setIsQRModalOpen(true); }}
                              className="p-1.5 text-gray-600 hover:text-[#2D5F5D] hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                              title="Download/View QR Code"
                            >
                              <QrCode className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => { setEditingStudent(student); setIsFormModalOpen(true); }}
                              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                              title="Edit Record"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(student)}
                              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-[#FAF8F5]/30">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3.5 py-1.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous
                </button>
                <span className="text-xs text-gray-500 font-medium">
                  Page <span className="font-bold text-[#1B3A5C]">{currentPage}</span> of <span className="font-bold text-[#1B3A5C]">{totalPages}</span>
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-1.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {isFormModalOpen && (
        <StudentFormModal 
          student={editingStudent}
          existingStudents={students}
          onClose={() => setIsFormModalOpen(false)}
          onSave={handleSaveStudent}
        />
      )}

      {isQRModalOpen && selectedQRStudent && (
        <QRCodeModal 
          student={selectedQRStudent}
          onClose={() => setIsQRModalOpen(false)}
        />
      )}
    </>
  );
}
