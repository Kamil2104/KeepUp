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
          40: "#1c8aff",
          50: "#0c82ff",
          70: "#007bff",
        },
        error: {
          20: "#ffdede",
          50: "#ff3636",
        }
      },
      fontFamily: {
        heading: ["Red Hat Display", "sans-serif"],
        body: ["Nunito Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
}
