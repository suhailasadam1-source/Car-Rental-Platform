import React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { getFilterOptions } from "../lib/api";
import type { CarFilters } from "../types/car";

const { categories, types, transmissions, locations, maxPrice } = getFilterOptions();

interface Props {
  filters: CarFilters;
  onChange: (filters: CarFilters) => void;
  onClear: () => void;
  resultCount: number;
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-brand-600 bg-brand-600 text-white"
          : "border-ink-200 bg-white text-ink-600 hover:border-ink-300"
      }`}
    >
      {children}
    </button>
  );
}

export default function FilterSidebar({ filters, onChange, onClear, resultCount }: Props) {
  const set = (patch: Partial<CarFilters>) => onChange({ ...filters, ...patch });

  return (
    <aside className="card sticky top-24 h-fit p-5">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-sm font-bold text-ink-900">
          <SlidersHorizontal size={16} /> Filters
        </h3>
        <button onClick={onClear} className="flex items-center gap-1 text-xs font-medium text-ink-500 hover:text-brand-600">
          <X size={13} /> Clear all
        </button>
      </div>

      <p className="mt-2 text-xs text-ink-500">{resultCount} cars match your search</p>

      <div className="mt-5 space-y-6">
        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-400">Vehicle type</p>
          <div className="flex flex-wrap gap-2">
            <Pill active={!filters.category || filters.category === "All"} onClick={() => set({ category: "All" })}>
              All
            </Pill>
            {categories.map((c) => (
              <Pill key={c} active={filters.category === c} onClick={() => set({ category: c })}>
                {c}
              </Pill>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-400">Fuel type</p>
          <div className="flex flex-wrap gap-2">
            <Pill active={!filters.type || filters.type === "All"} onClick={() => set({ type: "All" })}>
              All
            </Pill>
            {types.map((t) => (
              <Pill key={t} active={filters.type === t} onClick={() => set({ type: t })}>
                {t}
              </Pill>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-400">Transmission</p>
          <div className="flex flex-wrap gap-2">
            <Pill active={!filters.transmission || filters.transmission === "All"} onClick={() => set({ transmission: "All" })}>
              All
            </Pill>
            {transmissions.map((t) => (
              <Pill key={t} active={filters.transmission === t} onClick={() => set({ transmission: t })}>
                {t}
              </Pill>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-400">Location</p>
          <select
            value={filters.location || "All"}
            onChange={(e) => set({ location: e.target.value })}
            className="input-field text-sm"
          >
            <option value="All">Any location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-400">
            Max price: ${filters.maxPrice ?? maxPrice}/day
          </p>
          <input
            type="range"
            min={20}
            max={maxPrice}
            step={5}
            value={filters.maxPrice ?? maxPrice}
            onChange={(e) => set({ maxPrice: Number(e.target.value) })}
            className="w-full accent-brand-600"
          />
        </div>

        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-400">Minimum seats</p>
          <div className="flex flex-wrap gap-2">
            {[2, 4, 5, 7].map((s) => (
              <Pill key={s} active={filters.seats === s} onClick={() => set({ seats: filters.seats === s ? undefined : s })}>
                {s}+
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
