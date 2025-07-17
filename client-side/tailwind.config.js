/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-forest-accent',
    'text-forest-accent',
    'bg-forest-secondary',
    'text-forest-secondary',
    'bg-forest-primary',
    'text-forest-primary',
    'bg-forest-light',
    'text-forest-light',
    'bg-forest-soft',
    'text-forest-soft',
    'border-forest-accent',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          primary: '#C5EFCB',
          secondary: '#647A67',
          background: '#1F241F',
          accent: '#3C433B',
          soft: '#A9C5A0',
          light: '#C6DEC6',
        },
      },
    },
  },
  plugins: [],
}; 