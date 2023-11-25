/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-main': "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      boxShadow: {
        'brutalism': '3px 4px 1px 0 ',
        'brutalism-b': '0px 4px 1px 0 ',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
     
      colors:{
        primary: "#fafaf9",
        prePrimary: "#f5f5f4",
        secondary : "#09090b",
        preSecondary:"#292524",
        neutralPrimary1:"#fafaf9",
        neutralPrimary2: "#f5f5f4",
        neutralPrimary3: "#e5e5e5",
        neutralSecondary1:"#0c0a09",
        neutralSecondary2: "#1c1917",
        neutralSecondary3: "#262626",
        primary1:"#f6d365",
        primary2:"#fda085", 
        sky:"#00a2e9",
        

      }
    },
  },
  plugins: [],
}
