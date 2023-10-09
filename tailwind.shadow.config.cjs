/** @type {import('tailwindcss').Config} */
const config = require('./tailwind.config.cjs');

module.exports = {
  ...config,
  content: ["./src/**/*.ts"],
}
