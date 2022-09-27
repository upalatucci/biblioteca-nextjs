/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
	  fontFamily: {
      'serif': 'Playfair Display',
      'sans': 'Roboto',
      },
    colors: {
      ...colors,
      primary: '#0E83A4',
      primaryHover: '#116b85',
      secondary: '#2b4261',
      defaultBg: '#f8f8f8',
      customGray: '#dadada'
    },
    extend: {},
  },
  plugins: [],
}