/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1280px", // for main container max-width
      },
      spacing: {
        nav: "1.5rem", // for navbar spacing
        layout: "2.5rem", // for main layout spacing
        section: "1.5rem", // for section spacing
      },
      colors: {
        primary: "#201F31", //greyish-blue
        secondary: "#12121B", //darker-blue
        btn_pink: "#E19FDF", //pink
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
    keyframes: {
      "loading-bar": {
        "0%": { width: "0%" },
        "100%": { width: "100%" },
      },
    },
    animation: {
      "loading-bar": "loading-bar 2s linear forwards infinite",
    },
  },
  plugins: [],
};
