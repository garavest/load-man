const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const nesting = require("tailwindcss/nesting");

module.exports = {
  plugins: [nesting, tailwindcss, autoprefixer]
};
