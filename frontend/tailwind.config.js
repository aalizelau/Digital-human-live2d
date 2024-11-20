/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
  theme: {
  	extend: {
      colors: {
        border: '#e5e7eb', // Custom border color
        background: '#f9fafb', // Custom background color
        foreground: '#111827', // Custom text color
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

