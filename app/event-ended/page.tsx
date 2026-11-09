export default function EventEndedPage() {
  return (
    <main className="min-h-screen bg-[#0a0502] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-lg w-full">
        <h1 className="text-5xl font-cinzel font-bold text-[#d4af37] mb-6 drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">
          Gerbang Telah Tertutup
        </h1>
        <p className="text-amber-100/70 font-garamond text-2xl italic mb-8">
          "Medieval magic ini hanya terbuka pada waktunya. Acara telah berakhir, namun kenangan akan tetap abadi."
        </p>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-8" />
        <p className="text-[#d4af37] font-cinzel tracking-widest">
          © 2026 HAFZDEV. ALL RIGHTS RESERVED.
        </p>
      </div>
    </main>
  );
}