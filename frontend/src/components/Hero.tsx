import { ShieldCheck, Clock, BadgePercent } from "lucide-react";
import SearchBar from "./SearchBar";

const stats = [
  { label: "Vehicles in fleet", value: "1,200+" },
  { label: "Cities served", value: "38" },
  { label: "Happy renters", value: "94K" },
  { label: "Avg. rating", value: "4.8/5" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-brand-600/30 blur-[120px]" />
      <div className="absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full bg-brand-800/30 blur-[120px]" />

      <div className="container-px relative mx-auto max-w-7xl pb-24 pt-16 sm:pt-24 lg:pb-28 lg:pt-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in">
            <span className="chip border-ink-700 bg-ink-900 text-brand-300">
              <ShieldCheck size={13} /> Trusted by 94,000+ renters
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              Drive your way,
              <br />
              <span className="text-brand-400">every journey.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-300 sm:text-lg">
              From city runabouts to electric icons and weekend supercars — book a premium
              vehicle in under 60 seconds, with transparent pricing and zero hidden fees.
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-ink-300">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-brand-400" /> Instant confirmation
              </div>
              <div className="flex items-center gap-2">
                <BadgePercent size={16} className="text-brand-400" /> No hidden fees
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-400" /> Free cancellation
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-ink-800 pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-extrabold text-white">{s.value}</p>
                  <p className="mt-0.5 text-xs text-ink-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-slide-up lg:justify-self-end" style={{ animationDelay: "150ms" }}>
            <div className="overflow-hidden rounded-3xl border border-ink-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
                alt="Premium rental car"
                className="h-[340px] w-full object-cover sm:h-[420px]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-ink-100 bg-white p-4 shadow-card sm:block">
              <p className="text-xs font-medium text-ink-500">Starting from</p>
              <p className="font-display text-2xl font-extrabold text-ink-900">$45<span className="text-sm font-medium text-ink-500">/day</span></p>
            </div>
          </div>
        </div>

        <div className="relative z-10 -mb-32 mt-12 lg:-mb-40">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
