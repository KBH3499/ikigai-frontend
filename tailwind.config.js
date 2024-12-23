/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#3CD2B5',
        secondary: '#5F78FF',
        accent: '#fbbf24',
        tertiary: '#7979AC',
        border: "#373851",
        white: "#ECFDFF",
        black: "#000000"

      },
      gradientColorStops: {
        'gradient-start': '#5F78FF',
        'gradient-end': '#3ED3B5',
      },
      boxShadow: {
        'gradient': '0 4px 6px -1px rgba(95, 120, 255, 0.5), 0 2px 4px -1px rgba(60, 210, 181, 0.5)', // Custom gradient shadow
      },
    },
  },
  plugins: [],
};
