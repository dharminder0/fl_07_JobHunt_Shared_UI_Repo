/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans"],
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
        gray: {
          seconadary: "#7C8493"
        }
      },
      lineHeight: {
        'h5': '28.8px',  // Custom line height
        'secondary': '25.6px',  // Custom line height
      },
    },
  },
  plugins: [],
};
