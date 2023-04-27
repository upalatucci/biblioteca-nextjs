/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      serif: ["var(--font-bitter)", ...fontFamily.serif],
      sans: ["var(--font-roboto)", ...fontFamily.sans],
    },
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      neutral: colors.neutral,
      red: colors.red,
      slate: colors.slate,
      primary: "#0E83A4",
      primaryHover: "#116b85",
      secondary: "#2b4261",
      defaultBg: "#f8f8f8",
      customGray: "#dadada",
      customYellow: "#E5BD55",
      customYellowHover: "#d1ad53",
    },
    extend: {},
  },
  plugins: [],
};
