import { Link } from "react-router-dom";
import { Car, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-950 text-ink-300">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Car size={18} strokeWidth={2.5} />
              </span>
              Velora
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-400">
              Premium car rentals made simple. Transparent pricing, verified fleet, and 24/7 roadside support.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-800 text-ink-400 transition-colors hover:border-brand-500 hover:text-brand-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Explore</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/cars" className="hover:text-white">Browse Cars</Link></li>
              <li><Link to="/cars?category=Electric" className="hover:text-white">Electric Vehicles</Link></li>
              <li><Link to="/cars?category=Luxury" className="hover:text-white">Luxury Fleet</Link></li>
              <li><Link to="/cars?category=SUV" className="hover:text-white">SUVs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white">How It Works</Link></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone size={15} /> (800) 555-1234</li>
              <li className="flex items-center gap-2"><Mail size={15} /> support@velora.com</li>
              <li className="flex items-center gap-2"><MapPin size={15} /> 120 Fleet Ave, Metro City</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-8 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Velora Rentals. All rights reserved.</p>
          <p>Built with React, TypeScript &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
