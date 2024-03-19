module.exports = {
  mode: "jit",
  purge: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        96: "24rem",
      },
      boxShadow: {
        sm: "rgb(0 0 0 / 20%) 0px 4px 24px",
        DEFAULT: "rgb(0 0 0 / 25%) 0px 1px 1px",
        lg: "rgb(0 0 0 / 50%) 0px 16px 70px",
      },
      colors: {
        gray: {
          lightest: "rgb(215, 216, 219)",
          lighter: "rgb(69, 72, 78)",
          light: "rgb(48, 50, 54)",
          dark: "rgb(39, 40, 43)",
          darkest: "rgb(31, 32, 35)",
          placeholder: "rgb(98, 102, 109)",
        },
        indigo: {
          DEFAULT: "rgb(94, 106, 210)",
        },
      },
      fill: (theme) => ({
        lightest: "rgb(215, 216, 219)",
        lighter: "rgb(69, 72, 78)",
        light: "rgb(48, 50, 54)",
        dark: "rgb(39, 40, 43)",
        darkest: "rgb(31, 32, 35)",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
