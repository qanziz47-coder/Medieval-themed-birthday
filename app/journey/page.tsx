'use client'; // <-- TAMBAHKAN BARIS INI

import dynamic from 'next/dynamic';

const FloatingGallery = dynamic(() => import('@/components/FloatingGallery'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#0b0b1a] flex items-center justify-center text-white">
      Memuat kenangan...
    </div>
  ),
});

export default function JourneyPage() {
  return <FloatingGallery />;
}