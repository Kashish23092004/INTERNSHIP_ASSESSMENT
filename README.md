<div align="center">

#  Edzy Canteen
### School Canteen Digital Ordering System

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

A polished, production-quality canteen ordering system built as part of the **Edzy Frontend Screening Task**.  
Students can browse snacks, place orders, and track spending — all with a beautiful dark UI, smooth animations, and full offline support.
## Features

| 🍔 **Snacks Menu** | Browse all snacks with real food images, price & order count |
| 🛒 **Order Modal** | Pick student + quantity (1–5), see live total before confirming |
| 🎓 **Students List** | View all students with avatars, referral codes & total spent |
| 👤 **Student Detail** | Full order history + quick-order buttons per student |
| ➕ **Create Student** | Form with validation, auto-generated referral code |
| 💾 **Offline Persistence** | All data saved to localStorage — survives page refresh |
| 🔔 **Toast Notifications** | Real-time feedback on every action |
| 💀 **Skeleton Loaders** | Shimmer placeholders on every page while data loads |
| 🌐 **Offline Fallback** | Falls back to demo data if API is unreachable |
| 📱 **Responsive** | Works on mobile, tablet, and desktop |

---

## 🛠️ Tech Stack

### Core
| Library | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 18.2 | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.3 | Type safety across all files |
| [Vite](https://vitejs.dev/) | 5.0 | Lightning-fast dev server & build tool |
| [React Router DOM](https://reactrouter.com/) | 6.21 | Client-side routing |

### State & Data
| Library | Version | Purpose |
|---|---|---|
| [Zustand](https://zustand-demo.pmnd.rs/) | 4.4 | Global state management |
| [Zustand persist](https://github.com/pmndrs/zustand#persist-middleware) | — | localStorage persistence |
| [TanStack React Query](https://tanstack.com/query/latest) | 5.17 | Server state, caching, loading/error states |
| [Axios](https://axios-http.com/) | 1.6 | HTTP client for API calls |

### Forms & UI
| Library | Version | Purpose |
|---|---|---|
| [React Hook Form](https://react-hook-form.com/) | 7.49 | Form handling & validation |
| [TailwindCSS](https://tailwindcss.com/) | 3.4 | Utility-first responsive styling |
| [Lucide React](https://lucide.dev/) | 0.383 | Icon library |
| [react-hot-toast](https://react-hot-toast.com/) | 2.4 | Toast notifications |

### Dev & Mock API
| Library | Version | Purpose |
|---|---|---|
| [json-server](https://github.com/typicode/json-server) | 0.17 | Full mock REST API from db.json |
| [concurrently](https://github.com/open-cli-tools/concurrently) | 8.2 | Run API + dev server simultaneously |

---

## Getting Started

### Prerequisites
Make sure you have these installed:
- **Node.js** v18 or higher → [Download](https://nodejs.org/)
- **npm** v9 or higher (comes with Node)

Check your versions:
```bash
