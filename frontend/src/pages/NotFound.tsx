import { Link } from "react-router-dom";
import { CarFront } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-px mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center py-24 text-center">
      <CarFront size={44} className="text-ink-300" />
      <h1 className="mt-5 font-display text-3xl font-extrabold text-ink-900">404</h1>
      <p className="mt-2 text-sm text-ink-500">
        Looks like this road doesn't lead anywhere. Let's get you back on route.
      </p>
      <Link to="/" className="btn-primary mt-7">Back to home</Link>
    </div>
  );
}
