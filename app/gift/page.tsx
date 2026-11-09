'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

// Import komponen 3D secara dinamis
const Cake3D = dynamic(() => import('@/components/Cake3D'), { 
  ssr: false,
  loading: () => <div className="h-screen bg-black flex items-center justify-center text-[#d4af37]">Menyiapkan Peti...</div>
});

export default function GiftPage() {
  const router = useRouter();
  const [isExploded, setIsExploded] = useState(false);

  const handleExplode = () => {
    setIsExploded(true);
    confetti({ 
      particleCount: 100, 
      spread: 100, 
      origin: { y: 0.6 }, 
      colors: ['#fcd34d', '#8b0000', '#ffffff'] 
    });
  };

  return (
    <main className="relative min-h-screen bg-[#0a0502] overflow-hidden flex items-center justify-center">
      
      {/* ========================================= */}
      {/* LATAR BELAKANG RUANG HARTA KARUN          */}
      {/* ========================================= */}
      
      {/* 1. Tekstur Dinding Batu */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brick-wall.png')] opacity-30 mix-blend-overlay pointer-events-none" />
      
      {/* 2. Lantai Kayu di Bawah */}
      <div className="absolute bottom-0 w-full h-[40%] bg-[#1a120b] border-t-8 border-[#0a0502] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
         <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-40 mix-blend-multiply" />
      </div>

      {/* 3. Cahaya Obor di Kiri & Kanan */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-[50px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/4 right-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-[50px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

      {/* ========================================= */}
      {/* FOTO-FOTO MELAYANG DI BELAKANG (MUNCUL SAAT MELEDAK) */}
      {/* ========================================= */}
      <AnimatePresence>
        {isExploded && (
          <>
            {/* Ganti URL ini dengan fotomu */}
            <motion.img
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=500&auto=format&fit=crop"
              className="absolute top-[20%] left-[10%] w-40 h-40 object-cover rounded-sm border-4 border-[#3e2723] sepia-[0.5] shadow-2xl z-0"
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ opacity: 0.4, scale: 1, rotate: -10 }}
              transition={{ delay: 1, duration: 1 }}
            />
            <motion.img
              src="https://images.unsplash.com/photo-1499336315816-097655dcfbda?q=80&w=500&auto=format&fit=crop"
              className="absolute top-[15%] right-[15%] w-48 h-48 object-cover rounded-sm border-4 border-[#3e2723] sepia-[0.5] shadow-2xl z-0"
              initial={{ opacity: 0, scale: 0, rotate: 20 }}
              animate={{ opacity: 0.4, scale: 1, rotate: 15 }}
              transition={{ delay: 1.2, duration: 1 }}
            />
             <motion.img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500&auto=format&fit=crop"
              className="absolute bottom-[25%] right-[25%] w-32 h-32 object-cover rounded-sm border-4 border-[#3e2723] sepia-[0.5] shadow-2xl z-0"
              initial={{ opacity: 0, scale: 0, rotate: -30 }}
              animate={{ opacity: 0.3, scale: 1, rotate: -15 }}
              transition={{ delay: 1.4, duration: 1 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* ========================================= */}
      {/* LAYER 3D (PETI HARTA KARUN)               */}
      {/* ========================================= */}
      <div className={`absolute inset-0 transition-opacity duration-1000 z-10`}>
        <Cake3D onExplode={handleExplode} />
      </div>

      {/* Petunjuk Klik (Hanya muncul sebelum diklik) */}
      {!isExploded && (
        <div className="absolute bottom-12 w-full text-center text-[#d4af37]/60 font-garamond italic pointer-events-none animate-pulse z-20">
          <p>Klik peti untuk membuka warisan kuno</p>
        </div>
      )}

      {/* Tombol Lanjut (Muncul setelah peti meledak) */}
      <AnimatePresence>
        {isExploded && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 z-30"
          >
            <button 
              onClick={() => router.push('/journey')}
              className="pointer-events-auto px-10 py-4 bg-[#8b0000]/80 border-2 border-[#d4af37] rounded-sm text-[#fcd34d] font-cinzel tracking-widest hover:bg-[#8b0000] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 backdrop-blur-md"
            >
              LIHAT ARSIP KERAJAAN →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}