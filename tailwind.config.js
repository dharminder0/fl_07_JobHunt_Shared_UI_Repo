/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Clash Display", "sans"],
      },
      fontWeight: {
        regular: "400",
        bold: "700",
        light: "300",
      },
    },
  },
  plugins: [],
};
