/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        utfpr: {
          primary: "#FFD100",
          secondary: "#202020",
          neutral: "#FFF6CC",
          error: "#ff7477",
          '.input:focus': {
            outline: 0,
          },
          '.select:focus': {
            outline: 0,
          },
        
        },
      },
    ]
  }
}

