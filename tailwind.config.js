/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '200': '200px', // Custom width class "w-200"
      },
      height: {
        '40': '40px', // Custom height class "h-400"
      },
    },
  },
  plugins: [],
}

