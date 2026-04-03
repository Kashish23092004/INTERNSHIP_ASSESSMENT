import { useForm } from "react-hook-form";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { createStudent } from "../api/api";
import { useStore } from "../store/useStore";
import type { CreateStudentInput } from "../types";

export default function CreateStudent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateStudentInput>();

  const { addStudent } = useStore();

  const onSubmit = async (data: CreateStudentInput) => {
    const newStudent = {
      id: Date.now(),
      name: data.name.trim(),
      referralCode: "EDZ" + Math.floor(Math.random() * 90000 + 10000),
      createdAt: new Date().toISOString(),
    };
    try {
      await createStudent(newStudent);
    } catch {
      // API offline — save locally
    }
    addStudent(newStudent);
    toast.success(`${newStudent.name} added! 🎉`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div>
        <input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" },
          })}
          placeholder="Enter student name..."
          className={`w-full px-4 py-3 bg-surface2 border rounded-xl text-sm text-white placeholder-muted outline-none transition-all font-dm ${
            errors.name
              ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-border focus:border-orange focus:ring-2 focus:ring-orange/20"
          }`}
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green to-[#04a87e] text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(6,214,160,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <UserPlus size={15} />
        {isSubmitting ? "Adding..." : "Add Student"}
      </button>
    </form>
  );
}