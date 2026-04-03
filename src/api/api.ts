import axios from "axios";
import type { Snack, Student, Order, CreateOrderInput } from "../types";

const API = axios.create({ baseURL: "http://localhost:3000" });

export const getSnacks = async (): Promise<Snack[]> => {
  const res = await API.get<Snack[]>("/snacks");
  return res.data;
};

export const getStudents = async (): Promise<Student[]> => {
  const res = await API.get<Student[]>("/students");
  return res.data;
};

export const getStudentById = async (id: number): Promise<Student> => {
  const res = await API.get<Student>(`/students/${id}`);
  return res.data;
};

export const createStudent = async (data: Omit<Student, "id">): Promise<Student> => {
  const res = await API.post<Student>("/students", data);
  return res.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const res = await API.get<Order[]>("/orders");
  return res.data;
};

export const createOrder = async (data: CreateOrderInput): Promise<Order> => {
  const res = await API.post<Order>("/orders", data);
  return res.data;
};