/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        londrina: ["Londrina Shadow", "sans-serif"],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

