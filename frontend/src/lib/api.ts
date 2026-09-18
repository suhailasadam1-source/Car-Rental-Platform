import type { Car, CarFilters, BookingRequest, BookingRecord } from "../types/car";
import mockCars from "../data/cars.json";

// Point this at your running backend (see /backend). Falls back to local
// mock data automatically if the API is unreachable, so the UI always works.
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

function buildQuery(filters: CarFilters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== "All") {
      params.set(key, String(value));
    }
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function filterMockCars(filters: CarFilters): Car[] {
  let cars = [...(mockCars as Car[])];
  const { search, category, type, transmission, location, seats, minPrice, maxPrice, sort } = filters;

  if (search) {
    const q = search.toLowerCase();
    cars = cars.filter(
      (c) =>
        `${c.make} ${c.model}`.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q)
    );
  }
  if (category && category !== "All") cars = cars.filter((c) => c.category === category);
  if (type && type !== "All") cars = cars.filter((c) => c.type === type);
  if (transmission && transmission !== "All") cars = cars.filter((c) => c.transmission === transmission);
  if (location && location !== "All") cars = cars.filter((c) => c.location === location);
  if (seats) cars = cars.filter((c) => c.seats >= seats);
  if (minPrice !== undefined) cars = cars.filter((c) => c.pricePerDay >= minPrice);
  if (maxPrice !== undefined) cars = cars.filter((c) => c.pricePerDay <= maxPrice);

  if (sort === "price-asc") cars.sort((a, b) => a.pricePerDay - b.pricePerDay);
  if (sort === "price-desc") cars.sort((a, b) => b.pricePerDay - a.pricePerDay);
  if (sort === "rating") cars.sort((a, b) => b.rating - a.rating);

  return cars;
}

export async function fetchCars(filters: CarFilters = {}): Promise<Car[]> {
  try {
    const res = await fetch(`${API_BASE}/cars${buildQuery(filters)}`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.cars as Car[];
  } catch {
    // Backend not running — serve local mock data so the app still works.
    return filterMockCars(filters);
  }
}

export async function fetchCarById(id: string): Promise<Car | null> {
  try {
    const res = await fetch(`${API_BASE}/cars/${id}`);
    if (!res.ok) throw new Error("Not found");
    return (await res.json()) as Car;
  } catch {
    return (mockCars as Car[]).find((c) => c.id === id) ?? null;
  }
}

export async function createBooking(payload: BookingRequest): Promise<BookingRecord> {
  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Booking failed");
    return (await res.json()) as BookingRecord;
  } catch {
    // Offline fallback so the flow can still be demoed without a backend.
    return {
      ...payload,
      id: `local-${Date.now()}`,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
  }
}

export function getFilterOptions() {
  const cars = mockCars as Car[];
  const categories = Array.from(new Set(cars.map((c) => c.category))).sort();
  const types = Array.from(new Set(cars.map((c) => c.type))).sort();
  const transmissions = Array.from(new Set(cars.map((c) => c.transmission))).sort();
  const locations = Array.from(new Set(cars.map((c) => c.location))).sort();
  const maxPrice = Math.max(...cars.map((c) => c.pricePerDay));
  return { categories, types, transmissions, locations, maxPrice };
}
