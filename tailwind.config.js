import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF5722", // Vibrant Premium Orange
        secondary: "#FF8A65", // Softer Orange for accents
        background: "#05070a", // Deep Premium Black with slight blue tint for richness
        surface: "#121212", // Slightly lighter black for cards
        dark: "#000000", // Pure Black
        light: "#E0E0E0", // Light Text
        gray: {
          800: "#1E1E1E",
          900: "#121212",
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    tailwindScrollbarHide
  ],
}
