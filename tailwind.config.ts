import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        verde1: {
          DEFAULT: "#338D3E",
          escuro: "#1D5023",
          claro: "#A3FFAE",
        },
        limao: {
          DEFAULT: "#D4FF00",
          escuro: "#485600",
          claro: "#F1FFAC",
        },
        azul: {
          DEFAULT: "#0CC6FF",
          escuro: "#003849",
          claro: "#A9EBFF",},
      vermelho: {
        DEFAULT: "#A83B00",
        escuro: "#471900",
        claro: "#FFC1A0",
      },
    },
    },
  },
  plugins: [],
} satisfies Config;
