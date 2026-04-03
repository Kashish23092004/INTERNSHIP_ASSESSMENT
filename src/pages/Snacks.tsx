import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChefHat } from "lucide-react";
import { getSnacks } from "../api/api";
import { useStore } from "../store/useStore";
import SnackCard from "../components/SnackCard";
import type { Snack } from "../types";

const MOCK_SNACKS: Snack[] = [
  { id: 1, name: "Masala Fries", price: 40, ordersCount: 128, image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d" },
  { id: 2, name: "Veg Burger", price: 65, ordersCount: 96, image: "https://images.unsplash.com/photo-1586816001966-79b736744398" },
  { id: 3, name: "Cold Coffee", price: 45, ordersCount: 214, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735" },
  { id: 4, name: "Paneer Roll", price: 55, ordersCount: 73, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8" },
  { id: 5, name: "Samosa", price: 20, ordersCount: 341, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950" },
  { id: 6, name: "Mango Shake", price: 50, ordersCount: 187, image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4" },
];

export default function Snacks() {
  const { snacks, setSnacks } = useStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["snacks"],
    queryFn: getSnacks,
    retry: 1,
  });

  useEffect(() => {
    if (data && data.length > 0) setSnacks(data);
    else if (isError || (data && data.length === 0)) setSnacks(MOCK_SNACKS);
  }, [data, isError]);

  const displaySnacks = snacks.length > 0 ? snacks : MOCK_SNACKS;

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-8 py-10 pb-20">
      {/* Header */}
      <div className="flex items-start justify-between mb-10 animate-slideUp">
        <div>
          <h1 className="font-syne font-extrabold text-4xl flex items-center gap-3">
            <ChefHat size={32} /> Today's Menu
          </h1>
          <p className="text-muted mt-1.5 text-[15px]">Fresh picks from the canteen 🔥</p>
        </div>
        {isError && (
          <div className="text-[11px] bg-yellow/10 text-yellow border border-yellow/30 px-3 py-1.5 rounded-full">
            Using demo data (API offline)
          </div>
        )}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-surface border border-border rounded-2xl overflow-hidden">
              <div className="h-44 skeleton-shimmer" />
              <div className="p-4 space-y-3">
                <div className="h-3 w-3/5 rounded-full skeleton-shimmer" />
                <div className="h-3 w-2/5 rounded-full skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySnacks.map((s) => <SnackCard key={s.id} snack={s} />)}
        </div>
      )}
    </div>
  );
}