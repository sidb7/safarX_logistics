/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Lato: ["Lato", "sans-serif"],
      Noto: ["Noto Sans", "sans-serif"],
      Open: ["Open Sans", "sans-serif"],
      Arial: ["arial", "sans-serif"],
    },
    extend: {
      boxShadow: {
        cardShadow2a: "0 6px 13px 0 rgba(133, 133, 133, 0.05)",
        cardShadow2b: "0 0 0 0 rgba(133, 133, 133, 0.05)",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
