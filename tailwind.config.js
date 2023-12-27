/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#C900C1",
        ash: "#EEF2FB",
        gray: "#6A6D70",
        btnCol: "#CACED5",
        greenStock: "#0DB03A",
      },
      fontFamily: {
        sansation: "sansation",
      },
    },
  },
  plugins: [],
};
