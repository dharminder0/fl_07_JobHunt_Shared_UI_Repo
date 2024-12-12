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
        },
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        'secondary-text': "var(--secondary-text-color)",
        'primary-text': "var(--primary-text-color)",
      },
      lineHeight: {
        'h5': '28.8px',  // Custom line height
        'secondary': '25.6px',  // Custom line height
      },
      fontSize: {
        heading: ['16px', { lineHeight: '20px', fontWeight: '600' }], // Heading style
        title: ['14px', { lineHeight: '18px', fontWeight: '500' }],   // Title style
        base: ['12px', { lineHeight: '16px', fontWeight: '400' }],
        info: ['10px', { lineHeight: '14px', fontWeight: '400' }],
      }
    },
  },
  plugins: [],
};
