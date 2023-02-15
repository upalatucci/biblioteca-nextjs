/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      serif: "Bitter",
      sans: "Bitter"
    },
    colors: {
      ...colors,
      primary: "#0E83A4",
      primaryHover: "#116b85",
      secondary: "#2b4261",
      defaultBg: "#f8f8f8",
      customGray: "#dadada",
      customYellow: "#E5BD55",
      customYellowHover: "#d1ad53"
    },
    extend: {}
  },
  plugins: []
};
