/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    keyframes: {
      'spin-slow': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
    animation: {
      'spin-slow': 'spin-slow 2s linear infinite', // Use the custom spin-slow animation
      'spin': 'spin 800ms linear infinite', // Use the custom spin animation
    },
  },
  plugins: [],
}
