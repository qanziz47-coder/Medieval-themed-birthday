import type { Metadata } from "next";
import { Cinzel, MedievalSharp, EB_Garamond } from "next/font/google"; 
import "./globals.css";
import { Toaster } from 'sonner';

// Konfigurasi Font
const cinzel = Cinzel({ weight: ["400", "600", "700", "900"], subsets: ["latin"], variable: "--font-cinzel" });
const medieval = MedievalSharp({ weight: "400", subsets: ["latin"], variable: "--font-medieval" });
const garamond = EB_Garamond({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-garamond" });

export const metadata: Metadata = {
  title: "magical world | hafzdev",
  description: "Sebuah warisan kuno sedang menunggumu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${cinzel.variable} ${medieval.variable} ${garamond.variable} antialiased`}>
        {children}
        
        {/* Toaster untuk Notifikasi */}
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#1a120b',
              color: '#fcd34d',
              border: '1px solid #d4af37',
              fontFamily: 'var(--font-garamond)',
            },
          }}
        />
      </body>
    </html>
  );
}