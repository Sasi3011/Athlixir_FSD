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
        // Brand Primary
        primary: {
          DEFAULT: "#FF5722",
          hover: "#E64A19",
          active: "#D84315",
          soft: "rgba(255, 87, 34, 0.12)",
        },
        secondary: "#FF8A65",

        // Backgrounds
        background: "#050505",
        surface: {
          1: "#0F0F0F",
          2: "#161616",
          3: "#1E1E1E",
        },

        // Borders
        border: {
          subtle: "#1A1A1A",
          DEFAULT: "#222222",
          strong: "#2E2E2E",
          focus: "#FF5722",
        },

        // Text
        "text-main": "#FFFFFF",
        "text-secondary": "#B3B3B3",
        "text-muted": "#808080",
        "text-disabled": "#666666",

        // Semantic
        success: {
          DEFAULT: "#22C55E",
          soft: "rgba(34, 197, 94, 0.12)",
          text: "#4ADE80",
        },
        error: {
          DEFAULT: "#EF4444",
          soft: "rgba(239, 68, 68, 0.12)",
          text: "#F87171",
        },
        warning: {
          DEFAULT: "#F59E0B",
          soft: "rgba(245, 158, 11, 0.12)",
        },
        info: {
          DEFAULT: "#3B82F6",
          soft: "rgba(59, 130, 246, 0.12)",
        },

        // Data Visualization
        chart: {
          1: "#FF5722",
          2: "#22C55E",
          3: "#3B82F6",
          4: "#F59E0B",
          5: "#A855F7",
          6: "#14B8A6",
        },
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        sm: '0px 1px 2px rgba(0,0,0,0.06), 0px 1px 3px rgba(0,0,0,0.10)',
        DEFAULT: '0px 4px 6px rgba(0,0,0,0.06), 0px 2px 4px rgba(0,0,0,0.08)',
        md: '0px 4px 6px rgba(0,0,0,0.06), 0px 2px 4px rgba(0,0,0,0.08)',
        lg: '0px 10px 15px rgba(0,0,0,0.08), 0px 4px 6px rgba(0,0,0,0.05)',
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [
    tailwindScrollbarHide
  ],
}
