import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f5f6f8",
          100: "#e8eaee",
          200: "#c9ced8",
          300: "#a3abbb",
          400: "#727d94",
          500: "#525d76",
          600: "#3d4760",
          700: "#2d3549",
          800: "#1c2233",
          900: "#0e1220",
          950: "#080a13",
        },
        signal: {
          50: "#eef4ff",
          100: "#dbe7ff",
          200: "#b8d0ff",
          300: "#8ab0ff",
          400: "#5b8cff",
          500: "#3363ec",
          600: "#2648c9",
          700: "#1f39a1",
          800: "#1c2f7f",
          900: "#192a68",
        },
        paper: "#fbfaf8",
        clay: "#e8632c",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(14,18,32,0.04), 0 8px 24px -8px rgba(14,18,32,0.08)",
        card: "0 1px 1px rgba(14,18,32,0.03), 0 2px 8px rgba(14,18,32,0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
