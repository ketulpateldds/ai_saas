/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        base: '#000000',
        card: '#0A0A0A',
        soft: '#8E95B2',
        line: 'rgba(255,255,255,0.1)',
        accent: '#39FF14',
        'accent-light': '#98FB98',
        'accent-dark': '#228B22',
      },
      boxShadow: {
        glow: '0 0 30px rgba(57,255,20,0.25)',
      },
    },
  },
  plugins: [],
}