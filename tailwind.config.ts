import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090A0F",
        surface: "#12131C",
        "surface-card": "#181926",
        "surface-border": "#27293D",
        primary: {
          DEFAULT: "#6366F1",
          hover: "#4F46E5",
          glow: "rgba(99, 102, 241, 0.25)",
        },
        accent: {
          purple: "#A855F7",
          cyan: "#06B6D4",
          amber: "#F59E0B",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-cabinet)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-flow": "glow 6s ease infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
