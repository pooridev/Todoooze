const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: 'rgb(0 0 0 / 20%) 0px 4px 24px'
      },
      colors: {
        gray: {
          lightest: 'rgb(215, 216, 219)',
          lighter: 'rgb(69, 72, 78)',
          light: 'rgb(48, 50, 54)',
          dark: 'rgb(39, 40, 43)',
          darkest: 'rgb(31, 32, 35)'
        }
      },
      fill: () => ({
        lightest: 'rgb(215, 216, 219)',
        lighter: 'rgb(69, 72, 78)',
        light: 'rgb(48, 50, 54)',
        dark: 'rgb(39, 40, 43)',
        darkest: 'rgb(31, 32, 35)'
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
