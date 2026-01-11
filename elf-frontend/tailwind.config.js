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
      // --- ADD THIS SECTION ---
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      // ------------------------
    },
  },
  plugins: [],
}