/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Antonio', 'sans-serif'],
        paragraph: ['ProximaNova', 'sans-serif'],
      },
      colors: {
        black: '#222123',
        'main-bg': '#232224',
        white: '#ffffff',
        'dark-brown': '#523122',
        'mid-brown': '#a26833',
        'light-brown': '#e3a458',
        'red-brown': '#7f3b2d',
        'yellow-brown': '#a26833',
        'milk-yellow': '#e3d3bc',
        red: '#a02128',
        milk: '#faeade',
      },
      boxShadow: {
        glow: '0 0 30px rgba(57,255,20,0.25)',
      },
    },
  },
  plugins: [],
}