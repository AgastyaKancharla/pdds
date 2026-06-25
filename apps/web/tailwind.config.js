/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        forest:   { DEFAULT: '#1A2E1A', light: '#243524', dark: '#111F11' },
        leaf:     { DEFAULT: '#4CAF50', light: '#66BB6A', dark: '#388E3C' },
        amber:    { DEFAULT: '#C17F24', light: '#D4A44C', dark: '#8B5E1A' },
        mist:     { DEFAULT: '#F0F4F0', dark: '#E0E8E0' },
        critical: '#D63031',
        moderate: '#F39C12',
        mild:     '#4CAF50',
      },
      fontFamily: {
        display: ['DM Serif Display', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
