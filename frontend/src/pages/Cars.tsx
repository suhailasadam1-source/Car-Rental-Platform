import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, CarFront } from "lucide-react";
import CarCard from "../components/CarCard";
import CarCardSkeleton from "../components/CarCardSkeleton";
import FilterSidebar from "../components/FilterSidebar";
import { fetchCars } from "../lib/api";
import type { Car, CarFilters } from "../types/car";

export default function Cars() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[] | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");

  const filters: CarFilters = useMemo(
    () => ({
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "All",
      type: searchParams.get("type") || "All",
      transmission: searchParams.get("transmission") || "All",
      location: searchParams.get("location") || "All",
      seats: searchParams.get("seats") ? Number(searchParams.get("seats")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      sort: (searchParams.get("sort") as CarFilters["sort"]) || "",
    }),
    [searchParams]
  );

  useEffect(() => {
    setCars(null);
    fetchCars(filters).then(setCars);
  }, [JSON.stringify(filters)]);

  function updateFilters(next: CarFilters) {
    const params = new URLSearchParams();
    Object.entries(next).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== "All") {
        params.set(key, String(value));
      }
    });
    setSearchParams(params);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateFilters({ ...filters, search: searchInput });
  }

  function clearFilters() {
    setSearchInput("");
    setSearchParams({});
  }

  return (
    <div className="container-px mx-auto max-w-7xl py-10 sm:py-14">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">Browse our fleet</h1>
        <p className="text-sm text-ink-500">
          {cars === null ? "Loading vehicles…" : `${cars.length} vehicle${cars.length === 1 ? "" : "s"} available`}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by make, model, or category…"
            className="input-field pl-11"
          />
        </form>

        <select
          value={filters.sort || ""}
          onChange={(e) => updateFilters({ ...filters, sort: e.target.value as CarFilters["sort"] })}
          className="input-field sm:w-56"
        >
          <option value="">Sort: Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>

        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="btn-secondary sm:hidden"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} onChange={updateFilters} onClear={clearFilters} resultCount={cars?.length ?? 0} />
        </div>

        <div>
          {cars === null ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <CarCardSkeleton key={i} />)}
            </div>
          ) : cars.length === 0 ? (
            <div className="card flex flex-col items-center justify-center gap-3 py-20 text-center">
              <CarFront size={40} className="text-ink-300" />
              <p className="font-display text-lg font-bold text-ink-900">No cars match your filters</p>
              <p className="max-w-sm text-sm text-ink-500">
                Try adjusting your filters or search term to see more available vehicles.
              </p>
              <button onClick={clearFilters} className="btn-secondary mt-2">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {cars.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-[86%] max-w-sm overflow-y-auto bg-ink-50 p-4 scroll-thin">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-sm font-bold text-ink-900">Filters</p>
              <button onClick={() => setMobileFiltersOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-ink-100">
                <X size={18} />
              </button>
            </div>
            <FilterSidebar filters={filters} onChange={updateFilters} onClear={clearFilters} resultCount={cars?.length ?? 0} />
          </div>
        </div>
      )}
    </div>
  );
}
