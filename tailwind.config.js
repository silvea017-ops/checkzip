/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        secondary: "#FFD66C",
        background: "#F5F5F5",
        text: "#1E1E1E",
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
        permanent: [' "Permanent Marker"', "cursive"],
      },
    },
  },
  plugins: [],
};
