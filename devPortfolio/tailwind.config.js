/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
      gridTemplateColumns: {
        "20/80": "20% 80%",
        "20/40/40": "20% 40% 40%",
      },
      fontFamily: {
        buenard: ["Buenard", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        "primary-cool": "hsl(var(--primary-cool) / <alpha-value>)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "retro",
      "valentine",
      "aqua",
      {
        "main-theme": {
          primary: "#2A6B82",
          secondary: "#cce6df",
          accent: "#f4f4f4",
          "base-100": "#f4f4f4",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "base-100": "#000000",
          "base-content": "#ffffff",
        },
      },
    ],
    /*
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables*/
  },
};
