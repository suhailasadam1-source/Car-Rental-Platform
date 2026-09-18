import { Router } from "express";
import { randomUUID } from "crypto";

// In-memory store (swap for a real database in production)
const bookings = [];

const router = Router();

router.post("/", (req, res) => {
  const {
    carId,
    pickupLocation,
    dropoffLocation,
    pickupDate,
    dropoffDate,
    driverName,
    driverEmail,
    driverPhone,
    totalPrice,
  } = req.body;

  if (!carId || !pickupDate || !dropoffDate || !driverName || !driverEmail) {
    return res.status(400).json({ error: "Missing required booking fields" });
  }

  const booking = {
    id: randomUUID(),
    carId,
    pickupLocation,
    dropoffLocation,
    pickupDate,
    dropoffDate,
    driverName,
    driverEmail,
    driverPhone,
    totalPrice,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);
  res.status(201).json(booking);
});

router.get("/", (req, res) => {
  res.json({ count: bookings.length, bookings });
});

router.get("/:id", (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  res.json(booking);
});

export default router;
