/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, Download, Copy, Check, QrCode } from 'lucide-react';

import { TRAINING_CENTER_NAME } from '../utils';
import { Student } from '@/lib/db/schema';

interface QRCodeModalProps {
  student: Student;
  onClose: () => void;
}

export default function QRCodeModal({ student, onClose }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Generate the actual verification link using location hash routing
  const verifyUrl = `${window.location.origin}/certificate/verify/${student.studentId}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(verifyUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Fetch the QR code image from the public API
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `QR_Verify_${student.id}_${student.name.replace(/\s+/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download QR code via fetch blob, trying fallback:', error);
      // Fallback: open in new tab
      window.open(qrImageUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden relative">
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8785A] opacity-[0.05] rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#8FBC9A] opacity-[0.05] rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="bg-[#1B3A5C] px-6 py-4 flex items-center justify-between text-white relative z-10">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#8FBC9A]" />
            <h3 className="text-md font-bold tracking-wide">Verification QR Code</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-6 relative z-10">
          <div>
            <h4 className="font-bold text-gray-800 text-base">{student.name}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{student.courseName}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">ID: {student.id}</p>
          </div>

          {/* QR Code Container */}
          <div className="mx-auto w-48 h-48 bg-[#FAF8F5] p-3 rounded-2xl border border-gray-100 flex items-center justify-center shadow-inner relative group">
            <img 
              src={qrImageUrl} 
              alt={`QR Code for ${student.name}`} 
              className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
              crossOrigin="anonymous"
              loading="lazy"
            />
          </div>

          <div className="space-y-3">
            {/* Display verification link */}
            <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-2 rounded-xl border border-gray-100">
              <span className="text-[10px] font-mono text-gray-500 truncate flex-1 text-left">
                {verifyUrl}
              </span>
              <button
                onClick={handleCopyLink}
                className="p-1.5 hover:bg-white text-gray-500 hover:text-[#2D5F5D] rounded-lg transition-all cursor-pointer border border-transparent hover:border-gray-100"
                title="Copy Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            
            <p className="text-[11px] text-gray-400 leading-relaxed px-2">
              Scan this QR code using a smartphone camera to instantly verify the authenticity of {student.name}&apos;s credentials at {TRAINING_CENTER_NAME}.
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full py-2.5 bg-[#2D5F5D] hover:bg-[#204543] text-white font-medium rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
            >
              {isDownloading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Download QR as PNG
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all text-sm cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
