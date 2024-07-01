/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#4467A1',
      },
      fontFamily: {
        custom: ['outFit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
