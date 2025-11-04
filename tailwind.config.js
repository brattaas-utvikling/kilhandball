/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dine hovedfarger
        kilred: {
          DEFAULT: '#C40000',
          50: '#FFE5E5',
          100: '#FFCCCC',
          200: '#FF9999',
          300: '#FF6666',
          400: '#FF3333',
          500: '#C40000',
          600: '#A00000',
          700: '#7C0000',
          800: '#580000',
          900: '#340000',
        },
        kilsvart: {
          DEFAULT: '#181414',
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#BABABA',
          400: '#A3A3A3',
          500: '#6B6B6B',
          600: '#545454',
          700: '#3D3D3D',
          800: '#262626',
          900: '#181414',
        },
        kilblue: {
          DEFAULT: '#0088CD',
          50: '#E5F6FF',
          100: '#CCEDFF',
          200: '#99DBFF',
          300: '#66C9FF',
          400: '#33B7FF',
          500: '#0088CD',
          600: '#006DA4',
          700: '#00527B',
          800: '#003752',
          900: '#001C29',
        },
        kildarkblue: {
          DEFAULT: '#003C75',
          50: '#E5F1FF',
          100: '#CCE3FF',
          200: '#99C7FF',
          300: '#66ABFF',
          400: '#338FFF',
          500: '#0073FF',
          600: '#005CC7',
          700: '#00458F',
          800: '#002E57',
          900: '#003C75',
        },
        purple: {
          DEFAULT: '#b573f8',
          50: '#F5F0FF',
          100: '#EBE1FF',
          200: '#D7C3FF',
          300: '#C3A5FF',
          400: '#AF87FF',
          500: '#b573f8',
          600: '#9B5FF8',
          700: '#814BF8',
          800: '#6737F8',
          900: '#4D23F8',
        },
        // Semantic colors basert på dine hovedfarger
        primary: {
          DEFAULT: '#C40000', // kilred
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#0088CD', // kilblue
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#b573f8', // purple
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#6B6B6B',
        },
        background: '#FFFFFF',
        foreground: '#181414',
        border: '#E8E8E8',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        // Aliases for easier use
        heading: ['Anton', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        // Anton font sizes (for headings)
        'anton-xs': ['0.75rem', { lineHeight: '1rem', fontFamily: 'Anton' }],
        'anton-sm': [
          '0.875rem',
          { lineHeight: '1.25rem', fontFamily: 'Anton' },
        ],
        'anton-base': ['1rem', { lineHeight: '1.5rem', fontFamily: 'Anton' }],
        'anton-lg': [
          '1.125rem',
          { lineHeight: '1.75rem', fontFamily: 'Anton' },
        ],
        'anton-xl': ['1.25rem', { lineHeight: '1.75rem', fontFamily: 'Anton' }],
        'anton-2xl': ['1.5rem', { lineHeight: '2rem', fontFamily: 'Anton' }],
        'anton-3xl': [
          '1.875rem',
          { lineHeight: '2.25rem', fontFamily: 'Anton' },
        ],
        'anton-4xl': ['2.25rem', { lineHeight: '2.5rem', fontFamily: 'Anton' }],
        'anton-5xl': ['3rem', { lineHeight: '1', fontFamily: 'Anton' }],
        'anton-6xl': ['3.75rem', { lineHeight: '1', fontFamily: 'Anton' }],
      },
      boxShadow: {
        kilred:
          '0 4px 6px -1px rgba(196, 0, 0, 0.1), 0 2px 4px -1px rgba(196, 0, 0, 0.06)',
        'kilred-lg':
          '0 10px 15px -3px rgba(196, 0, 0, 0.1), 0 4px 6px -2px rgba(196, 0, 0, 0.05)',
        kilblue:
          '0 4px 6px -1px rgba(0, 136, 205, 0.1), 0 2px 4px -1px rgba(0, 136, 205, 0.06)',
        'kilblue-lg':
          '0 10px 15px -3px rgba(0, 136, 205, 0.1), 0 4px 6px -2px rgba(0, 136, 205, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow-spin': 'glowSpin 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       colors: {
//         kilred: '#C40000',
//         kilsvart: '#181414',
//         kilblue: '#0088CD',
//         kildarkblue: '#003C75',
//         purple: '#b573f8',
//       },
//       fontFamily: {
//         anton: ['Anton', 'sans-serif'],
//         roboto: ['Roboto', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// };
