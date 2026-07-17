"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ShieldCheck, AlertCircle, Compass, ArrowLeft, CheckCircle2, Award } from 'lucide-react';
import { TRAINING_CENTER_NAME } from '@/utils';
import { getCertificateByIdAction } from '@/lib/action/certificate';
import { Certificate } from '@/lib/db/schema';
import StudentCertificate from '@/components/StudentCertificate';
import MentorCertificate from '@/components/MentorCertificate';

export default function PublicVerifyPage() {
  const router = useRouter();
  const params = useParams();
  const rawId = params?.id;
  const urlId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyCredential = async () => {
      if (!urlId) {
        router.replace('/');
        return;
      }
      const result = await getCertificateByIdAction(urlId);
      if (result.success) {
        setCertificate(result.data as unknown as Certificate);
        setError(null);
      } else {
        setCertificate(null);
        setError(result.message!);
      }
      setIsLoaded(true);
    };
    verifyCredential();
  }, [urlId, router]);

  if (!isLoaded && urlId) return null;

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden px-4 py-8">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8785A] opacity-[0.07] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8FBC9A] opacity-[0.07] rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

      {/* Dynamic container width logic here */}
      <div className={`flex-1 flex items-center justify-center ${certificate ? 'max-w-2xl' : 'max-w-lg'} mx-auto w-full relative z-10 mb-8`}>
        {certificate ? (
          <div className="w-full space-y-6 animate-fade-in">
            <div className="bg-[#1E8449] text-white rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#8FBC9A]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Official Credential Verified</h3>
                </div>
              </div>
              <div className="bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono font-bold">
                ID: {certificate.certificateId}
              </div>
            </div>

            {certificate.role === 'mentor' ? (
              <MentorCertificate data={certificate} />
            ) : (
              <StudentCertificate data={certificate} />
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={() => window.print()} className="flex-1 py-3 bg-[#2D5F5D] text-white font-semibold rounded-xl text-xs shadow-md flex items-center justify-center gap-2">
                <Award className="w-4 h-4" /> Print / Save as PDF
              </button>
            </div>
          </div>
        ) : (
          /* Case: Not Found */
          <div className="w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold">Record Not Found</h3>
            <button onClick={() => router.push('/')} className="mt-4 py-2 px-6 bg-[#2D5F5D] text-white rounded-xl text-xs">Return Home</button>
          </div>
        )}
      </div>
    </div>
  );
}