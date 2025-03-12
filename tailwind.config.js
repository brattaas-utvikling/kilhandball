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
        heading: ['DM Mono', 'monospace'],
        ingress: ['DM Sans', 'sans-serif'],
        body: ['Baskerville', 'serif'],
      },
    },
  },
  plugins: [],
};
