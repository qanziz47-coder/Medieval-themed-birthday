'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function WishesPage() {
  const router = useRouter();
  const [wishes, setWishes] = useState<{name: string, message: string}[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Muat pesan dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem('royal_wishes');
    if (saved) setWishes(JSON.parse(saved));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    
    const newWishes = [...wishes, { name, message }];
    setWishes(newWishes);
    localStorage.setItem('royal_wishes', JSON.stringify(newWishes));
    
    setName('');
    setMessage('');
  };

  return (
    <main className="min-h-screen bg-[#1a120b] flex flex-col items-center py-20 px-6 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl relative z-10">
        
        <button onClick={() => router.push('/')} className="text-amber-600 hover:text-[#d4af37] font-serif mb-8 transition-colors">
          ← Kembali ke Gerbang
        </button>

        <h1 className="text-4xl md:text-5xl font-serif text-[#d4af37] text-center mb-10 tracking-widest drop-shadow-lg">
          BUKU TAMU KERAJAAN
        </h1>
        
        {/* Form Input */}
        <form onSubmit={handleSubmit} className="bg-[#2c1e16]/90 p-8 rounded-sm border-2 border-[#5c4033] shadow-[0_0_30px_rgba(0,0,0,0.8)] mb-12 backdrop-blur-sm">
          <div className="mb-5">
            <label className="block text-[#d4af37] font-serif mb-2 tracking-wider">Nama Bangsawan</label>
            <input 
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1a120b] border border-[#5c4033] text-amber-50 p-3 rounded-sm focus:outline-none focus:border-[#d4af37] font-serif"
              placeholder="Masukkan namamu..."
            />
          </div>
          <div className="mb-8">
            <label className="block text-[#d4af37] font-serif mb-2 tracking-wider">Pesan & Doa</label>
            <textarea 
              value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
              className="w-full bg-[#1a120b] border border-[#5c4033] text-amber-50 p-3 rounded-sm focus:outline-none focus:border-[#d4af37] font-serif"
              placeholder="Tuliskan doa restumu..."
            />
          </div>
          <button type="submit" className="w-full bg-[#8b0000] text-[#d4af37] font-serif tracking-widest py-4 rounded-sm border border-[#d4af37] hover:bg-[#a52a2a] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
            STEMPEL PESAN
          </button>
        </form>

        {/* Daftar Pesan */}
        <div className="space-y-4">
          {wishes.map((wish, index) => (
            <motion.div 
              key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-[#2c1e16]/80 p-6 rounded-sm border-l-4 border-[#d4af37] backdrop-blur-sm"
            >
              <p className="text-[#d4af37] font-serif font-bold text-lg">{wish.name}</p>
              <p className="text-amber-100 font-serif italic mt-2">"{wish.message}"</p>
            </motion.div>
          ))}
          {wishes.length === 0 && (
            <p className="text-center text-amber-900/60 font-serif italic">Belum ada pesan. Jadilah yang pertama menulis di buku ini!</p>
          )}
        </div>

      </motion.div>
    </main>
  );
}