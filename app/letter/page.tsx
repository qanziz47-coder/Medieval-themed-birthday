'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LetterPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0a0502] flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-[#8b0000] selection:text-[#fcd34d]">
      
      {/* Background Dinding Batu Gelap */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center">
        
        {/* Tombol Kembali */}
        <button 
          onClick={() => router.push('/')}
          className="absolute -top-16 left-0 text-[#d4af37]/60 hover:text-[#d4af37] font-garamond italic transition-colors"
        >
          ← Kembali ke Gerbang
        </button>

        {/* Gulungan Surat */}
        <div className="relative w-full min-h-[500px] perspective-[2000px] flex justify-center items-center mt-10">
          
          <AnimatePresence mode="wait">
            {!isOpen ? (
              // ==========================================
              // TAMPILAN GULUNGAN TERTUTUP
              // ==========================================
              <motion.div 
                key="closed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                onClick={() => setIsOpen(true)}
                className="relative cursor-pointer group flex flex-col items-center"
              >
                {/* Batang Kayu Atas */}
                <div className="w-64 h-8 bg-[#2c1e16] rounded-full border-2 border-[#1a120b] shadow-[0_5px_15px_rgba(0,0,0,0.8)] flex justify-between items-center px-2 z-20">
                  <div className="w-10 h-10 bg-[#d4af37] rounded-full border-2 border-[#8b6508] shadow-md -mt-1" />
                  <div className="w-10 h-10 bg-[#d4af37] rounded-full border-2 border-[#8b6508] shadow-md -mt-1" />
                </div>

                {/* Badan Gulungan */}
                <div className="w-48 h-64 bg-[#e6d5b8] border-x-4 border-[#d4c4a8] shadow-2xl relative -mt-4 z-10 flex flex-col items-center justify-center overflow-hidden group-hover:h-72 transition-all duration-500">
                  {/* Tekstur Kertas */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-40 mix-blend-multiply" />
                  
                  {/* Tali Emas */}
                  <div className="absolute top-1/2 left-0 w-full h-6 bg-[#8b0000] shadow-sm flex items-center justify-center border-y-2 border-[#d4af37]">
                    <span className="text-[#d4af37] text-xl">✦</span>
                  </div>

                  {/* Teks Petunjuk */}
                  <p className="absolute bottom-6 text-[#5c4033] font-garamond italic text-sm animate-pulse tracking-widest font-bold">
                    Klik untuk membuka
                  </p>
                </div>

                {/* Batang Kayu Bawah */}
                <div className="w-64 h-8 bg-[#2c1e16] rounded-full border-2 border-[#1a120b] shadow-[0_5px_15px_rgba(0,0,0,0.8)] flex justify-between items-center px-2 z-20 -mt-4">
                  <div className="w-10 h-10 bg-[#d4af37] rounded-full border-2 border-[#8b6508] shadow-md -mt-1" />
                  <div className="w-10 h-10 bg-[#d4af37] rounded-full border-2 border-[#8b6508] shadow-md -mt-1" />
                </div>
              </motion.div>
            ) : (
              // ==========================================
              // TAMPILAN SURAT TERBUKA
              // ==========================================
              <motion.div 
                key="open"
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative w-full max-w-2xl bg-[#e6d5b8] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.9)] border-4 border-[#5c4033] flex flex-col"
              >
                {/* Tekstur Kertas */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-50 mix-blend-multiply pointer-events-none" />
                
                {/* Ornamen Sudut */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#8b6508]" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#8b6508]" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#8b6508]" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#8b6508]" />

                {/* Isi Surat */}
                <div className="relative z-10 text-[#3e2723]">
                  <h1 className="text-center font-medieval text-3xl md:text-5xl mb-8 border-b-2 border-[#3e2723]/20 pb-4">
                    Surat Untukku
                  </h1>
                  
                  <p className="font-garamond text-xl md:text-2xl italic leading-relaxed mb-4">
                    Hai, Fajri.
                  </p>
                  <p className="font-garamond text-lg md:text-xl leading-relaxed mb-4 text-justify indent-8">
                    Selamat ulang tahun yang ke-17! Hari ini bukan sekadar bertambahnya angka, melainkan sebuah gerbang baru yang terbuka. Kamu telah melewati begitu banyak petualangan: dari merakit artefak kuno (Arduino), menaklukkan Akademi Sihir (SMK RPL), hingga merangkai ramalan RFID.
                  </p>
                  <p className="font-garamond text-lg md:text-xl leading-relaxed mb-4 text-justify indent-8">
                    Teruslah belajar dan jangan pernah takut untuk mencoba hal baru. Jalanmu masih panjang, dan dunia siber (Cybersecurity) menantimu untuk ditaklukkan. Jadilah penyihir kode yang tidak hanya pandai, tapi juga bijaksana.
                  </p>
                  <p className="font-garamond text-lg md:text-xl leading-relaxed mb-12 text-justify indent-8">
                    Selamat menempuh babak baru, Sang Penjelajah Waktu.
                  </p>

                  {/* Tanda Tangan */}
                  <div className="text-right mt-12">
                    <p className="font-garamond italic text-[#5c4033]">Dengan bangga,</p>
                    <p className="font-medieval text-3xl text-[#8b0000] mt-2">Fajri</p>
                  </div>
                </div>

                {/* Tombol Kembali Setelah Membaca */}
                <div className="relative z-10 mt-12 text-center">
                  <button 
                    onClick={() => router.push('/')}
                    className="px-8 py-3 bg-[#3e2723] border-2 border-[#d4af37] text-[#d4af37] font-cinzel text-sm tracking-widest hover:bg-[#2c1e16] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
                  >
                    TUTUP GULUNGAN
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}