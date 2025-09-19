/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    // Ensure this points to your source code
    './app/**/*.{js,tsx,ts,jsx}',
     "./app.{js,jsx,ts,tsx}",
     "./components/**/*.{js,jsx,ts,tsx}"
  
    // "./components/**/*.{js,jsx,ts,tsx}",
    // If you use a `src` directory, add: './src/**/*.{js,tsx,ts,jsx}'
    // Do the same with `components`, `hooks`, `styles`, or any other top-level directories
  ],
  
  theme: {
    extend: {
      colors: {
        // You can add your custom colors here if you want to use them as classes
        accent: "#c8aef1ff",
        background: "#202123",
        foreground: "#fff",
        label: "#bdbdbd",
        inputbg: "#2b2d31",
      },
      fontFamily: {
        poppins: ["Poppins_400Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
