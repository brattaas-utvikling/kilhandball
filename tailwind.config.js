/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        kilred: '#cd0010',
        kilsvart: '#181414',
        kilblue: '#0088CD',
        kildarkblue: '#003C75',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
