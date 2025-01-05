/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#2d3748",
        brand: {
          20: "#d1e5ff",
          30: "#49a1fe",
          40: "#3b82f6",
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
