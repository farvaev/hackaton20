import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        MainBlue: "#264B82",
        GrayBlue: "#D4DBE6",
        PaleBlue: "#E7EEF7",
        Red: "#DB2B21",
        Black: "#1A1A1A",
        PaleBlack: "#8C8C8C",
        Green: "#0D9B68",
        SeaDark: "#167C85",
        SeaClear: "#48B8C2",
        Orange: "#F67319",
        Gray: "#7F8792",
        LightGray: "#C9D1DF",
      },
    },
  },
  plugins: [],
};
export default config;
