/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // <- this watches your files
  theme: {
    extend: {
     fontFamily: {
  playfair: ['"Playfair Display"', 'serif'],
}
    },
  },
  plugins: [],
}

