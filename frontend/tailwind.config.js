/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      primary:{
        'blue': '#004498',
        'light': '#FCF7FF',
        'black': '#494554',
        'purple': '#958BB6',
        'red': '#D50020',
        'grey': '#AEA9BA',
        'white':'#fff',
        'pink': '#F6EBFF',
        'bluehover':'#0074cc',
        'lighblue': '#39739d',
        'lightblueshade': '#e1ecf4'
      },
      fontFamily:{
        'poppins': ['Poppins','sans-serif'],
        'raleway': ['Raleway','sans-serif'],
        'source-sans-pro': ['Source Sans Pro','sans-serif'],
        'work-sans': ['Work Sans','sans-serif'],
        'roboto-mono': ['Roboto Mono','monospace'],
      },
    },
    extend: {
      
    },
  },
  plugins: [],
}

//#4C4DF5
//#958BB6
//#FCF7FF
//#322C49