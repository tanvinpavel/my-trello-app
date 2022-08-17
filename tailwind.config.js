module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  }
}
