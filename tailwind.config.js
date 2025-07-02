/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-pink': '#e31d93',
        'brand-gold': '#ffd100',
      },
    },
  },
  plugins: [],
} 