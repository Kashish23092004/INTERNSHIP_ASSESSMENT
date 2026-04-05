import React from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { getStudents } from "../api/api";
import { useStore } from "../store/useStore";
import StudentCard from "../components/StudentCard";
import CreateStudent from "../components/CreateStudent";

export default function Students() {
  const { students, setStudents } = useStore();

  const { data, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    retry: 1,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const apiIds = data.map((s) => s.id);
      const localOnly = students.filter((s) => !apiIds.includes(s.id));
      setStudents([...data, ...localOnly]);
    }
  }, [data]);

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-8 py-10 pb-20">
      {/* Header */}
      <div className="flex items-start justify-between mb-10 animate-slideUp">
        <div>
          <h1 className="font-syne font-extrabold text-4xl flex items-center gap-3">
            <Users size={32} /> Students
          </h1>
          <p className="text-muted mt-1.5 text-[15px]">{students.length} registered students</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
        {/* Create Panel */}
        <div className="bg-surface border border-border rounded-2xl p-6 sticky top-20 animate-slideUp">
          <h2 className="font-syne font-bold text-sm uppercase tracking-widest text-muted mb-4">Add New Student</h2>
          <CreateStudent />
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 rounded-2xl skeleton-shimmer" />
              ))}
            </>
          ) : students.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted text-center">
              <span className="text-5xl animate-float">🎓</span>
              <p>No students yet. Add your first one!</p>
            </div>
          ) : (
            students.map((s, i) => <StudentCard key={s.id} student={s} index={i} />)
          )}
        </div>
      </div>
    </div>
  );
}