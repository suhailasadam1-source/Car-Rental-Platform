export type FuelType = "Petrol" | "Electric" | "Hybrid" | "Diesel";
export type Transmission = "Automatic" | "Manual";
export type Category =
  | "Economy"
  | "Sedan"
  | "SUV"
  | "Luxury"
  | "Sports"
  | "Van"
  | "Electric";

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  category: string;
  transmission: Transmission | string;
  seats: number;
  doors: number;
  luggage: number;
  fuel: string;
  pricePerDay: number;
  rating: number;
  reviews: number;
  location: string;
  mileage: string;
  features: string[];
  images: string[];
  description: string;
  available: boolean;
}

export interface CarFilters {
  search?: string;
  category?: string;
  type?: string;
  transmission?: string;
  location?: string;
  seats?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price-asc" | "price-desc" | "rating" | "";
}

export interface BookingRequest {
  carId: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  driverName: string;
  driverEmail: string;
  driverPhone: string;
  totalPrice: number;
}

export interface BookingRecord extends BookingRequest {
  id: string;
  status: string;
  createdAt: string;
}
