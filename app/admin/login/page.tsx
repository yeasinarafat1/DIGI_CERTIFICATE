import Link from 'next/link';
import { connection } from 'next/server';
import { Award } from 'lucide-react';
import { AdminLoginForm } from '@/app/admin/login/AdminLoginForm';
import { CreateAdminForm } from '@/app/admin/login/CreateAdminForm';
import { hasAdmins } from '@/lib/action/admin';
import { TRAINING_CENTER_NAME } from '@/utils';

export default async function AdminLoginPage() {
  await connection();
  const adminExists = await hasAdmins();
  const setupToken = process.env.ADMIN_SETUP_TOKEN ?? '';

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Decorative Mint & Coral Watercolor Splashes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8785A] opacity-[0.08] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8FBC9A] opacity-[0.08] rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative z-10">
        {/* Banner with training center styling */}
        <div className="bg-[#1B3A5C] px-6 py-8 text-center relative">
          <Link 
            href="/"
            className="absolute left-4 top-4 text-gray-300 hover:text-white text-xs flex items-center gap-1 transition-colors"
          >
            ← Public Site
          </Link>
          
          <div className="mx-auto bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
            <Award className="w-8 h-8 text-[#8FBC9A]" />
          </div>
          <h2 className="text-white text-lg font-medium tracking-wide">
            {TRAINING_CENTER_NAME}
          </h2>
          <p className="text-gray-300 text-xs mt-1">
            Certificate Verification System
          </p>
        </div>

        {adminExists ? <AdminLoginForm /> : <CreateAdminForm setupToken={setupToken} />}
      </div>
    </div>
  );
}
