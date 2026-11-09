'use client';

import dynamic from 'next/dynamic';

// Import komponen galeri 3D
const FloatingGallery = dynamic(() => import('@/components/FloatingGallery'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#0b0b1a] flex items-center justify-center text-white">
      Memuat kenangan...
    </div>
  ),
});

export default function GalleryPage() {
  return (
    <main className="w-full h-screen overflow-hidden">
      <FloatingGallery />
    </main>
  );
}