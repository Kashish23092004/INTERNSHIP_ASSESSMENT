import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Users } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3.5 bg-bg/85 backdrop-blur-xl border-b border-border">
      <div className="flex items-center gap-3">
        <span className="text-3xl animate-float">🍽️</span>
        <div>
          <h1 className="font-syne font-extrabold text-xl bg-gradient-to-r from-orange to-yellow bg-clip-text text-transparent leading-none">
            Edzy Canteen
          </h1>
          <p className="text-xs text-muted mt-0.5">Sector 63, Gurugram</p>
        </div>
      </div>

      <div className="flex gap-1 bg-surface border border-border rounded-full p-1">
        {[
          { to: "/", label: "Menu", Icon: ShoppingBag },
          { to: "/students", label: "Students", Icon: Users },
        ].map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              pathname === to
                ? "bg-gradient-to-r from-orange to-orange-light text-white shadow-[0_0_20px_rgba(255,107,53,0.3)]"
                : "text-muted hover:text-white hover:bg-surface2"
            }`}
          >
            <Icon size={15} /> {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}