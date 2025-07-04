/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // Remove any custom keyframes and animation entries for 'float', 'float-reverse', 'float-slow' if present
    },
  },
  plugins: [],
}

