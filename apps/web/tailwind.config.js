/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0A1A0F',
          900: '#0F2415',
          800: '#1C3A22',
          700: '#2A5232',
          600: '#3A6B44',
        },
        chlorophyll: {
          400: '#5EE87A',
          500: '#2ECC71',
          600: '#27AE60',
        },
        mint: {
          100: '#F0FAF5',
          200: '#C8EFD8',
          300: '#A8E6CF',
        },
        amber: {
          400: '#F0C040',
          500: '#E8B84B',
          600: '#D4A017',
        },
        parchment: '#F5F0E8',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'scan': 'scan 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.5s ease-out',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { top: '0%', opacity: '1' },
          '50%': { top: '100%', opacity: '0.5' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(46, 204, 113, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(46, 204, 113, 0)' },
        },
      },
    },
  },
  plugins: [],
};
