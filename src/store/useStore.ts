import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Snack, Student, Order } from "../types";

interface StoreState {
  snacks: Snack[];
  students: Student[];
  orders: Order[];
  setSnacks: (data: Snack[]) => void;
  setStudents: (data: Student[]) => void;
  setOrders: (data: Order[]) => void;
  addStudent: (student: Student) => void;
  addOrder: (order: Order) => void;
  getStudentOrders: (studentId: number) => Order[];
  getStudentTotal: (studentId: number) => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      snacks: [],
      students: [],
      orders: [],
      setSnacks: (data) => set({ snacks: data }),
      setStudents: (data) => set({ students: data }),
      setOrders: (data) => set({ orders: data }),
      addStudent: (student) =>
        set((state) => ({ students: [...state.students, student] })),
      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
      getStudentOrders: (studentId) =>
        get().orders.filter((o) => Number(o.studentId) === Number(studentId)),
      getStudentTotal: (studentId) =>
        get()
          .orders.filter((o) => Number(o.studentId) === Number(studentId))
          .reduce((sum, o) => sum + o.total, 0),
    }),
    { name: "canteen-storage" }
  )
);