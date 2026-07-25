/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './index.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        serif: ['Bodoni Moda', 'serif'],
      },
      keyframes: {
        'spin-slow': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        'spin-slow': 'spin-slow 22s linear infinite',
      },
    },
  },
  plugins: [],
};
