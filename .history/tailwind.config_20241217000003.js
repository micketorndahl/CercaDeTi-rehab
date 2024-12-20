/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // Disable Tailwind's preflight reset
  },
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
