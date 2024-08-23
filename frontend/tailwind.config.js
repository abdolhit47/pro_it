/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      space: {
        '200%': '200%',
      },
      screens: {
        'tall': { 'raw': '( max-height: 1024px)' },
        'tall2': { 'raw': '( min-height: 720px)' },
        'tall3': { 'raw': '( min-height: 1024px)' },
        //'tall4': { 'raw': '( max-height: 1024px)' },
      },
      fontFamily: {
        regular: ['Cairo'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),],
}