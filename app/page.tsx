'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import PixelCastle from '@/components/PixelCastle';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';

// Import komponen 3D secara dinamis agar tidak error saat SSR
const MagicBook3D = dynamic(() => import('@/components/MagicBook3D'), { 
  ssr: false,
  loading: () => <div className="h-[600px] flex items-center justify-center text-[#d4af37] font-garamond animate-pulse">Memuat Buku Sihir...</div>
});

export default function HomePage() {
  const router = useRouter();
  
  // ==========================================
  // STATE 1: COUNTDOWN ULANG TAHUN (Section 1)
  // ==========================================
  // GANTI TANGGAL ULANG TAHUN DI SINI
  const targetDate = new Date('2026-12-21T00:00:00+07:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: false
  });

  // ==========================================
  // STATE 2: COUNTDOWN AKHIR 2026 (Section 7)
  // ==========================================
  const [finalCountdown, setFinalCountdown] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Effect 1: Countdown Ulang Tahun
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: true });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isTimeUp: false,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Effect 2: Countdown Akhir 2026 (31 Desember 2026, 23:59:59)
  useEffect(() => {
    const finalDate = new Date('2026-12-31T23:59:59+07:00').getTime();

    const calculateFinalCountdown = () => {
      const now = new Date().getTime();
      const difference = finalDate - now;

      if (difference > 0) {
        setFinalCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateFinalCountdown();
    const timer = setInterval(calculateFinalCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        toast.info('Suara dijeda', { description: 'Ambience hutan dihentikan sementara.' });
      } else {
        audioRef.current.play();
        toast.success('Suara dinyalakan', { description: 'Selamat datang di hutan kastil.' });
      }
      setIsPlaying(!isPlaying);
    } else {
      toast.error('Audio tidak ditemukan', { description: 'Pastikan file ambience.mp3 ada di folder public.' });
    }
  };

  const handleOpenGift = () => {
    if (timeLeft.isTimeUp) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#d4af37', '#8b0000', '#ffffff'] });
      setTimeout(() => router.push('/gift'), 1000);
    }
  };

  const pad = (num: number) => String(num).padStart(2, '0');

  return (
    <main className="relative min-h-screen text-amber-50 font-cinzel selection:bg-[#8b0000] selection:text-[#fcd34d]">

      {/* AKSEN TEKS VERTIKAL KIRI */}
      <div className="fixed left-6 md:left-12 top-0 h-screen flex flex-col justify-center items-center z-40 pointer-events-none opacity-30">
        <motion.div 
          animate={{ y: ["30%", "-30%"] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex flex-col items-center gap-2 text-[#d4af37]"
        >
          <span className="text-3xl md:text-4xl my-4 drop-shadow-md">❖</span>
          <div className="flex flex-col items-center text-xl md:text-2xl font-garamond italic tracking-widest drop-shadow-md">
            {"中世の私の誕生日".split("").map((char, i) => (
              <span key={i} className={char === " " ? "h-4" : ""}>{char}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AKSEN TEKS VERTIKAL KANAN */}
      <div className="fixed right-6 md:right-12 top-0 h-screen flex flex-col justify-center items-center z-40 pointer-events-none opacity-30">
        <motion.div 
          animate={{ y: ["-30%", "30%"] }} 
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="flex flex-col items-center gap-2 text-[#d4af37]"
        >
          <div className="flex flex-col items-center text-xl md:text-2xl font-garamond italic tracking-widest drop-shadow-md">
            {"MEMORY 17TH".split("").map((char, i) => (
              <span key={i} className={char === " " ? "h-4" : ""}>{char}</span>
            ))}
          </div>
          <span className="text-3xl md:text-4xl my-4 drop-shadow-md">❖</span>
        </motion.div>
      </div>
      
      <PixelCastle />

      {/* TOMBOL AUDIO */}
      <button 
        onClick={toggleAudio}
        style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}
        className="pointer-events-auto px-4 py-2 bg-black/80 border border-[#d4af37]/50 text-[#d4af37] hover:bg-black hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all text-sm tracking-widest backdrop-blur-md rounded-sm"
      >
        {isPlaying ? '❖ SUARA: NYALA' : '❖ SUARA: MATI'}
      </button>

      <audio ref={audioRef} src="/ambience.mp3" loop />

      {/* SECTION 1: COUNTDOWN ULANG TAHUN */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl w-full flex flex-col items-center text-center space-y-8"
        >
          <div className="space-y-2">
            <motion.h1 
              animate={{ textShadow: ["0px 0px 10px rgba(212,175,55,0.3)", "0px 0px 30px rgba(212,175,55,0.8)", "0px 0px 10px rgba(212,175,55,0.3)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.15em] text-[#fcd34d] leading-tight"
            >
              中世の私の誕生日<br/>
            </motion.h1>
            <div className="flex items-center justify-center gap-4 opacity-70 py-2">
              <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-[#d4af37]" />
              <span className="text-[#d4af37] text-xl">❖</span>
              <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </div>
            <p className="text-amber-100/80 text-xl md:text-2xl max-w-xl mx-auto tracking-wide font-garamond italic leading-relaxed">
              {timeLeft.isTimeUp ? "Waktu telah tiba. Gerbang kerajaan siap dibuka." : "Sebuah warisan kuno sedang menunggumu di balik gerbang."}
            </p>
          </div>

          {/* Countdown 3D dengan Efek Hover Bersamaan */}
          <div className="relative mt-12 group perspective-[1000px]">
            
            {/* Tooltip 3D (Muncul saat area countdown di-hover) */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:-translate-y-4 pointer-events-none z-30">
              <div className="bg-[#1a120b] border-2 border-[#d4af37] px-8 py-3 rounded-sm shadow-[0_0_30px_rgba(212,175,55,0.6)] relative text-center">
                <p className="text-[#fcd34d] font-garamond text-xl md:text-2xl italic whitespace-nowrap">
                  {targetDate ? new Date(targetDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                </p>
                <p className="text-amber-100/60 font-garamond text-sm md:text-base mt-1">
                  Pukul 00:00 WIB
                </p>
                {/* Segitiga Penunjuk */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1a120b] border-b-2 border-r-2 border-[#d4af37] transform rotate-45" />
              </div>
            </div>

            {/* Kotak Angka (Bergerak Bersamaan) */}
            <div className="flex justify-center gap-3 md:gap-6 transition-all duration-500 group-hover:-translate-y-2">
              {[
                { label: 'Hari', value: timeLeft.days },
                { label: 'Jam', value: timeLeft.hours },
                { label: 'Menit', value: timeLeft.minutes },
                { label: 'Detik', value: timeLeft.seconds }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center relative">
                  <div className="relative w-16 h-24 md:w-24 md:h-32 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/40 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 group-hover:border-[#d4af37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#d4af37]/60" />
                    <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#d4af37]/60" />
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#d4af37]/60" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#d4af37]/60" />
                    
                    {/* Angka dengan Efek 3D (Z-index) */}
                    <span className="text-3xl md:text-5xl font-cinzel text-[#fcd34d] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-transform duration-500 group-hover:scale-110">
                      {pad(item.value)}
                    </span>
                  </div>
                  
                  <span className="mt-3 text-sm md:text-base text-[#d4af37] tracking-[0.2em] uppercase font-garamond transition-all duration-500 group-hover:text-[#fcd34d]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

                    {/* Tombol BUKA GERBANG / TERKUNCI dengan Efek Getar */}
          <motion.div
            animate={timeLeft.isTimeUp ? {} : { x: [0, -5, 5, -5, 5, 0] }} // Animasi getar
            transition={{ duration: 0.4 }}
            className="mt-6"
          >
            <button 
              onClick={() => {
                if (timeLeft.isTimeUp) {
                  handleOpenGift();
                } else {
                  // Jika belum waktunya, getarkan tombol
                  const btn = document.getElementById('locked-btn');
                  if (btn) {
                    btn.classList.add('animate-shake');
                    setTimeout(() => btn.classList.remove('animate-shake'), 400);
                  }
                }
              }}
              id="locked-btn"
              className={`px-10 py-4 font-cinzel text-sm md:text-base tracking-[0.2em] transition-all duration-700 border rounded-sm ${
                timeLeft.isTimeUp 
                  ? 'bg-[#8b0000]/80 border-[#d4af37] text-[#fcd34d] hover:bg-[#8b0000] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] cursor-pointer' 
                  : 'bg-black/50 border-[#d4af37]/20 text-amber-900/50 cursor-not-allowed'
              }`}
            >
              {timeLeft.isTimeUp ? 'BUKA GERBANG' : 'TERKUNCI'}
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 text-[#d4af37]/60 flex flex-col items-center gap-1 font-garamond"
        >
          <span className="text-sm tracking-widest uppercase">Gulir ke Bawah</span>
          <span className="text-2xl">↓</span>
        </motion.div>
      </section>

      {/* SECTION 2: BUKU 3D */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#0a0502] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.1)_0%,_transparent_70%)] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full max-w-5xl flex justify-center"
        >
          <MagicBook3D />
        </motion.div>
      </section>

      {/* ========================================= */}
      {/* SECTION 3: PETA PERJALANAN KUNO (REAL MAP) */}
      {/* ========================================= */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#0a0502] overflow-hidden">
        
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] opacity-40 mix-blend-multiply pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full max-w-[1200px]"
        >
          <div className="text-center mb-8 relative z-20">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-[#d4af37] tracking-widest drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]">
              PETA TAKDIR
            </h2>
          </div>

          {/* KERTAS PETA LANDSCAPE */}
          <div className="relative bg-[#e6d5b8] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 border-[#3e2723] rounded-sm overflow-hidden aspect-[16/10] md:aspect-[21/9]">
            
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49.8%,rgba(92,64,51,0.15)_50%,transparent_50.2%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_49.8%,rgba(92,64,51,0.15)_50%,transparent_50.2%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-60 mix-blend-multiply pointer-events-none" />

            <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-[#5c4033] rounded-tl-sm pointer-events-none z-20" />
            <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-[#5c4033] rounded-tr-sm pointer-events-none z-20" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-[#5c4033] rounded-bl-sm pointer-events-none z-20" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-[#5c4033] rounded-br-sm pointer-events-none z-20" />

            {/* HIASAN PETA */}
            <div className="absolute top-[10%] left-[5%] opacity-30 pointer-events-none w-48 h-32">
              <svg viewBox="0 0 200 100" className="w-full h-full stroke-[#5c4033] stroke-2 fill-none">
                <path d="M 10,90 L 50,20 L 90,90" />
                <path d="M 40,45 L 50,35 L 60,45" />
                <path d="M 60,90 L 110,10 L 160,90" />
                <path d="M 95,40 L 110,25 L 125,40" />
              </svg>
            </div>

            <div className="absolute bottom-[10%] right-[20%] opacity-30 pointer-events-none w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#5c4033] stroke-2 fill-none">
                <polygon points="30,80 15,50 25,50 10,25 50,25 35,50 45,50" />
                <path d="M 30,80 L 30,90" />
                <polygon points="70,70 55,40 65,40 50,15 90,15 75,40 85,40" />
              </svg>
            </div>

            <div className="absolute top-[15%] right-[5%] opacity-20 pointer-events-none w-48 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#5c4033] stroke-2 fill-none">
                <path d="M 10,80 Q 20,50 30,70 T 50,60 T 70,70 T 90,40" />
                <path d="M 90,40 L 80,35 L 85,45 Z" fill="#5c4033" />
                <path d="M 10,80 Q 0,90 5,70" />
              </svg>
            </div>

            <div className="absolute bottom-10 right-10 w-24 h-24 opacity-30 pointer-events-none hidden md:block">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#3e2723]">
                <polygon points="50,0 55,45 100,50 55,55 50,100 45,55 0,50 45,45" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#3e2723" strokeWidth="2" />
              </svg>
            </div>

            {/* GARIS RUTE TITIK-TITIK */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block" preserveAspectRatio="none">
              <path 
                d="M 150,350 C 250,200 450,400 600,250 C 750,100 850,300 1050,150" 
                fill="none" 
                stroke="#8b0000" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeDasharray="0 12" 
                opacity="0.5"
              />
            </svg>

            {/* TULISAN LANGSUNG DI PETA */}
            <div className="relative w-full h-full hidden md:block z-10">
              
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute top-[50%] left-[5%] w-64 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d4c4a8] border-2 border-[#5c4033] rounded-full flex items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform">
                    <span className="text-lg">⛺</span>
                  </div>
                  <div className="font-garamond">
                    <h3 className="text-[#8b0000] font-bold text-2xl leading-none mb-1">2009</h3>
                    <h4 className="text-[#3e2723] font-bold text-xl leading-none">Awal Mula</h4>
                    <p className="text-[#5c4033] italic text-sm mt-1">Terlahir ke dunia.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="absolute top-[20%] left-[25%] w-64 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d4c4a8] border-2 border-[#5c4033] rounded-full flex items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform">
                    <span className="text-lg">⚙️</span>
                  </div>
                  <div className="font-garamond">
                    <h3 className="text-[#8b0000] font-bold text-2xl leading-none mb-1">2023</h3>
                    <h4 className="text-[#3e2723] font-bold text-xl leading-none">Artefak IoT</h4>
                    <p className="text-[#5c4033] italic text-sm mt-1">Merakit Arduino.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} className="absolute top-[60%] left-[45%] w-64 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d4c4a8] border-2 border-[#5c4033] rounded-full flex items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform">
                    <span className="text-lg">🏰</span>
                  </div>
                  <div className="font-garamond">
                    <h3 className="text-[#8b0000] font-bold text-2xl leading-none mb-1">2025</h3>
                    <h4 className="text-[#3e2723] font-bold text-xl leading-none">Akademi</h4>
                    <p className="text-[#5c4033] italic text-sm mt-1">Masuk SMK RPL.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="absolute top-[25%] left-[65%] w-64 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d4c4a8] border-2 border-[#5c4033] rounded-full flex items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform">
                    <span className="text-lg">📡</span>
                  </div>
                  <div className="font-garamond">
                    <h3 className="text-[#8b0000] font-bold text-2xl leading-none mb-1">2026</h3>
                    <h4 className="text-[#3e2723] font-bold text-xl leading-none">Ramalan RFID</h4>
                    <p className="text-[#5c4033] italic text-sm mt-1">Hardware & DB.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="absolute top-[50%] right-[15%] w-64 group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#8b0000] border-2 border-[#d4af37] rounded-full flex items-center justify-center shadow-lg z-10 animate-pulse group-hover:scale-110 transition-transform">
                    <span className="text-xl">🔥</span>
                  </div>
                  <div className="font-garamond">
                    <h3 className="text-[#8b0000] font-bold text-2xl leading-none mb-1">Masa Depan</h3>
                    <h4 className="text-[#3e2723] font-bold text-xl leading-none">Perisai Siber</h4>
                    <p className="text-[#5c4033] italic text-sm mt-1">Pelindung Data.</p>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* TAMPILAN MOBILE */}
            <div className="md:hidden w-full h-full overflow-y-auto flex flex-col gap-8 py-4 z-10 relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 border-l-4 border-dotted border-[#8b0000] opacity-40" />
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 shrink-0 bg-[#d4c4a8] border-2 border-[#5c4033] rounded-full flex items-center justify-center z-10"><span className="text-xl">⛺</span></div>
                <div className="font-garamond"><h3 className="text-[#8b0000] font-bold text-lg">2009</h3><p className="text-base italic">Awal Mula Kehidupan</p></div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 shrink-0 bg-[#d4c4a8] border-2 border-[#5c4033] rounded-full flex items-center justify-center z-10"><span className="text-xl">⚙️</span></div>
                <div className="font-garamond"><h3 className="text-[#8b0000] font-bold text-lg">2023</h3><p className="text-base italic">Artefak IoT</p></div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 shrink-0 bg-[#d4c4a8] border-2 border-[#5c4033] rounded-full flex items-center justify-center z-10"><span className="text-xl">🏰</span></div>
                <div className="font-garamond"><h3 className="text-[#8b0000] font-bold text-lg">2025</h3><p className="text-base italic">Akademi Sihir</p></div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 shrink-0 bg-[#d4c4a8] border-2 border-[#5c4033] rounded-full flex items-center justify-center z-10"><span className="text-xl">📡</span></div>
                <div className="font-garamond"><h3 className="text-[#8b0000] font-bold text-lg">2026</h3><p className="text-base italic">Ramalan RFID</p></div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 shrink-0 bg-[#8b0000] border-2 border-[#d4af37] rounded-full flex items-center justify-center z-10 animate-pulse"><span className="text-2xl">🔥</span></div>
                <div className="font-garamond"><h3 className="text-[#8b0000] font-bold text-lg">Future</h3><p className="text-base italic">Perisai Siber</p></div>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ========================================= */}
      {/* SECTION 4: PENDIDIKAN (GUILD HALL / QUEST BOARD) */}
      {/* ========================================= */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-[#0a0502] overflow-hidden border-t border-[#d4af37]/20">
        
        {/* Background Dinding Batu */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brick-wall.png')] opacity-20 mix-blend-overlay pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-6xl w-full"
        >
          {/* Papan Kayu Utama (Quest Board) */}
          <div className="relative bg-[#3e2723] border-[12px] border-[#1a120b] rounded-lg shadow-[0_30px_60px_rgba(0,0,0,1),inset_0_0_50px_rgba(0,0,0,0.8)] p-6 md:p-12">
            
            {/* Paku Kayu di Sudut Papan */}
            <div className="absolute top-3 left-3 w-5 h-5 bg-[#888] rounded-full shadow-inner border-2 border-black" />
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#888] rounded-full shadow-inner border-2 border-black" />
            <div className="absolute bottom-3 left-3 w-5 h-5 bg-[#888] rounded-full shadow-inner border-2 border-black" />
            <div className="absolute bottom-3 right-3 w-5 h-5 bg-[#888] rounded-full shadow-inner border-2 border-black" />

            {/* Judul Papan Misi */}
            <div className="text-center mb-12 relative">
              <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-[#fcd34d] tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
                GUILD AKADEMI
              </h2>
              <p className="text-amber-200/70 font-garamond text-xl md:text-2xl italic mt-2">
                Riwayat penempaan ilmu sang Penyihir Kode.
              </p>
            </div>

            {/* Grid Papan Misi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              {/* MISI 1: SMP BINA MULIA (Favorit) */}
              <motion.div 
                initial={{ opacity: 0, rotate: -2, y: 20 }}
                whileInView={{ opacity: 1, rotate: -1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative bg-[#e6d5b8] p-6 shadow-[0_0_40px_rgba(212,175,55,0.3)] border-4 border-[#d4af37] flex flex-col"
              >
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#d4af37] blur-sm" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#d4af37] rounded-full shadow-md border-2 border-[#8b6508] z-20" />
                
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-[#8b0000] text-[#fcd34d] font-cinzel text-sm mb-2 animate-pulse font-bold tracking-widest shadow-lg">⭐ SEKOLAH FAVORIT ⭐</span>
                  <h3 className="text-3xl font-medieval text-[#3e2723] border-b-2 border-[#8b0000] pb-2">SMP BINA MULIA</h3>
                </div>

                <div className="w-full h-40 border-4 border-[#d4af37] bg-[#1a120b] mb-4 relative overflow-hidden group">
                   <img 
                    src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T9me1Aexnjvru4cKQGDypB1XCmz6uvCapXqTdTrcvu3pPVM5z5X3L7_ILtBadeYG4MXGCoBySKmzslDH1QNs1ZLjP85zpbzSoW9K-CGFKt0mgco9XuRWHu6gnhcE-F4HjcHXw=s680-w680-h510-rw" 
                    alt="SMP" 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <p className="text-[#3e2723] font-garamond font-bold italic text-lg leading-relaxed mb-4">
                  "Tempat di mana semuanya berasal. Awal mula aku menemukan ketertarikan pada teknologi dan mimpi besar."
                </p>

                <div className="mt-auto flex flex-col gap-2 border-t border-[#3e2723]/30 pt-3 text-[#3e2723] font-cinzel text-sm font-bold">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">LEVEL: <span className="text-lg text-[#8b0000]">99</span></span>
                    <span className="flex items-center gap-1">STATUS: <span className="text-green-700">COMPLETED</span></span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>INFORMASI: Membangun dasar logika & karakter.</span>
                    <span className="text-[#d4af37] text-base">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </motion.div>

              {/* MISI 2: SMK RPL (Sekolah Saat Ini) */}
              <motion.div 
                initial={{ opacity: 0, rotate: 2, y: 20 }}
                whileInView={{ opacity: 1, rotate: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative bg-[#d4c4a8] p-6 shadow-2xl border-4 border-[#5c4033] flex flex-col"
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#555] rounded-full shadow-md border-2 border-[#2c1e16] z-20" />
                
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-[#5c4033] text-[#d4af37] font-cinzel text-sm mb-2">MASA DEPAN</span>
                  <h3 className="text-2xl font-medieval text-[#3e2723] border-b-2 border-[#3e2723]/30 pb-2">SMK RPL</h3>
                </div>

                <div className="w-full h-40 bg-[#2c1e16] border-2 border-black mb-4 relative overflow-hidden">
                   <img 
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=500&auto=format&fit=crop" 
                    alt="SMK" 
                    className="w-full h-full object-cover sepia-[0.5] opacity-70 hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                <p className="text-[#5c4033] font-garamond italic text-base leading-relaxed mb-4">
                  "Akademi Penyihir Kode. Menempa mantra HTML, CSS, JS, hingga merangkai logika backend dan Cybersecurity."
                </p>

                <div className="mt-auto flex flex-col gap-2 border-t border-[#3e2723]/30 pt-3 text-[#3e2723] font-cinzel text-sm font-bold">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">LEVEL: <span className="text-lg text-[#8b0000]">85</span></span>
                    <span className="flex items-center gap-1">STATUS: <span className="text-amber-600">ONGOING</span></span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>INFORMASI: Menaklukkan Web Dev & Backend.</span>
                    <span className="text-[#d4af37] text-base">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================= */}
      {/* SECTION 5: GALERI FOTO KENANGAN           */}
      {/* ========================================= */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-[#050302] overflow-hidden">
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-6xl w-full"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-[#d4af37] tracking-widest drop-shadow-[0_0_20px_rgba(212,175,55,0.5)] mb-4">
              GALERI KENANGAN
            </h2>
            <p className="text-amber-100/60 font-garamond text-xl md:text-2xl italic">
              Serpihan memori yang terukir dalam waktu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Foto 1 */}
            <motion.div 
              initial={{ opacity: 0, rotate: -5, y: 50 }}
              whileInView={{ opacity: 1, rotate: -3, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-[#f4ebd9] p-4 pb-12 shadow-2xl relative group hover:rotate-0 transition-transform duration-500"
            >
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=500&auto=format&fit=crop" alt="Kenangan 1" className="w-full aspect-square object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-500" />
              <p className="absolute bottom-4 left-0 right-0 text-center font-garamond italic text-[#3e2723] text-lg">Bersama Teman Sekelas</p>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#d4af37]/60 rotate-2" />
            </motion.div>

            {/* Foto 2 */}
            <motion.div 
              initial={{ opacity: 0, rotate: 5, y: 50 }}
              whileInView={{ opacity: 1, rotate: 2, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#f4ebd9] p-4 pb-12 shadow-2xl relative group hover:rotate-0 transition-transform duration-500 md:translate-y-8"
            >
              <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=500&auto=format&fit=crop" alt="Kenangan 2" className="w-full aspect-square object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-500" />
              <p className="absolute bottom-4 left-0 right-0 text-center font-garamond italic text-[#3e2723] text-lg">Proyek Pertama</p>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#d4af37]/60 -rotate-1" />
            </motion.div>

            {/* Foto 3 */}
            <motion.div 
              initial={{ opacity: 0, rotate: -2, y: 50 }}
              whileInView={{ opacity: 1, rotate: -4, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#f4ebd9] p-4 pb-12 shadow-2xl relative group hover:rotate-0 transition-transform duration-500"
            >
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=500&auto=format&fit=crop" alt="Kenangan 3" className="w-full aspect-square object-cover sepia-[0.3] group-hover:sepia-0 transition-all duration-500" />
              <p className="absolute bottom-4 left-0 right-0 text-center font-garamond italic text-[#3e2723] text-lg">Momen Tak Terlupakan</p>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#d4af37]/60 rotate-3" />
            </motion.div>

          </div>
          
          <div className="text-center mt-20">
            <button onClick={() => router.push('/journey')} className="px-10 py-4 bg-[#8b0000] border-2 border-[#d4af37] text-[#fcd34d] font-cinzel tracking-widest hover:bg-[#a52a2a] hover:shadow-[0_0_30px_rgba(139,0,0,0.8)] transition-all duration-300">
              JELAJAHI ARSIP KENANGAN
            </button>
          </div>
        </motion.div>
      </section>

      {/* ========================================= */}
      {/* SECTION 6: AKHIR 2026 (PUNCAK TAKDIR)     */}
      {/* ========================================= */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-[#0a0502] overflow-hidden border-t border-[#d4af37]/20">
        
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-40 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_transparent_60%)] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center"
        >

          <h2 className="text-5xl md:text-7xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-b from-[#fcd34d] to-[#8b6508] tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,1)] mb-4">
            berakhirnya 2026
          </h2>
          <p className="text-amber-100/50 font-garamond text-2xl md:text-3xsm italic mb-12">
            Terimakasih untuk 2026 ini...
          </p>

          <div className="flex justify-center gap-4 md:gap-8 mb-16">
            {[
              { label: 'Hari', value: finalCountdown.days },
              { label: 'Jam', value: finalCountdown.hours },
              { label: 'Menit', value: finalCountdown.minutes },
              { label: 'Detik', value: finalCountdown.seconds }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-20 h-28 md:w-28 md:h-36 bg-[#1a120b] border-2 border-[#d4af37]/50 rounded-md flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                  <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#d4af37]" />
                  <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#d4af37]" />
                  <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#d4af37]" />
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#d4af37]" />
                  
                  <span className="text-4xl md:text-6xl font-cinzel text-[#fcd34d] drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                    {pad(item.value)}
                  </span>
                </div>
                <span className="mt-4 text-sm md:text-lg text-[#d4af37] font-garamond tracking-widest uppercase">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-amber-200/50 font-garamond text-lg md:text-xl italic max-w-2xl leading-relaxed">
            "Tahun 2026 adalah sebuah perjalanan hidup yang sangat berarti yang pernah aku jalani. ya tapi aku malah mengsia siakan alah udah mau berakhir deh 2026 bete gw"
          </p>

        </motion.div>
      </section>

      {/* ========================================= */}
      {/* SECTION 7: FOOTER PROFESIONAL             */}
      {/* ========================================= */}
      <footer className="relative z-10 bg-[#050302] border-t border-[#d4af37]/20 pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Bagian Atas Footer (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Kolom 1: Brand / Judul */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-cinzel font-bold text-[#fcd34d] tracking-widest mb-4 drop-shadow-md">
                magical world
              </h3>
              <p className="text-amber-100/60 font-garamond italic text-lg leading-relaxed max-w-sm">
                Sebuah ruang digital yang menyimpan kenangan, perjalanan, dan mimpi dari seorang Penyihir Kode. Ditempa dengan ketekunan, dihiasi dengan keajaiban.
              </p>
              
              {/* Ikon Sosial Media*/}
              <div className="flex gap-4 mt-6">
                <a href="https://github.com/qanziz47-coder" target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a120b] transition-all rounded-sm">
                  {/* Ikon GitHub */}
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="https://www.instagram.com/fajri_hafz" className="w-10 h-10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a120b] transition-all rounded-sm">
                  {/* Ikon Instagram */}
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>

            {/* Kolom 2: Navigasi Cepat */}
            <div>
              <h4 className="text-xl font-cinzel text-[#d4af37] mb-4 tracking-widest">Eksplorasi</h4>
              <ul className="space-y-3 font-garamond text-lg text-amber-100/70">
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#fcd34d] transition-colors">Gerbang Utama</button></li>
                <li><button onClick={() => router.push('/journey')} className="hover:text-[#fcd34d] transition-colors">Peta Kenangan</button></li>
                <li><button onClick={() => router.push('/letter')} className="hover:text-[#fcd34d] transition-colors">Surat Rahasia</button></li>
                <li><button onClick={() => router.push('/wishes')} className="hover:text-[#fcd34d] transition-colors">Buku Tamu</button></li>
              </ul>
            </div>

            {/* Kolom 3: Informasi */}
            <div>
              <h4 className="text-xl font-cinzel text-[#d4af37] mb-4 tracking-widest">Informasi</h4>
              <ul className="space-y-3 font-garamond text-lg text-amber-100/70">
                <li>website utama: <span className="text-[#fcd34d]">hafzdev.web.id</span></li>
                <li>Lokasi: <span className="text-[#fcd34d]">Di planet mars</span></li>
                <li>Tahun Credit: <span className="text-[#fcd34d]">2026</span></li>
                <li>Status: <span className="text-[#fcd34d]">masih sekolah </span></li>
              </ul>
            </div>
          </div>

          {/* Garis Pemisah */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mb-8" />

          {/* Bagian Bawah (Copyright & Quote) */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-amber-900/60 font-cinzel text-sm tracking-widest">
              © 2026 hafzdev.web.id. ALL RIGHTS RESERVED.
            </p>
            <p className="text-amber-100/40 font-garamond italic text-sm">
              "Aku akan menguasai dunia menggunakan ilmu sihirku hahaha. bercanda :)"
            </p>
          </div>

        </div>
      </footer>

    </main>
  );
}