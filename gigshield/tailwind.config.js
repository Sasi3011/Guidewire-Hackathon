/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "#3B82F6",
            dark: "#1E40AF",
            light: "#60A5FA",
          },
          secondary: {
            DEFAULT: "#1D4ED8",
            dark: "#1E3A8A",
          },
          accent: "#22D3EE",
        },
        fontFamily: {
          sans: ['Inter', 'Outfit', 'sans-serif'],
        },
        animation: {
          'spin-slow': 'spin 12s linear infinite',
          'pulse-slow': 'pulse 6s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  };