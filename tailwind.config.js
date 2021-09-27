const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      ...colors,
      gray: {
        lightest: 'rgb(215, 216, 219)',
        light: 'rgb(48, 50, 54)',
        DEFAULT: 'rgb(48, 50, 54)',
        dark: 'rgb(39, 40, 43)',
        darkest: 'rgb(31, 32, 35)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
