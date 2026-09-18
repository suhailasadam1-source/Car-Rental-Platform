/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f7ff",
          100: "#e0ecff",
          200: "#c2d9ff",
          300: "#94bcff",
          400: "#5f96ff",
          500: "#3672ff",
          600: "#1c4ff5",
          700: "#173de1",
          800: "#1932b6",
          900: "#1a2f8f",
          950: "#131d54",
        },
        ink: {
          50: "#f6f7f9",
          100: "#ececf1",
          200: "#d5d7e0",
          300: "#b1b4c4",
          400: "#868aa3",
          500: "#666b88",
          600: "#52546f",
          700: "#43445b",
          800: "#3a3a4c",
          900: "#1b1b26",
          950: "#111117",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(19, 29, 84, 0.08)",
        card: "0 8px 30px -8px rgba(19, 29, 84, 0.15)",
        glow: "0 0 0 4px rgba(54, 114, 255, 0.12)",
      },
      backgroundImage: {
        "grid-pattern":
          "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
