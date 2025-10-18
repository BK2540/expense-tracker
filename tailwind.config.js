/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161D26",
        secorndary: "#A7D0FC",
        "off-white": "#FFF9F2",
        "medium-green": "#2E771A",
        "medium-red": "#D60E0E",
      },
      fontFamily: {
        montserrat: "Montserrat",
      },
    },
  },
  plugins: [],
};
