import React from "react";
import { useState } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import type { Snack } from "../types";
import { createOrder } from "../api/api";
import { useStore } from "../store/useStore";

interface Props {
  snack: Snack;
  onClose: () => void;
}

export default function OrderModal({ snack, onClose }: Props) {
  const { students, addOrder } = useStore();
  const [studentId, setStudentId] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!studentId) return toast.error("Please select a student!");

    const order = {
      id: Date.now(),
      studentId: Number(studentId),
      snackId: snack.id,
      snackName: snack.name,
      quantity: qty,
      total: snack.price * qty,
      createdAt: new Date().toISOString(),
    };

    setLoading(true);
    try {
      await createOrder(order);
    } catch {
      // API offline — saved locally below
    } finally {
      addOrder(order);
      toast.success(`Order placed! ₹${order.total}`);
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn" onClick={onClose}>
      <div className="bg-surface border border-border rounded-3xl w-[90%] max-w-md relative animate-modalIn" onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-surface2 border border-border text-muted hover:text-white hover:border-orange transition-all"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-border">
          <div className="w-18 h-18 rounded-xl overflow-hidden flex-shrink-0 w-16 h-16">
            <img
              src={`${snack.image}?w=200&q=80`}
              alt={snack.name}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80"; }}
            />
          </div>
          <div>
            <h2 className="font-syne font-bold text-xl">{snack.name}</h2>
            <p className="text-orange text-sm font-medium mt-1">₹{snack.price} per item</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Student select */}
          <div>
            <label className="block text-[11px] font-semibold text-muted uppercase tracking-widest mb-2">Select Student</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-3 bg-surface2 border border-border rounded-xl text-sm text-white outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all appearance-none cursor-pointer"
            >
              <option value="">-- Choose a student --</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.referralCode})</option>
              ))}
            </select>
            {students.length === 0 && (
              <p className="text-yellow text-xs mt-1.5">No students yet — add one on the Students page!</p>
            )}
          </div>

          {/* Qty */}
          <div>
            <label className="block text-[11px] font-semibold text-muted uppercase tracking-widest mb-2">Quantity (1–5)</label>
            <div className="flex items-center bg-surface2 border border-border rounded-xl overflow-hidden w-fit">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-muted hover:text-orange hover:bg-border transition-all">
                <Minus size={13} />
              </button>
              <span className="w-12 text-center font-syne font-bold text-lg">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(5, q + 1))} className="w-10 h-10 flex items-center justify-center text-muted hover:text-orange hover:bg-border transition-all">
                <Plus size={13} />
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center px-4 py-3.5 bg-surface2 border border-border rounded-xl">
            <span className="text-muted font-medium">Total</span>
            <span className="font-syne font-extrabold text-2xl text-orange">₹{snack.price * qty}</span>
          </div>

          {/* Submit */}
          <button
            onClick={handleOrder}
            disabled={loading}
            className="w-full py-3.5 flex items-center justify-center gap-2 bg-gradient-to-r from-orange to-orange-light text-white font-syne font-bold text-[15px] rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,107,53,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={16} />
            {loading ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}