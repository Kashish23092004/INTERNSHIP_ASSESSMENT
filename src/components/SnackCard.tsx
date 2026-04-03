import { useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import type { Snack } from "../types";
import OrderModal from "./OrderModal";

const FALLBACKS: Record<string, string> = {
  "Masala Fries": "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&q=80",
  "Veg Burger": "https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&q=80",
  "Cold Coffee": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
  "Paneer Roll": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80",
  "Samosa": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",
  "Mango Shake": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&q=80",
};

interface Props {
  snack: Snack;
}

export default function SnackCard({ snack }: Props) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const imgSrc = imgError
    ? FALLBACKS[snack.name] ?? "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80"
    : `${snack.image}?w=400&q=80`;

  return (
    <>
      <div className="bg-surface border border-border rounded-2xl overflow-hidden card-hover animate-cardIn cursor-pointer group">
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={imgSrc}
            alt={snack.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/70 to-transparent" />
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-orange text-white text-[10px] font-semibold px-2.5 py-1 rounded-full animate-pulse2">
            <Star size={9} fill="currentColor" /> Popular
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <h2 className="font-syne font-bold text-[17px]">{snack.name}</h2>
            <span className="text-[11px] text-muted mt-0.5 whitespace-nowrap">🔥 {snack.ordersCount} orders</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-syne font-extrabold text-2xl text-orange">₹{snack.price}</span>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-orange to-orange-light text-white text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,107,53,0.35)]"
            >
              <ShoppingCart size={13} /> Order Now
            </button>
          </div>
        </div>
      </div>

      {open && <OrderModal snack={snack} onClose={() => setOpen(false)} />}
    </>
  );
}