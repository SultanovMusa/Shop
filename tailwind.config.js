/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/UI/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      container: "1280px",
      xl: { max: "1279px" },
      lg: { max: "900px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      xs: { max: "440px" },
      ls: { max: "320px" },
    },
    extend: {
      colors:{
        adminBlue: '#033152',
        sidebar: '#BFBFBF',
        Gray: '#676767',
        userPink: '#CB11AB',
        lightGray: '#9F9F9F'
      }
    },
  },
  plugins: [],
};
