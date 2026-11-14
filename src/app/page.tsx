import Link from 'next/link';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1A040D] via-[#2B0514] to-[#0D0206] text-[#FDFBF7] flex flex-col items-center justify-center px-4 py-16 text-center relative overflow-hidden">
      {/* Ornate Gold Background Elements */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
        <div className="w-[600px] h-[600px] rounded-full border border-[#D4AF37] border-dashed" />
      </div>

      <div className="z-10 max-w-2xl flex flex-col items-center">
        {/* Brand Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5B0E2D]/80 border border-[#D4AF37]/60 shadow-lg mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-xs uppercase tracking-[0.25em] font-serif text-[#F3D794]">
            Wedfolio Studio
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[#FDFBF7] drop-shadow-md">
          Crafting Timeless <span className="text-[#D4AF37]">Royal Weddings</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg font-serif italic text-[#E0C097] max-w-lg leading-relaxed">
          A bespoke, multi-tenant wedding website platform engineered for grandeur, sacred rituals, and unforgettable celebrations.
        </p>

        {/* Shreya & Pranshu Highlight Card */}
        <div className="mt-10 p-8 rounded-3xl bg-gradient-to-b from-[#5B0E2D]/70 to-[#3B071C]/70 border-2 border-[#D4AF37] shadow-2xl w-full max-w-md flex flex-col items-center">
          <Heart className="w-6 h-6 text-[#D4AF37] fill-current mb-2" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-serif font-semibold">
            Featured Celebration
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FDFBF7] mt-1">
            Shreya &amp; Pranshu
          </h2>
          <p className="text-xs font-serif italic text-[#F3D794] mt-1">
            Palace Garden Theme • Jaipur, Rajasthan
          </p>

          <Link
            href="/w/shreya-pranshu"
            className="mt-6 inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3D794] to-[#C9972C] text-[#420A20] font-serif font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all w-full"
          >
            <span>Enter Royal Website</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-12 text-xs font-serif text-[#D4AF37]/60 uppercase tracking-widest">
          Powered by Next.js App Router • Supabase • Motion for React
        </div>
      </div>
    </main>
  );
}
