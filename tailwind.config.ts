import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "purple": "#7c5dfa",
        "purple_light":"#9277ff",
        "red":"#EC5757",
        "red_light":"#ff9797",
        "bg_light":"#F8F8FB",
        "text-300":"#DFE3FA",
        "text-400":"#7E88C3",
        "text-500":"#888EB0"
      },
    },
  },
  plugins: [],
};
export default config;
