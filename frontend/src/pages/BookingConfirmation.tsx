import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CheckCircle2, Calendar, MapPin, Mail, Download, Home } from "lucide-react";
import type { Car, BookingRecord } from "../types/car";
import { fetchCarById } from "../lib/api";

interface LocationState {
  booking?: BookingRecord;
  car?: Car;
}

export default function BookingConfirmation() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = (location.state as LocationState) || {};
  const [car, setCar] = useState<Car | null>(state.car ?? null);
  const booking = state.booking;

  useEffect(() => {
    if (!car && booking?.carId) {
      fetchCarById(booking.carId).then(setCar);
    }
    window.scrollTo(0, 0);
  }, []);

  if (!booking) {
    return (
      <div className="container-px mx-auto max-w-xl py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-ink-900">Booking details unavailable</h1>
        <p className="mt-2 text-sm text-ink-500">
          We couldn't find this booking in your session. Please check your confirmation email.
        </p>
        <Link to="/cars" className="btn-primary mt-6 inline-flex">Browse cars</Link>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-2xl py-14 sm:py-20">
      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={32} />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">Booking confirmed!</h1>
        <p className="mt-2 text-sm text-ink-500">
          Confirmation #{booking.id.slice(0, 8).toUpperCase()} · A copy has been sent to {booking.driverEmail}
        </p>
      </div>

      <div className="card mt-8 overflow-hidden">
        {car && (
          <div className="flex items-center gap-4 border-b border-ink-100 bg-ink-50 p-5">
            <img src={car.images[0]} alt="" className="h-16 w-24 rounded-lg object-cover" />
            <div>
              <p className="font-display text-base font-bold text-ink-900">{car.make} {car.model}</p>
              <p className="text-xs text-ink-500">{car.year} · {car.category}</p>
            </div>
            <span className="ml-auto chip border-emerald-200 bg-emerald-50 text-emerald-700">{booking.status}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 shrink-0 text-brand-600" />
            <div>
              <p className="text-xs text-ink-500">Pick-up</p>
              <p className="text-sm font-semibold text-ink-900">{booking.pickupLocation}</p>
              <p className="text-xs text-ink-500">{booking.pickupDate}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 shrink-0 text-brand-600" />
            <div>
              <p className="text-xs text-ink-500">Drop-off</p>
              <p className="text-sm font-semibold text-ink-900">{booking.dropoffLocation}</p>
              <p className="text-xs text-ink-500">{booking.dropoffDate}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar size={18} className="mt-0.5 shrink-0 text-brand-600" />
            <div>
              <p className="text-xs text-ink-500">Driver</p>
              <p className="text-sm font-semibold text-ink-900">{booking.driverName}</p>
              <p className="text-xs text-ink-500">{booking.driverPhone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 shrink-0 text-brand-600" />
            <div>
              <p className="text-xs text-ink-500">Contact email</p>
              <p className="text-sm font-semibold text-ink-900">{booking.driverEmail}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-ink-100 p-5">
          <span className="text-sm text-ink-500">Total paid</span>
          <span className="font-display text-xl font-extrabold text-ink-900">${booking.totalPrice}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button onClick={() => window.print()} className="btn-secondary flex-1">
          <Download size={16} /> Download receipt
        </button>
        <Link to="/" className="btn-primary flex-1">
          <Home size={16} /> Back to home
        </Link>
      </div>
    </div>
  );
}
