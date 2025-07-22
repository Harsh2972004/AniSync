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
        secondary: "#12121B", //darke
        btn_pink: "#E19FDF", //pink
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
