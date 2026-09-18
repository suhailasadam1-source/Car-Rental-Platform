# Velora — Car Rental Platform

A complete, premium-feeling car rental web app: browse and filter a fleet, view detailed
car pages, and complete a full booking flow — fully responsive from mobile to desktop.

```
car-rental-platform/
├── frontend/   React + Vite + TypeScript + Tailwind + React Router
└── backend/    Express REST API (cars + bookings)
```

## Features

- **Home** — hero with live search, featured/top-rated cars, "how it works", testimonials, CTA
- **Browse cars** — search, sort, and filter by category, fuel type, transmission, location, price, and seats (desktop sidebar + mobile drawer)
- **Car details** — image gallery, specs, features list, live price calculator, "Reserve" flow
- **Booking** — rental + driver detail form with validation, live price summary
- **Confirmation** — booking summary with a printable receipt
- **Design** — custom Tailwind theme, animated transitions, skeleton loaders, empty states, fully responsive (mobile / tablet / laptop / desktop)

## Quick start

### 1. Backend

```bash
cd backend
npm install
npm run dev
```
Runs at `http://localhost:4000`. Exposes `/api/cars` and `/api/bookings`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # optional — defaults already point at localhost:4000
npm run dev
```
Runs at `http://localhost:5173`.

> The frontend works even without the backend running — `src/lib/api.ts` automatically
> falls back to local mock data (`src/data/cars.json`) if the API request fails, so you
> can preview the whole app standalone.

## Tech stack

- React 18 + Vite + TypeScript
- Tailwind CSS (custom theme: brand/ink color scales, type, shadows, motion)
- React Router v6 (nested routes, URL-synced filters)
- Lucide React icons
- Express backend with a filterable `/api/cars` endpoint and `/api/bookings` endpoint

## Where to go next

- Swap the in-memory bookings array (`backend/routes/bookings.js`) for a real database.
- Add authentication so users can view their own booking history.
- Add payment processing (Stripe) at the confirmation step.
- Add an admin view for managing fleet inventory and availability.
