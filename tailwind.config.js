/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}" // Ensures Tailwind scans all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {

      colors: {
          primary:"#ff8901",
          secondary:"#fb923c"
      },


      container2:{
        center:true,
        padding:{
          default:"1rem",
          sm:"2rem",
          lg:"4rem",
          xl:"6rem",
          "2xl":"8rem",
        },
      },
    },
  },
  plugins: [],
};
