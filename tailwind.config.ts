// https://tailwindcss.nuxtjs.org/getting-started/setup
export default {
  theme: {
    extend: {}
  },
  plugins: [
    require("daisyui"),
  ],

  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
