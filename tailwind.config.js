/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '22': '5.6rem', // Custom margin-top value
      }
    },
  },
  plugins: [],
}