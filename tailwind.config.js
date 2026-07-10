import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"], // available themes
    defaultTheme: "light", // 👈 THIS sets default
  },
};

