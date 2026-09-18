import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, MapPin, Calendar, ShieldCheck, Loader2 } from "lucide-react";
import { fetchCarById, createBooking } from "../lib/api";
import { useBooking } from "../context/BookingContext";
import type { Car } from "../types/car";

export default function Booking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { draft, setDraft } = useBooking();
  const [car, setCar] = useState<Car | null | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
  });

  useEffect(() => {
    if (!id) return;
    fetchCarById(id).then((c) => {
      setCar(c);
      if (c) {
        setDraft((d) => ({
          ...d,
          carId: c.id,
          pickupLocation: d.pickupLocation || c.location,
          dropoffLocation: d.dropoffLocation || c.location,
        }));
      }
    });
    window.scrollTo(0, 0);
  }, [id]);

  if (car === undefined) {
    return <div className="container-px mx-auto max-w-3xl py-24 text-center text-sm text-ink-500">Loading booking details…</div>;
  }
  if (car === null) {
    return (
      <div className="container-px mx-auto max-w-3xl py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-ink-900">Car not found</h1>
        <button onClick={() => navigate("/cars")} className="btn-primary mt-6">Back to fleet</button>
      </div>
    );
  }

  const days =
    draft.pickupDate && draft.dropoffDate
      ? Math.max(1, Math.ceil((+new Date(draft.dropoffDate) - +new Date(draft.pickupDate)) / 86400000))
      : 1;
  const total = days * car.pricePerDay;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!draft.pickupDate || !draft.dropoffDate) {
      setError("Please select both pick-up and drop-off dates.");
      return;
    }
    if (!form.name || !form.email || !form.phone || !form.licenseNumber) {
      setError("Please fill in all driver details.");
      return;
    }

    setSubmitting(true);
    try {
      const booking = await createBooking({
        carId: car!.id,
        pickupLocation: draft.pickupLocation,
        dropoffLocation: draft.dropoffLocation,
        pickupDate: draft.pickupDate,
        dropoffDate: draft.dropoffDate,
        driverName: form.name,
        driverEmail: form.email,
        driverPhone: form.phone,
        totalPrice: total,
      });
      navigate(`/confirmation/${booking.id}`, { state: { booking, car } });
    } catch {
      setError("Something went wrong while confirming your booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-px mx-auto max-w-5xl py-8 sm:py-12">
      <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900">
        <ChevronLeft size={16} /> Back
      </button>

      <h1 className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">Complete your booking</h1>
      <p className="mt-1.5 text-sm text-ink-500">You're just a few details away from hitting the road.</p>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="font-display text-sm font-bold text-ink-900">Rental details</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                  <MapPin size={13} /> Pick-up location
                </span>
                <input
                  value={draft.pickupLocation}
                  onChange={(e) => setDraft((d) => ({ ...d, pickupLocation: e.target.value }))}
                  className="input-field"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                  <MapPin size={13} /> Drop-off location
                </span>
                <input
                  value={draft.dropoffLocation}
                  onChange={(e) => setDraft((d) => ({ ...d, dropoffLocation: e.target.value }))}
                  className="input-field"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                  <Calendar size={13} /> Pick-up date
                </span>
                <input
                  type="date"
                  value={draft.pickupDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setDraft((d) => ({ ...d, pickupDate: e.target.value }))}
                  className="input-field"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                  <Calendar size={13} /> Drop-off date
                </span>
                <input
                  type="date"
                  value={draft.dropoffDate}
                  min={draft.pickupDate || new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setDraft((d) => ({ ...d, dropoffDate: e.target.value }))}
                  className="input-field"
                  required
                />
              </label>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-sm font-bold text-ink-900">Driver details</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-ink-500">Full name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Jordan Smith"
                  className="input-field"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink-500">Email address</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="jordan@email.com"
                  className="input-field"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink-500">Phone number</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="(555) 123-4567"
                  className="input-field"
                  required
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-ink-500">Driver's license number</span>
                <input
                  value={form.licenseNumber}
                  onChange={(e) => setForm((f) => ({ ...f, licenseNumber: e.target.value }))}
                  placeholder="D1234567"
                  className="input-field"
                  required
                />
              </label>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <div className="card sticky top-24 p-6">
            <div className="flex gap-3">
              <img src={car.images[0]} alt="" className="h-16 w-20 rounded-lg object-cover" />
              <div>
                <p className="font-display text-sm font-bold text-ink-900">{car.make} {car.model}</p>
                <p className="text-xs text-ink-500">{car.year} · {car.category}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-sm">
              <div className="flex justify-between text-ink-500">
                <span>${car.pricePerDay} × {days} day{days > 1 ? "s" : ""}</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between text-ink-500">
                <span>Service fee</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between border-t border-ink-100 pt-2 font-bold text-ink-900">
                <span>Total due</span>
                <span>${total}</span>
              </div>
            </div>

            <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full">
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Confirming…
                </>
              ) : (
                "Confirm & Pay"
              )}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-400">
              <ShieldCheck size={13} /> Secure booking · Free cancellation
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
