import React, { createContext, useContext, useMemo, useState } from "react";

export interface BookingDraft {
  carId: string | null;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
}

interface BookingContextValue {
  draft: BookingDraft;
  setDraft: React.Dispatch<React.SetStateAction<BookingDraft>>;
  resetDraft: () => void;
}

const defaultDraft: BookingDraft = {
  carId: null,
  pickupLocation: "Downtown Hub",
  dropoffLocation: "Downtown Hub",
  pickupDate: "",
  dropoffDate: "",
};

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<BookingDraft>(defaultDraft);

  const value = useMemo(
    () => ({
      draft,
      setDraft,
      resetDraft: () => setDraft(defaultDraft),
    }),
    [draft]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
