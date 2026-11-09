'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function JourneyPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen bg-[#050302] overflow-hidden flex items-center justify-center">
      
      {/* OVERLAY UCAPAN ULANG TAHUN */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0502] p-6 text-center"
      >
        {/* Background Bintang & Cahaya */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.15)_0%,_transparent_70%)] pointer-events-none" />

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-10 max-w-2xl w-full"
        >
          {/* Tanggal Lahir */}
          <p className="text-[#d4af37] font-garamond text-xl md:text-2xl italic tracking-widest mb-4">
            21 Desember 2009
          </p>

          {/* Ucapan Selamat Ulang Tahun */}
          <h1 className="text-5xl md:text-7xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#8b6508] drop-shadow-[0_0_20px_rgba(212,175,55,0.5)] mb-6">
            Selamat Ulang Tahun
          </h1>

          {/* Umur */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-8xl md:text-9xl font-cinzel font-black text-[#fcd34d] drop-shadow-[0_0_30px_rgba(212,175,55,0.8)]">
              17
            </span>
            <span className="text-2xl md:text-4xl font-garamond text-amber-100/70 italic text-left leading-tight">
              Tahun<br/>kehidupan
            </span>
          </div>

          {/* Garis Pembatas */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-8" />

          {/* Harapan / Pesan */}
          <p className="text-amber-100/80 font-garamond text-lg md:text-xl italic leading-relaxed mb-12">
            "Semoga bisa lebih baik lagi, aduhh udah mau dewasa tuchh bete gw"
          </p>

          {/* Tombol Masuk Galeri */}
          <button 
            onClick={() => router.push('/gallery')}
            className="px-10 py-4 bg-[#8b0000] border-2 border-[#d4af37] text-[#fcd34d] font-cinzel tracking-widest hover:bg-[#a52a2a] hover:shadow-[0_0_30px_rgba(139,0,0,0.8)] transition-all duration-300"
          >
            LIHAT KENANGAN →
          </button>
        </motion.div>
      </motion.div>

    </main>
  );
}