import { Crown, ArrowRight, Compass } from "lucide-react";
import { Link } from "wouter";
import Seo from "@/components/Seo";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#060607] relative overflow-hidden px-4">
      <Seo
        title="This Corridor Doesn't Exist — B.N.E. Studio"
        description="The page you're looking for doesn't exist in this empire."
        noIndex={true}
      />
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 text-center max-w-xl">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center mb-8">
          <Crown className="w-10 h-10 text-[#D4AF37]" />
        </div>

        <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4">
          404 — Lost in the empire
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 tracking-tight mb-4" style={{ fontFamily: 'Space Grotesk' }}>
          This corridor doesn't exist.
        </h1>
        <p className="text-zinc-400 leading-relaxed mb-10" style={{ fontFamily: 'DM Sans' }}>
          The page you're looking for was moved, deleted, or never built.
          The empire, however, is very much open for business.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/home">
            <span className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D4AF37] text-black text-base font-bold hover:bg-[#e5c65a] transition-all cursor-pointer">
              <ArrowRight className="h-5 w-5" /> Return to the Empire
            </span>
          </Link>
          <Link href="/niche-matcher">
            <span className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/15 text-zinc-100 text-base font-semibold hover:bg-white/10 transition-all cursor-pointer">
              <Compass className="h-5 w-5" /> Find Your Niche
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
