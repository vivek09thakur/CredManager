/** @type {import('tailwindcss').Config} */

module.exports = {
<<<<<<< HEAD
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app.tsx", "./app/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
=======
  content: [
    // Ensure this points to your source code
    './app/**/*.{js,tsx,ts,jsx}',
     "./app.{js,jsx,ts,tsx}",
     "./components/**/*.{js,jsx,ts,tsx}"
  
    // "./components/**/*.{js,jsx,ts,tsx}",
    // If you use a `src` directory, add: './src/**/*.{js,tsx,ts,jsx}'
    // Do the same with `components`, `hooks`, `styles`, or any other top-level directories
  ],
  
>>>>>>> 8b6422b4043f71c3220eab757edd81b765a381ab
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins_400Regular",
        "poppins-medium": "Poppins_500Medium",
        "poppins-semibold": "Poppins_600SemiBold",
      },
    },
  },
  plugins: [],
};
