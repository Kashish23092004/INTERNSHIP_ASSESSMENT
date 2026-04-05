import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Snacks from "./pages/Snacks";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#16161f",
            color: "#f0f0f8",
            border: "1px solid #ff6b35",
            fontFamily: "DM Sans, sans-serif",
          },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Snacks />} />
        <Route path="/students" element={<Students />} />
        <Route path="/student/:id" element={<StudentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}