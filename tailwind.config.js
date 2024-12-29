/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          20: "#e6f1ff",
          50: "#0c82ff",
        },
        error: {
          20: "#ffdede",
          50: "#ff3636",
        }
      },
    },
  },
  plugins: [],
}
