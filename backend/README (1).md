# Car Rental Backend

Minimal Express API serving car inventory and handling bookings.

## Setup

```bash
cd backend
npm install
npm run dev   # http://localhost:4000
```

## Endpoints

- `GET /api/health` — health check
- `GET /api/cars` — list cars, supports query params: `search`, `category`, `type`, `transmission`, `location`, `seats`, `minPrice`, `maxPrice`, `sort` (`price-asc` | `price-desc` | `rating`)
- `GET /api/cars/:id` — single car details
- `POST /api/bookings` — create a booking `{ carId, pickupLocation, dropoffLocation, pickupDate, dropoffDate, driverName, driverEmail, driverPhone, totalPrice }`
- `GET /api/bookings` — list bookings (in-memory, resets on restart)
- `GET /api/bookings/:id` — single booking

Data is stored in `data/cars.json`. Bookings are kept in-memory for simplicity — swap in a real database (Postgres/Mongo) for production by replacing the array in `routes/bookings.js` with actual queries.
