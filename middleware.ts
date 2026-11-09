import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const now = new Date().getTime();

  // ==========================================
  // TENTUKAN TANGGAL EVENT DI SINI
  // ==========================================
  const eventStart = new Date('2026-12-21T00:00:00+07:00').getTime(); // Tanggal mulai event
  const eventEnd = new Date('2027-01-05T20:28:10+07:00').getTime();   // Tanggal akhir event (misal 1 minggu setelahnya)

  // ==========================================
  // LOGIKA PEMBATASAN AKSES
  // ==========================================
  
  // 1. Jika waktu sekarang SEBELUM event dimulai
  if (now < eventStart) {
    // Jika mencoba akses rute selain halaman depan, tendang ke halaman depan (countdown)
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // 2. Jika waktu sekarang SETELAH event berakhir
  if (now > eventEnd) {
    // Tampilkan halaman "Event Berakhir" (kita akan buat filenya nanti)
    return NextResponse.rewrite(new URL('/event-ended', request.url));
  }

  // 3. Jika waktu sekarang SEDANG DALAM EVENT (antara Start dan End)
  // Izinkan akses ke semua halaman
  return NextResponse.next();
}

// Konfigurasi rute mana saja yang akan dicek oleh middleware
export const config = {
  matcher: [
    '/',
    '/gift',
    '/journey',
    '/gallery',
    '/letter',
    '/wishes',
    // Tambahkan rute lain jika ada
  ],
};