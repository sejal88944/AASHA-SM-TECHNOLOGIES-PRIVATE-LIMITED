/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1e40af",
          dark: "#1e3a8a",
          light: "#3b82f6",
        },
      },
    },
  },
  plugins: [],
};
