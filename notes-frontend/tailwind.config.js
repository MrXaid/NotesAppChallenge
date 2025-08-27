export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        medieval: ["MedievalSharp", "cursive"],
      },
      colors: {
        wood: "#5C4033",   // dark wood
        parchment: "#F5DEB3", // parchment paper
        gold: "#D4AF37",   // golden accent
      },
      backgroundImage: {
        "wood-texture": "url('https://www.transparenttextures.com/patterns/wood-pattern.png')",
        "parchment": "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
      },
    },
  },
  plugins: [],
};
