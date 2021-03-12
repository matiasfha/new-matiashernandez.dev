module.exports = {
  darkMode: "class",
  purge: [],
  theme: {
    fontFamily: {
      muli: ["muli, sans-serif"],
      chivo: ["Chivo"],
      playfair: ["Playfair Display"],
      walsheim: ["GT Walsheim Regular"],
      wotfard: ["Wotfard"],
    },
    extend: {
      colors: {
        red: "#FF2A5B",
        dark: "#111111",
        bg: "rgb(14, 20, 27)",
        steel: {
          50: "#F4F7FA",
          200: "#DBEAF1",
          700: "#3f527f",
          800: "#364062",
          900: "#2d354e",
        },
        sepia: {
          50: "#f8f8f6",
          100: "#f5f2ee",
          200: "#eae4db",
          300: "#dccfbf",
          400: "#c4ac93",
          500: "#ab8569",
          600: "#8b614c",
          700: "#6c4a43",
          800: "#543a3a",
          900: "#432f31",
        },
      },
      inset: {
        "-16": "-4rem",
        "-32": "-10rem",
        32: "10rem",
      },
      spacing: {
        extra: "40rem",
        24: "6rem",
        48: "12rem",
        64: "16rem",
        72: "18rem",
      },
    },
  },
  variants: {},
  plugins: [],
};
