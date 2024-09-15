/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        wdz: {
          primary: '#ff914d',
          accent: '#ffbd59',
        },
      },
    },
  },
  plugins: [],
};
