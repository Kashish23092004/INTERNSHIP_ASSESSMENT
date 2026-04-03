import { Link } from "react-router-dom";
import { Tag, IndianRupee, ChevronRight } from "lucide-react";
import type { Student } from "../types";
import { useStore } from "../store/useStore";

const AVATARS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80",
];

interface Props {
  student: Student;
  index: number;
}

export default function StudentCard({ student, index }: Props) {
  const { getStudentTotal, getStudentOrders } = useStore();
  const total = getStudentTotal(student.id);
  const orderCount = getStudentOrders(student.id).length;
  const avatar = AVATARS[index % AVATARS.length];

  return (
    <div
      className="flex items-center gap-4 bg-surface border border-border rounded-2xl px-5 py-4 transition-all duration-200 hover:border-orange hover:translate-x-1 hover:shadow-[-4px_0_0_#ff6b35,0_8px_32px_rgba(0,0,0,0.4)] animate-cardIn"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img src={avatar} alt={student.name} className="w-13 h-13 w-12 h-12 rounded-full object-cover border-2 border-border" />
        <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-green border-2 border-bg" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-syne font-bold text-base truncate">{student.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="flex items-center gap-1 text-[10px] font-semibold bg-orange/10 text-orange border border-orange/20 px-2 py-0.5 rounded-full">
            <Tag size={9} /> {student.referralCode}
          </span>
          <span className="text-[11px] text-muted">{orderCount} orders</span>
        </div>
        <div className="flex items-center gap-1 mt-1.5 text-green text-[13px] font-semibold">
          <IndianRupee size={11} /> {total.toFixed(0)} spent
        </div>
      </div>

      {/* View */}
      <Link
        to={`/student/${student.id}`}
        className="flex items-center gap-1 px-4 py-2 rounded-full bg-surface2 border border-border text-muted text-sm font-medium hover:border-orange hover:text-orange transition-all whitespace-nowrap"
      >
        View <ChevronRight size={13} />
      </Link>
    </div>
  );
}