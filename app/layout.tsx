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
          position="top-right" 
          toastOptions={{
            className: "font-garamond",
            style: {
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
            },
          }}
        />
      </body>
    </html>
  );
}