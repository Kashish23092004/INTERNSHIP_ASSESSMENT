import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, IndianRupee, Tag, PlusCircle } from "lucide-react";
import { useStore } from "../store/useStore";
import OrderModal from "../components/OrderModal";
import type { Snack } from "../types";

const AVATARS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80",
];

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const { students, snacks, getStudentOrders, getStudentTotal } = useStore();
  const [orderSnack, setOrderSnack] = useState<Snack | null>(null);

  const student = students.find((s) => String(s.id) === id);
  const orders = getStudentOrders(Number(id));
  const total = getStudentTotal(Number(id));
  const idx = students.findIndex((s) => String(s.id) === id);
  const avatar = AVATARS[Math.abs(idx) % AVATARS.length];

  if (!student) {
    return (
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-10">
        <div className="flex flex-col items-center justify-center gap-3 py-32 text-muted">
          <span className="text-5xl">🔍</span>
          <p>Student not found.</p>
          <Link to="/students" className="flex items-center gap-1.5 text-orange text-sm mt-2 hover:underline">
            <ArrowLeft size={13} /> Back to Students
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-8 py-10 pb-20">
      {/* Back */}
      <Link to="/students" className="inline-flex items-center gap-1.5 text-muted text-sm mb-7 hover:text-orange transition-colors">
        <ArrowLeft size={13} /> Back
      </Link>

      {/* Profile Card */}
      <div className="relative flex items-center gap-6 bg-surface border border-border rounded-3xl p-7 mb-7 overflow-hidden animate-slideUp">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange to-yellow" />
        <img src={avatar} alt={student.name} className="w-24 h-24 rounded-full object-cover border-[3px] border-orange shadow-[0_0_0_5px_rgba(255,107,53,0.18)]" />
        <div>
          <h1 className="font-syne font-extrabold text-3xl mb-2">{student.name}</h1>
          <span className="inline-flex items-center gap-1.5 text-xs text-orange bg-orange/10 border border-orange/25 px-3 py-1 rounded-full">
            <Tag size={11} /> {student.referralCode}
          </span>
          <div className="flex gap-3 mt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface2 border border-border text-sm font-semibold">
              <ShoppingBag size={13} /> {orders.length} Orders
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green/10 border border-green/30 text-green text-sm font-semibold">
              <IndianRupee size={13} /> {total.toFixed(0)} Spent
            </div>
          </div>
        </div>
      </div>

      {/* Quick Order */}
      <div className="bg-surface border border-border rounded-2xl p-5 mb-6">
        <h2 className="font-syne font-bold text-sm uppercase tracking-widest text-muted mb-3">Place New Order</h2>
        <div className="flex flex-wrap gap-2">
          {snacks.slice(0, 6).map((s) => (
            <button
              key={s.id}
              onClick={() => setOrderSnack(s)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface2 border border-border text-muted text-sm hover:border-orange hover:text-orange hover:bg-orange/10 transition-all"
            >
              <PlusCircle size={12} /> {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Orders */}
      <div className="bg-surface border border-border rounded-2xl p-5">
        <h2 className="font-syne font-bold text-sm uppercase tracking-widest text-muted mb-4">Order History</h2>
        {orders.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-muted text-sm">
            <span className="text-3xl">🛒</span>
            <p>No orders yet.</p>
          </div>
        ) : (
          <div>
            {orders.map((o, i) => {
              const snack = snacks.find((s) => Number(s.id) === Number(o.snackId));
              return (
                <div key={o.id ?? i} className="flex items-center gap-4 py-3.5 border-b border-border last:border-none animate-slideUp">
                  <div className="w-9 h-9 bg-surface2 rounded-xl flex items-center justify-center text-base flex-shrink-0">🍴</div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="font-semibold text-[15px]">{snack?.name ?? o.snackName ?? "Unknown"}</span>
                    <span className="text-[11px] text-muted bg-surface2 px-2 py-0.5 rounded-full">x{o.quantity}</span>
                  </div>
                  <span className="font-syne font-bold text-base text-orange">₹{o.total}</span>
                </div>
              );
            })}
            <div className="flex justify-between items-center pt-4 mt-1 border-t border-border text-muted font-semibold">
              <span>Total Spent</span>
              <span className="font-syne font-extrabold text-2xl text-green">₹{total}</span>
            </div>
          </div>
        )}
      </div>

      {orderSnack && <OrderModal snack={orderSnack} onClose={() => setOrderSnack(null)} />}
    </div>
  );
}