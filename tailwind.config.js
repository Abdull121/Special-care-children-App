/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the app folder
    "./components/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the components folder]
    "./app/(tabs)/meditate.tsx",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0166FC",
        secondary: {
          Default: "#FFFFFF",
        },
        blue: {
          Default: "#0166FC",
        },
        black: {
          Default: "#000000",
        },
        gary: {
          Default: "#A4A6A6",
        },
      },
      fontFamily: {
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        heading: ["Anton-Regular"],
      },
    },
  },
  plugins: [],
};
