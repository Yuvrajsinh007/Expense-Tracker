/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2980b9',
        secondary: '#27ae60',
        danger: '#e74c3c',
        dark: '#2c3e50',
      },
    },
  },
  plugins: [],
}