import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Search } from "lucide-react";
import { getFilterOptions } from "../lib/api";

const { locations } = getFilterOptions();

export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [location, setLocation] = useState("All");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location !== "All") params.set("location", location);
    if (pickupDate) params.set("pickup", pickupDate);
    if (dropoffDate) params.set("dropoff", dropoffDate);
    navigate(`/cars?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`grid w-full grid-cols-1 gap-3 rounded-2xl bg-white p-3 shadow-card sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto] ${
        compact ? "" : "ring-1 ring-ink-100"
      }`}
    >
      <label className="flex items-center gap-3 rounded-xl border border-ink-200 px-4 py-3">
        <MapPin size={18} className="shrink-0 text-brand-600" />
        <div className="flex-1">
          <span className="block text-[11px] font-medium uppercase tracking-wide text-ink-400">Pickup location</span>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-ink-900 outline-none"
          >
            <option value="All">Any location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </label>

      <label className="flex items-center gap-3 rounded-xl border border-ink-200 px-4 py-3">
        <Calendar size={18} className="shrink-0 text-brand-600" />
        <div className="flex-1">
          <span className="block text-[11px] font-medium uppercase tracking-wide text-ink-400">Pick-up date</span>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-ink-900 outline-none"
          />
        </div>
      </label>

      <label className="flex items-center gap-3 rounded-xl border border-ink-200 px-4 py-3">
        <Calendar size={18} className="shrink-0 text-brand-600" />
        <div className="flex-1">
          <span className="block text-[11px] font-medium uppercase tracking-wide text-ink-400">Drop-off date</span>
          <input
            type="date"
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-ink-900 outline-none"
          />
        </div>
      </label>

      <button type="submit" className="btn-primary w-full lg:w-auto lg:px-6">
        <Search size={17} />
        <span className="lg:hidden">Search Cars</span>
      </button>
    </form>
  );
}
