import express from "express";
import cors from "cors";
import carsRouter from "./routes/cars.js";
import bookingsRouter from "./routes/bookings.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "car-rental-backend" });
});

app.use("/api/cars", carsRouter);
app.use("/api/bookings", bookingsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Car Rental backend running on http://localhost:${PORT}`);
});
