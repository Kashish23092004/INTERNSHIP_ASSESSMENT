/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      colors: {
        bg: "#0d0d14",
        surface: "#16161f",
        surface2: "#1e1e2e",
        border: "#2a2a3d",
        orange: "#ff6b35",
        "orange-light": "#ff8f5e",
        yellow: "#ffd166",
        green: "#06d6a0",
        muted: "#8888aa",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 1.4s infinite",
        cardIn: "cardIn 0.5s ease both",
        slideUp: "slideUp 0.5s ease both",
        modalIn: "modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
        pulse2: "pulse2 2s ease-in-out infinite",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-4px)" } },
        shimmer: { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
        cardIn: { from: { opacity: "0", transform: "translateY(24px) scale(0.96)" }, to: { opacity: "1", transform: "translateY(0) scale(1)" } },
        slideUp: { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        modalIn: { from: { opacity: "0", transform: "scale(0.85) translateY(20px)" }, to: { opacity: "1", transform: "scale(1) translateY(0)" } },
        pulse2: { "0%,100%": { boxShadow: "0 0 0 0 rgba(255,107,53,0.4)" }, "50%": { boxShadow: "0 0 0 6px rgba(255,107,53,0)" } },
      },
    },
  },
  plugins: [],
}