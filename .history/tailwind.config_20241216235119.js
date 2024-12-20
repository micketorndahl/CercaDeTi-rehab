/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./css/**/*.css", "./js/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
