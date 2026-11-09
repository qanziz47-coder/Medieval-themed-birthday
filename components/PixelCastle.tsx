'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PixelCastle() {
  const [dust, setDust] = useState<{ left: string; top: string; size: string; duration: number }[]>([]);

  useEffect(() => {
    const newDust = Array.from({ length: 40 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: Math.random() * 10 + 10,
    }));
    setDust(newDust);
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full z-0 bg-[#0a0502] overflow-hidden pointer-events-none"
      style={{
        backgroundImage: 'url("/kastil.jpg")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    >
      {/* CSS Khusus untuk Animasi Kain */}
      <style jsx global>{`
        @keyframes waveLeft {
          0% { transform: rotateY(0deg) skewY(0deg); }
          25% { transform: rotateY(10deg) skewY(2deg); }
          50% { transform: rotateY(0deg) skewY(0deg); }
          75% { transform: rotateY(-10deg) skewY(-2deg); }
          100% { transform: rotateY(0deg) skewY(0deg); }
        }
        @keyframes waveRight {
          0% { transform: rotateY(0deg) skewY(0deg); }
          25% { transform: rotateY(-10deg) skewY(-2deg); }
          50% { transform: rotateY(0deg) skewY(0deg); }
          75% { transform: rotateY(10deg) skewY(2deg); }
          100% { transform: rotateY(0deg) skewY(0deg); }
        }
        @keyframes flutter {
          0% { transform: scaleX(1) scaleY(1); }
          50% { transform: scaleX(0.95) scaleY(1.02); }
          100% { transform: scaleX(1) scaleY(1); }
        }
        .banner-cloth-left {
          transform-origin: top center;
          animation: waveLeft 5s ease-in-out infinite, flutter 3s ease-in-out infinite;
          backface-visibility: hidden;
        }
        .banner-cloth-right {
          transform-origin: top center;
          animation: waveRight 5.5s ease-in-out infinite, flutter 3.2s ease-in-out infinite;
          backface-visibility: hidden;
        }
      `}</style>

      {/* 1. Overlay Gelap */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 2. Cahaya Bulan */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80 pointer-events-none" />

      {/* 3. Partikel Debu Emas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dust.map((d, i) => (
          <motion.div
            key={i}
            className="absolute bg-[#fcd34d] rounded-full shadow-[0_0_8px_#d4af37]"
            style={{ width: d.size, height: d.size, left: d.left, top: d.top }}
            animate={{ y: [0, -150], x: [0, Math.random() * 50 - 25], opacity: [0, 0.8, 0] }}
            transition={{ duration: d.duration, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* ==================================================== */}
      {/* BANNER KIRI ATAS */}
      {/* ==================================================== */}
      <div className="absolute top-0 left-8 md:left-16 z-20 pointer-events-none">
        <div className="absolute -top-4 left-1/2 w-32 h-12 border-t-2 border-gray-400 rounded-t-full -translate-x-1/2" />
        
        <div className="relative w-16 md:w-20 h-3 bg-[#1a1a1a] border border-[#d4af37] rounded-full flex justify-between items-center px-1 shadow-lg z-30">
          <div className="absolute -left-2 w-3 h-3 bg-[#d4af37] rotate-45" />
          <div className="absolute -right-2 w-3 h-3 bg-[#d4af37] rotate-45" />
        </div>

        {/* Kain Bendera Kiri */}
        <div className="relative -mt-1 ml-1 w-14 md:w-18 h-32 md:h-48 z-20 perspective-[1000px]">
          <div 
            className="w-full h-full bg-[#8b0000] border-x-2 border-[#d4af37] shadow-xl flex flex-col items-center justify-start pt-4 banner-cloth-left"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)' }}
          >
            <div className="absolute inset-1 border border-black/30 pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)' }} />
            <span className="text-[#d4af37] text-2xl mt-4 drop-shadow-md">⚜</span>
            
            {/* Lipatan Kain (Efek Bayangan) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* BANNER KANAN ATAS */}
      {/* ==================================================== */}
      <div className="absolute top-0 right-8 md:right-16 z-20 pointer-events-none">
        <div className="absolute -top-4 left-1/2 w-32 h-12 border-t-2 border-gray-400 rounded-t-full -translate-x-1/2" />
        
        <div className="relative w-16 md:w-20 h-3 bg-[#1a1a1a] border border-[#d4af37] rounded-full flex justify-between items-center px-1 shadow-lg z-30">
          <div className="absolute -left-2 w-3 h-3 bg-[#d4af37] rotate-45" />
          <div className="absolute -right-2 w-3 h-3 bg-[#d4af37] rotate-45" />
        </div>

        {/* Kain Bendera Kanan */}
        <div className="relative -mt-1 ml-1 w-14 md:w-18 h-32 md:h-48 z-20 perspective-[1000px]">
          <div 
            className="w-full h-full bg-[#8b0000] border-x-2 border-[#d4af37] shadow-xl flex flex-col items-center justify-start pt-4 banner-cloth-right"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)' }}
          >
            <div className="absolute inset-1 border border-black/30 pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)' }} />
            <span className="text-[#d4af37] text-2xl mt-4 drop-shadow-md">⚜</span>
            
            {/* Lipatan Kain (Efek Bayangan) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
          </div>
        </div>
      </div>

    </div>
  );
}