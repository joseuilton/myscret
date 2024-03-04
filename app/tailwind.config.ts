import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          200: "#FFB6C7",
          300: "#C38494",
          500: "#D43A72"
        },
        "secondary": {
          100: "#B4B4B4",
          200: "#EDE1E3",
          400: "#D9D9D9",
          500: "#848484",
          600: "#656060",
          800: "#F2F2F2"
        }
      },
    }
  },
  plugins: [],
};
export default config;
