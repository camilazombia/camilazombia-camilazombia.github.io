/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Ginger', 'Georgia', 'serif'],
        sans: ['Acherus Grotesque', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

