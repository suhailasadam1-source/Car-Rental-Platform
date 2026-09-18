import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Clock3,
  Wallet,
  Headset,
  Search,
  CalendarCheck,
  Car as CarIcon,
  Star,
  ArrowRight,
} from "lucide-react";
import Hero from "../components/Hero";
import CarCard from "../components/CarCard";
import CarCardSkeleton from "../components/CarCardSkeleton";
import { fetchCars } from "../lib/api";
import type { Car } from "../types/car";

const features = [
  {
    icon: ShieldCheck,
    title: "Fully insured fleet",
    desc: "Every vehicle is inspected and covered by comprehensive insurance for total peace of mind.",
  },
  {
    icon: Wallet,
    title: "Transparent pricing",
    desc: "The price you see is the price you pay — no surprise fees at pickup or drop-off.",
  },
  {
    icon: Clock3,
    title: "Instant booking",
    desc: "Reserve a car in under a minute and get confirmation immediately, 24/7.",
  },
  {
    icon: Headset,
    title: "24/7 roadside support",
    desc: "Our support team and roadside assistance are one call away, wherever you are.",
  },
];

const steps = [
  { icon: Search, title: "Search", desc: "Choose your location and dates to see available vehicles nearby." },
  { icon: CarIcon, title: "Select", desc: "Compare cars by price, category, and features to find your fit." },
  { icon: CalendarCheck, title: "Book", desc: "Confirm your details and reserve instantly — no paperwork lines." },
];

const testimonials = [
  {
    name: "Amara O.",
    role: "Frequent traveler",
    quote: "Booking took less than two minutes and the Tesla was spotless at pickup. This is how car rental should work.",
  },
  {
    name: "Daniel K.",
    role: "Weekend road-tripper",
    quote: "Transparent pricing, no last-minute add-ons. I've rented three times now and it's been smooth every time.",
  },
  {
    name: "Priya S.",
    role: "Business traveler",
    quote: "The airport pickup was seamless and the BMW was exactly as pictured. Highly recommend for business trips.",
  },
];

export default function Home() {
  const [cars, setCars] = useState<Car[] | null>(null);

  useEffect(() => {
    let active = true;
    fetchCars({ sort: "rating" }).then((data) => {
      if (active) setCars(data.slice(0, 4));
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <Hero />

      {/* Features */}
      <section className="section container-px mx-auto max-w-7xl pt-40 sm:pt-24 lg:pt-32">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="card p-6 transition-shadow hover:shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <f.icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-sm font-bold text-ink-900">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured cars */}
      <section className="section container-px mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">Top rated</span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">
              Popular vehicles this week
            </h2>
          </div>
          <Link to="/cars" className="btn-secondary">
            View all cars <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cars === null
            ? Array.from({ length: 4 }).map((_, i) => <CarCardSkeleton key={i} />)
            : cars.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-ink-900">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-400">Simple process</span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
              Booking your car takes 3 steps
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg">
                  <s.icon size={24} />
                </div>
                <p className="mt-4 text-xs font-bold text-brand-400">STEP {i + 1}</p>
                <h3 className="mt-1 font-display text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/cars" className="btn-primary">
              Start Booking Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section container-px mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">Testimonials</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">
            Loved by thousands of renters
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6">
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">"{t.quote}"</p>
              <div className="mt-5 border-t border-ink-100 pt-4">
                <p className="text-sm font-bold text-ink-900">{t.name}</p>
                <p className="text-xs text-ink-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-px mx-auto max-w-7xl pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-brand-600 px-8 py-14 text-center sm:px-16">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <h2 className="relative font-display text-2xl font-extrabold text-white sm:text-3xl">
            Ready to hit the road?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-brand-50">
            Browse our fleet and get behind the wheel of your next ride in minutes.
          </p>
          <Link to="/cars" className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-lg transition-transform hover:scale-105">
            Explore the Fleet <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
