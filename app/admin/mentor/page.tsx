"use client";

import React, { useState, KeyboardEvent, useTransition, useEffect } from "react";
import {
  Users,
  Award,
  BookOpen,
  Search,
  Plus,
  Edit,
  Trash2,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import { 
  addMentor, 
  getMentors, 
  updateMentor, 
  deleteMentor 
} from "@/lib/action/mentor"; // Ensure all actions are exported from this file
import SideBar from "@/components/admin/SideBar";

const DEFAULT_FORM_STATE = {
  name: "",
  roleTitle: "",
  designation: "",
  yearsExperience: "",
  studentsCoached: "",
  rating: "",
  avatarUrl: "",
  specialties: [] as string[],
  biography: "",
};

export default function MentorAdminPage() {
  // State for Real Data
  const [mentors, setMentors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for UI interactions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Controlled form state
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  const [tagInput, setTagInput] = useState("");
  const [isPending, startTransition] = useTransition();

  // --- DATA FETCHING ---
  const loadMentors = async () => {
    setIsLoading(true);
    try {
      const result = await getMentors();
      if (result?.success && result.data) {
        setMentors(result.data);
      }
    } catch (error) {
      console.error("Failed to load mentors", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMentors();
  }, []);

  // --- STAT CALCULATIONS ---
  const totalMentors = mentors.length;
  const avgExperience = totalMentors > 0 
    ? Math.round(mentors.reduce((acc, curr) => acc + (curr.yearsExperience || 0), 0) / totalMentors) 
    : 0;
  const avgRating = totalMentors > 0 
    ? (mentors.reduce((acc, curr) => acc + parseFloat(curr.rating || 0), 0) / totalMentors).toFixed(2) 
    : "0.00";

  // --- FILTERING ---
  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.roleTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.specialties?.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // --- HANDLERS ---
  const handleOpenModal = (mentor: any = null) => {
    if (mentor) {
      setEditingId(mentor.id);
      setFormData({
        name: mentor.name,
        roleTitle: mentor.roleTitle || "",
        designation: mentor.designation || "",
        yearsExperience: mentor.yearsExperience?.toString() || "",
        studentsCoached: mentor.studentsCoached?.toString() || "",
        rating: mentor.rating?.toString() || "",
        avatarUrl: mentor.avatarUrl || "",
        specialties: mentor.specialties || [],
        biography: mentor.biography || "",
      });
    } else {
      setEditingId(null);
      setFormData(DEFAULT_FORM_STATE);
    }
    setTagInput("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setFormData(DEFAULT_FORM_STATE);
      setEditingId(null);
    }, 200); 
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- TAGS INPUT LOGIC ---
  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formData.specialties.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          specialties: [...prev.specialties, newTag],
        }));
      }
      setTagInput("");
    } else if (
      e.key === "Backspace" &&
      tagInput === "" &&
      formData.specialties.length > 0
    ) {
      setFormData((prev) => ({
        ...prev,
        specialties: prev.specialties.slice(0, -1),
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((tag) => tag !== tagToRemove),
    }));
  };

  // --- SUBMIT HANDLER (ADD & UPDATE) ---
  const handleSaveMentor = () => {
    startTransition(async () => {
      if (editingId) {
        const result = await updateMentor(editingId, formData);
        
        if (result.success) {
          handleCloseModal();
          await loadMentors(); 
        } else {
          alert(result.error);
        }
      } else {
        const result = await addMentor(formData);

        if (result.success) {
          handleCloseModal();
          await loadMentors(); 
        } else {
          alert(result.error);
        }
      }
    });
  };

  // --- DELETE HANDLER ---
  const handleDeleteMentor = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this mentor? This action cannot be undone.")) {
      const result = await deleteMentor(id);
      if (result.success) {
        await loadMentors(); // Refresh list after deletion
      } else {
        alert(result.error);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] text-slate-800 font-sans">
      {/* --- SIDEBAR --- */}
     <SideBar/>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1a2942]">
              Mentor Administration
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Manage mentor profiles, specialties, and experience records.
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#2a6663] text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-[#20524f] transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add New Mentor
          </button>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-1">
                Total Mentors
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {isLoading ? "-" : totalMentors}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-1">
                Avg. Experience
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {isLoading ? "-" : `${avgExperience} Yrs`}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-lg">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-1">
                Avg. Rating
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {isLoading ? "-" : avgRating}
              </p>
            </div>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search mentor name, role, or specialty..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2a6663]/20 focus:border-[#2a6663] transition-all bg-slate-50 focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filteredMentors.length}
              </span>{" "}
              entries
            </p>
          </div>

          <div className="overflow-x-auto min-h-[300px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#2a6663]" />
                <p className="text-sm">Loading mentors...</p>
              </div>
            ) : filteredMentors.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <p className="text-sm">No mentors found matching your search.</p>
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50/80 text-xs text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Mentor Info</th>
                    <th className="px-6 py-4">Role & Designation</th>
                    <th className="px-6 py-4">Stats</th>
                    <th className="px-6 py-4">Specialties</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMentors.map((mentor) => (
                    <tr
                      key={mentor.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={mentor.avatarUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                            alt={mentor.name}
                            className="w-10 h-10 rounded-full bg-slate-200 object-cover border border-slate-200 shadow-sm"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
                            }}
                          />
                          <div>
                            <p className="font-semibold text-slate-800">
                              {mentor.name}
                            </p>
                            <p
                              className="text-xs text-slate-500 line-clamp-1 w-48 mt-0.5"
                              title={mentor.biography}
                            >
                              {mentor.biography || "No biography provided."}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-700">
                          {mentor.roleTitle || "-"}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {mentor.designation || "-"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600 mb-1.5">
                          <Award className="w-3.5 h-3.5 text-teal-600" />
                          <span className="text-xs font-medium">
                            {mentor.yearsExperience || 0}+ Yrs Exp
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Users className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-xs font-medium">
                            {(mentor.studentsCoached || 0).toLocaleString()}+ Students
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {mentor.specialties && mentor.specialties.length > 0 ? mentor.specialties.map((spec: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md border border-slate-200/60"
                            >
                              {spec}
                            </span>
                          )) : (
                            <span className="text-xs text-slate-400 italic">None</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleOpenModal(mentor)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMentor(mentor.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50 rounded-b-xl">
            <button
              className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-white bg-transparent disabled:opacity-50 transition-colors"
              disabled
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-sm text-slate-500">
              Page <span className="font-semibold text-slate-700">1</span> of 1
            </span>
            <button
              className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-white bg-transparent disabled:opacity-50 transition-colors"
              disabled
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* --- ADD/EDIT MENTOR MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-slate-900/5">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <h3 className="text-lg font-bold text-slate-800">
                {editingId ? "Edit Mentor Profile" : "Add New Mentor"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Basic Info */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#2a6663] focus:ring-1 focus:ring-[#2a6663] bg-slate-50 focus:bg-white transition-colors"
                    placeholder="e.g. Ataher Jamil"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Role Title
                  </label>
                  <input
                    name="roleTitle"
                    value={formData.roleTitle}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#2a6663] focus:ring-1 focus:ring-[#2a6663] bg-slate-50 focus:bg-white transition-colors"
                    placeholder="e.g. Lead Office Specialist"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Designation
                  </label>
                  <input
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#2a6663] focus:ring-1 focus:ring-[#2a6663] bg-slate-50 focus:bg-white transition-colors"
                    placeholder="e.g. Founder & Lead Trainer"
                  />
                </div>

                {/* Stats */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Years Experience
                  </label>
                  <input
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                    type="number"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#2a6663] focus:ring-1 focus:ring-[#2a6663] bg-slate-50 focus:bg-white transition-colors"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Students Coached
                  </label>
                  <input
                    name="studentsCoached"
                    value={formData.studentsCoached}
                    onChange={handleInputChange}
                    type="number"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#2a6663] focus:ring-1 focus:ring-[#2a6663] bg-slate-50 focus:bg-white transition-colors"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Rating (Out of 5.0)
                  </label>
                  <input
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    type="number"
                    step="0.1"
                    max="5"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#2a6663] focus:ring-1 focus:ring-[#2a6663] bg-slate-50 focus:bg-white transition-colors"
                    placeholder="0.0"
                  />
                </div>

                {/* Image Preview & URL Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Avatar URL
                  </label>
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shadow-inner">
                      {formData.avatarUrl ? (
                        <img
                          src={formData.avatarUrl}
                          alt="Avatar Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "";
                          }}
                        />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <input
                      name="avatarUrl"
                      value={formData.avatarUrl}
                      onChange={handleInputChange}
                      type="text"
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#2a6663] focus:ring-1 focus:ring-[#2a6663] bg-slate-50 focus:bg-white transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Specialties Tags Input */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex justify-between items-center">
                    <span>Specialties</span>
                    <span className="text-[10px] text-slate-400 font-normal normal-case">
                      Press Enter to add
                    </span>
                  </label>

                  <div className="flex flex-wrap items-center gap-2 p-2 border border-slate-200 rounded-lg bg-slate-50 focus-within:bg-white focus-within:border-[#2a6663] focus-within:ring-1 focus-within:ring-[#2a6663] transition-all min-h-[42px]">
                    {formData.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-white text-slate-700 text-xs font-medium rounded-md border border-slate-200 shadow-sm"
                      >
                        {spec}
                        <button
                          type="button"
                          onClick={() => removeTag(spec)}
                          className="text-slate-400 hover:text-rose-500 focus:outline-none transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      className="flex-1 min-w-[120px] text-sm focus:outline-none bg-transparent py-0.5"
                      placeholder={
                        formData.specialties.length === 0
                          ? "Type a skill e.g. React, Excel..."
                          : ""
                      }
                    />
                  </div>
                </div>

                {/* Biography */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Biography
                  </label>
                  <textarea
                    name="biography"
                    value={formData.biography}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#2a6663] focus:ring-1 focus:ring-[#2a6663] bg-slate-50 focus:bg-white resize-none transition-colors"
                    placeholder="Write a short bio..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveMentor}
                disabled={isPending}
                className="px-6 py-2.5 text-sm font-medium text-white bg-[#2a6663] rounded-lg hover:bg-[#20524f] transition-all shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-70"
              >
                {isPending
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Create Mentor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}