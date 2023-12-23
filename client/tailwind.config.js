/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Exo 2", "sans-serif"],
        text: ["Signika Negative", "sans-serif"],
      },
      backgroundImage: {
        "chat-img": "url('src/assets/chatbg2.jpg')",
        // "white-bg": "url('./src/assets/whitebg.jpg')",
      },
    },
    screens: {
      "2xl": { max: "1535px" },

      xl: { max: "1279px" },

      lg: { max: "1023px" },

      md: { max: "767px" },

      sm: { max: "450px" },

      ss: { max: "330px" },
    },
  },
  plugins: [],
};
