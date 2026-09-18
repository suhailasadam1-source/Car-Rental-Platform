import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Star,
  Users,
  Gauge,
  Fuel,
  Briefcase,
  DoorOpen,
  MapPin,
  Check,
  ChevronLeft,
  ShieldCheck,
} from "lucide-react";
import { fetchCarById } from "../lib/api";
import { useBooking } from "../context/BookingContext";
import type { Car } from "../types/car";

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setDraft } = useBooking();
  const [car, setCar] = useState<Car | null | undefined>(undefined);
  const [activeImage, setActiveImage] = useState(0);
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  useEffect(() => {
    if (!id) return;
    setCar(undefined);
    fetchCarById(id).then(setCar);
    window.scrollTo(0, 0);
  }, [id]);

  if (car === undefined) {
    return (
      <div className="container-px mx-auto max-w-6xl py-20">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-1/3 rounded bg-ink-100" />
          <div className="h-96 rounded-2xl bg-ink-100" />
        </div>
      </div>
    );
  }

  if (car === null) {
    return (
      <div className="container-px mx-auto max-w-3xl py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-ink-900">Car not found</h1>
        <p className="mt-2 text-sm text-ink-500">This vehicle may have been removed from the fleet.</p>
        <Link to="/cars" className="btn-primary mt-6 inline-flex">Back to fleet</Link>
      </div>
    );
  }

  const days =
    pickupDate && dropoffDate
      ? Math.max(1, Math.ceil((+new Date(dropoffDate) - +new Date(pickupDate)) / 86400000))
      : 1;
  const estTotal = days * car.pricePerDay;

  function handleReserve() {
    setDraft((d) => ({
      ...d,
      carId: car!.id,
      pickupDate: pickupDate || d.pickupDate,
      dropoffDate: dropoffDate || d.dropoffDate,
      pickupLocation: car!.location,
      dropoffLocation: car!.location,
    }));
    navigate(`/booking/${car!.id}`);
  }

  return (
    <div className="container-px mx-auto max-w-6xl py-8 sm:py-12">
      <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900">
        <ChevronLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-2xl bg-ink-100">
            <img
              src={car.images[activeImage]}
              alt={`${car.make} ${car.model}`}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          <div className="mt-3 flex gap-3">
            {car.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`overflow-hidden rounded-xl border-2 transition-colors ${
                  activeImage === i ? "border-brand-600" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="h-16 w-24 object-cover sm:h-20 sm:w-28" />
              </button>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="chip">{car.category}</span>
                <h1 className="mt-3 font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">
                  {car.make} {car.model} <span className="font-medium text-ink-400">{car.year}</span>
                </h1>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-500">
                  <MapPin size={14} /> {car.location}
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-ink-900">{car.rating}</span>
                <span className="text-xs text-ink-500">({car.reviews} reviews)</span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-ink-600">{car.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Users, label: "Seats", value: car.seats },
                { icon: DoorOpen, label: "Doors", value: car.doors },
                { icon: Gauge, label: "Transmission", value: car.transmission },
                { icon: Fuel, label: "Fuel", value: car.fuel },
              ].map((spec) => (
                <div key={spec.label} className="card p-4 text-center">
                  <spec.icon size={18} className="mx-auto text-brand-600" />
                  <p className="mt-2 text-xs text-ink-500">{spec.label}</p>
                  <p className="text-sm font-bold text-ink-900">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-display text-sm font-bold text-ink-900">Features & amenities</h3>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {car.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-ink-600">
                    <Check size={15} className="shrink-0 text-brand-600" /> {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50 p-4">
              <Briefcase size={22} className="text-brand-600" />
              <div>
                <p className="text-sm font-bold text-ink-900">{car.luggage} large bags</p>
                <p className="text-xs text-ink-500">Mileage allowance: {car.mileage}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking summary card */}
        <div>
          <div className="card sticky top-24 p-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="font-display text-3xl font-extrabold text-ink-900">${car.pricePerDay}</span>
                <span className="text-sm text-ink-500"> /day</span>
              </div>
              <span className="chip border-emerald-200 bg-emerald-50 text-emerald-700">
                {car.available ? "Available now" : "Unavailable"}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink-500">Pick-up date</span>
                <input
                  type="date"
                  value={pickupDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="input-field"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink-500">Drop-off date</span>
                <input
                  type="date"
                  value={dropoffDate}
                  min={pickupDate || new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  className="input-field"
                />
              </label>
            </div>

            <div className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-sm">
              <div className="flex justify-between text-ink-500">
                <span>${car.pricePerDay} × {days} day{days > 1 ? "s" : ""}</span>
                <span>${estTotal}</span>
              </div>
              <div className="flex justify-between text-ink-500">
                <span>Service fee</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between border-t border-ink-100 pt-2 font-bold text-ink-900">
                <span>Estimated total</span>
                <span>${estTotal}</span>
              </div>
            </div>

            <button onClick={handleReserve} disabled={!car.available} className="btn-primary mt-5 w-full">
              Reserve this car
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-400">
              <ShieldCheck size={13} /> Free cancellation up to 24h before pickup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
