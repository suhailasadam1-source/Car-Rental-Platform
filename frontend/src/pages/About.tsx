import { Link } from "react-router-dom";
import { Search, CarFront, CalendarCheck, KeyRound, ShieldCheck, Wallet, Clock3, Headset, ArrowRight } from "lucide-react";

const steps = [
  { icon: Search, title: "Search your route", desc: "Enter your pick-up location and rental dates to see every available car nearby, updated in real time." },
  { icon: CarFront, title: "Compare & choose", desc: "Filter by category, transmission, fuel type, and price to find the vehicle that fits your trip." },
  { icon: CalendarCheck, title: "Book in seconds", desc: "Enter your driver details and confirm — no branch visits, no paperwork, instant confirmation." },
  { icon: KeyRound, title: "Pick up & drive", desc: "Show your confirmation and license at pick-up, do a quick walkaround, and you're on your way." },
];

const promises = [
  { icon: ShieldCheck, title: "Verified & insured", desc: "Every vehicle passes a multi-point inspection and carries full insurance coverage." },
  { icon: Wallet, title: "No hidden fees", desc: "The total you see at booking is the total you pay — taxes and fees included." },
  { icon: Clock3, title: "Flexible cancellation", desc: "Plans change. Cancel free of charge up to 24 hours before your pick-up time." },
  { icon: Headset, title: "24/7 support", desc: "Roadside assistance and live support are always a call or message away." },
];

export default function About() {
  return (
    <div>
      <section className="bg-ink-950 py-16 sm:py-20">
        <div className="container-px mx-auto max-w-4xl text-center">
          <span className="chip border-ink-700 bg-ink-900 text-brand-300">How it works</span>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Renting a car, simplified
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-300 sm:text-base">
            Velora removes the friction from car rental — transparent pricing, instant booking, and a
            fleet you can trust, all from your phone or laptop.
          </p>
        </div>
      </section>

      <section className="section container-px mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="card relative p-6">
              <span className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <s.icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-sm font-bold text-ink-900">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-ink-50">
        <div className="container-px mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">Our promise</span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">
              Why renters choose Velora
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-6 text-center shadow-soft">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <p.icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-sm font-bold text-ink-900">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-4xl py-16 text-center sm:py-20">
        <h2 className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">Ready to book your ride?</h2>
        <p className="mt-3 text-sm text-ink-500">Browse the fleet and reserve your next car in under a minute.</p>
        <Link to="/cars" className="btn-primary mt-7 inline-flex">
          Browse Cars <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
