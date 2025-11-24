import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./styles/**/*.css"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        indigoBrand: "#6366F1"
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(14,165,233,0.25))"
      },
      boxShadow: {
        soft: "0 20px 45px rgba(99, 102, 241, 0.12)"
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
