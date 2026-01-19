import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0b1b2b",
        steel: "#1f3a56",
        cloud: "#e5eaf0",
        accent: "#4fd1c5"
      },
      boxShadow: {
        card: "0 10px 30px rgba(0, 0, 0, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;

