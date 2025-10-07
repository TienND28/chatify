import daisyui from 'daisyui';


/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",              // file HTML chính
    "./src/**/*.{js,ts,jsx,tsx}" // tất cả file React trong src
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
