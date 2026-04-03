export interface Snack {
  id: number;
  name: string;
  price: number;
  ordersCount: number;
  image: string;
}

export interface Student {
  id: number;
  name: string;
  referralCode: string;
  createdAt?: string;
}

export interface Order {
  id: number;
  studentId: number;
  snackId: number;
  snackName: string;
  quantity: number;
  total: number;
  createdAt: string;
}

export interface CreateStudentInput {
  name: string;
}

export interface CreateOrderInput {
  studentId: number;
  snackId: number;
  snackName: string;
  quantity: number;
  total: number;
}