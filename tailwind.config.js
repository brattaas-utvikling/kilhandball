/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kilred: "#cd0010",
        kilsvart: "#181414",
      },
      fontFamily: {
        heading: ["DM Mono", "sans-serif"],
        ingress: ["DM Sans", "sans-serif"],
        body: ["Baskerville", "serif"],
      },
    },
  },
  plugins: [],
};
