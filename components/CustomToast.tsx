'use client';

import { CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface CustomToastProps {
  title: string;
  description?: string;
  type?: ToastType;
}

export default function CustomToast({ title, description, type = 'info' }: CustomToastProps) {
  
  // Konfigurasi Ikon dan Warna berdasarkan tipe
  const config = {
    success: { icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, border: 'border-[#d4af37]', glow: 'shadow-[0_0_20px_rgba(212,175,55,0.4)]' },
    error: { icon: <XCircle className="w-6 h-6 text-red-500" />, border: 'border-red-700', glow: 'shadow-[0_0_20px_rgba(139,0,0,0.6)]' },
    info: { icon: <Info className="w-6 h-6 text-blue-400" />, border: 'border-blue-700', glow: 'shadow-[0_0_20px_rgba(30,58,138,0.6)]' },
    warning: { icon: <AlertTriangle className="w-6 h-6 text-amber-400" />, border: 'border-amber-600', glow: 'shadow-[0_0_20px_rgba(180,83,9,0.6)]' },
  };

  const currentConfig = config[type];

  return (
    <div 
      className={`
        relative w-full max-w-sm bg-[#1a120b]/95 backdrop-blur-md 
        border-2 ${currentConfig.border} ${currentConfig.glow}
        rounded-sm p-4 flex items-start gap-4
        transform transition-all duration-300
      `}
    >
      {/* Ornamen Sudut Emas */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#d4af37]/60" />
      <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#d4af37]/60" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#d4af37]/60" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#d4af37]/60" />

      {/* Ikon */}
      <div className="shrink-0 mt-0.5">
        {currentConfig.icon}
      </div>

      {/* Teks */}
      <div className="flex flex-col">
        <span className="text-[#fcd34d] font-cinzel font-bold text-lg tracking-wider leading-tight">
          {title}
        </span>
        {description && (
          <span className="text-amber-100/70 font-garamond italic text-sm mt-1 leading-relaxed">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}