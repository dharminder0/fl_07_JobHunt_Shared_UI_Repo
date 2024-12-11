/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Epilogue", "sans"],
      },
      fontWeight: {
        regular: "400",
        bold: "700",
        light: "300",
      },
      colors: {
        purple: {
          500: "#a78bfa",
        },
        green: {
          700: "#059669",
        },
        red: {
          700: "#b91c1c",
        },
        yellow: {
          700: "#f59e0b",
        },
        blue: {
          700: "#2563eb",
        },
      },
    },
  },
  plugins: [],
};
