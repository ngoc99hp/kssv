/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkpurple: "rgba(28,17,41,0.88)"
      }
    },
  },
  plugins: [require("daisyui")],
}