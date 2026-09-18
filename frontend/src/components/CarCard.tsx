import { Link } from "react-router-dom";
import { Star, Users, Gauge, Fuel, ArrowUpRight } from "lucide-react";
import type { Car } from "../types/car";

export default function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  return (
    <Link
      to={`/cars/${car.id}`}
      className="group card animate-slide-up overflow-hidden opacity-0"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms`, animationFillMode: "forwards" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
        <img
          src={car.images[0]}
          alt={`${car.make} ${car.model}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="chip bg-white/95 shadow-sm">{car.category}</span>
          {car.type === "Electric" && (
            <span className="chip border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm">Electric</span>
          )}
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink-900 shadow-sm">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          {car.rating}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-base font-bold text-ink-900">
              {car.make} {car.model}
            </h3>
            <p className="text-xs text-ink-500">{car.year} · {car.location}</p>
          </div>
          <ArrowUpRight size={18} className="mt-1 shrink-0 text-ink-300 transition-colors group-hover:text-brand-600" />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-500">
          <span className="flex items-center gap-1.5">
            <Users size={14} /> {car.seats} seats
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge size={14} /> {car.transmission}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel size={14} /> {car.fuel}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-ink-100 pt-4">
          <div>
            <span className="font-display text-xl font-extrabold text-ink-900">${car.pricePerDay}</span>
            <span className="text-sm text-ink-500"> /day</span>
          </div>
          <span className="text-xs font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
