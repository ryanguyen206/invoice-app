import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    
    screens: {
      sm:'640px',
      md:'850px',
      lg:'1024px',
      xl:'1280px',
      '2xl':'1536px'
    },
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
      transitionProperty: {
        'height': 'height',
      }
    },
  },
  plugins: [nextui()],

};
export default config;
