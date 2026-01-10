/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'elf-teal': '#008080',
        'elf-charcoal': '#333333',
        'elf-gray': '#f9fafb',
      },
    },
  },
  plugins: [],
}