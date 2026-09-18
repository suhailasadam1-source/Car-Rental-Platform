import { Router } from "express";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "..", "data", "cars.json");

async function loadCars() {
  const raw = await readFile(dataPath, "utf-8");
  return JSON.parse(raw);
}

const router = Router();

// GET /api/cars?search=&category=&type=&transmission=&minPrice=&maxPrice=&seats=&location=&sort=
router.get("/", async (req, res) => {
  try {
    let cars = await loadCars();
    const {
      search,
      category,
      type,
      transmission,
      minPrice,
      maxPrice,
      seats,
      location,
      sort,
    } = req.query;

    if (search) {
      const q = String(search).toLowerCase();
      cars = cars.filter(
        (c) =>
          `${c.make} ${c.model}`.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q)
      );
    }
    if (category && category !== "All") {
      cars = cars.filter((c) => c.category === category);
    }
    if (type && type !== "All") {
      cars = cars.filter((c) => c.type === type);
    }
    if (transmission && transmission !== "All") {
      cars = cars.filter((c) => c.transmission === transmission);
    }
    if (location && location !== "All") {
      cars = cars.filter((c) => c.location === location);
    }
    if (seats) {
      cars = cars.filter((c) => c.seats >= Number(seats));
    }
    if (minPrice) {
      cars = cars.filter((c) => c.pricePerDay >= Number(minPrice));
    }
    if (maxPrice) {
      cars = cars.filter((c) => c.pricePerDay <= Number(maxPrice));
    }

    if (sort === "price-asc") cars.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === "price-desc") cars.sort((a, b) => b.pricePerDay - a.pricePerDay);
    if (sort === "rating") cars.sort((a, b) => b.rating - a.rating);

    res.json({ count: cars.length, cars });
  } catch (err) {
    res.status(500).json({ error: "Failed to load cars" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cars = await loadCars();
    const car = cars.find((c) => c.id === req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: "Failed to load car" });
  }
});

export default router;
