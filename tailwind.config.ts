import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  darkMode: ["selector"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'to-top-blue-gray': 'linear-gradient(to top, #1a202c 0%, #537895 100%)',
        "to-top-blue-gray":
          " linear-gradient(60deg, #29323c 0%, #485563 100%);",
        "radial-blue-gray":
          "radial-gradient(circle at 10% 20%, rgb(90, 92, 106) 0%, rgb(32, 45, 58) 81.3%)",
      },
      colors: {
        lightBackground: "#ffffff",
        lightText: "#000000",
        darkBackground: "#1a202c",
        darkText: "#ffffff",
      },
    },
  },
  plugins: [],
};
export default config;
