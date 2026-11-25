import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", lg: "2rem" }, screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        navy: { DEFAULT: "#0B1F3A", 900: "#071528", 800: "#0B1F3A", 700: "#16304F", 600: "#2A4466" },
        teal: { DEFAULT: "#00C2B8", deep: "#007A74", soft: "#E6F8F7" },
        coral: { DEFAULT: "#FF6B5A", deep: "#C93A2B", soft: "#FFF0EE" },
        mist: "#F3F6F8",
        line: "#DDE3E8",
      },
      fontFamily: {
        sans: ["'Manrope Variable'", "Manrope", "'Segoe UI'", "Arial", "sans-serif"],
      },
      borderRadius: { xl: "0.875rem", "2xl": "1.25rem" },
      boxShadow: {
        card: "0 1px 2px rgba(11,31,58,0.06), 0 8px 24px -12px rgba(11,31,58,0.18)",
      },
      maxWidth: { prose: "68ch" },
    },
  },
  plugins: [typography],
};
export default config;
