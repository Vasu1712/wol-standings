/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sfpro: ["SF-Pro", "system-ui"]
        },
        height: {
          "1/10": "10%",
          "9/10": "90%"
        },
        colors: {
          grad1: "#efefff",
          grad2: "#e0e0fb",
          grad3: "#f1f3fd",
          deepblue1: "#5278c7",
          deepblue2: "#233f78",
          darkpurple:"#22024b",
          deeppurple:"#6750a4",
          blue1: "#1A86E1",
          blue2: "#0087FA",
          pink1: "#feb4c5",
          pink2: "#db869a",
          lightpink1: "#ede7fa",
          lightpink2: "#cdc6f5",
          reallavender: "#ab9afe",
          skyblue: "#9ab9f9",
          bg1:"#02070d",
          bg2:"#040e1b",
          bg3:"#02070D",
          tablegray:"#545864",
          golden: "#e5b80b",
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
  
  