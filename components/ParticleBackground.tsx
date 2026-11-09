'use client';

export default function PixelCastle() {
  return (
    <div 
      className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
      style={{
        // Gambar pixel art kastil (dari sumber gratis)
        backgroundImage: 'url("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop")',
        imageRendering: 'pixelated', // Memaksa gambar agar tetap tajam/pecah-pecah (gaya pixel)
        filter: 'sepia(0.6) hue-rotate(350deg) brightness(0.3) contrast(1.2)', // Efek malam kuning kecokelatan
      }}
    >
      {/* Lapisan Overlay Gelap agar teks lebih terbaca */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] via-transparent to-[#1a120b]/80" />
    </div>
  );
}