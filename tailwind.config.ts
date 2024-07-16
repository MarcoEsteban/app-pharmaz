import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    fontFamily: {
      sans: [ "Open Sans" ],
      serif: [ 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', "serif" ],
      body: [ "Roboto", "sans-serif" ],
      awesome: [ "FontAwesome" ],
    },

    extend: {
    },
  },
  plugins: [],
  variants: {
    extend: {
      translate: [ 'hover', 'active' ],
      opacity: [ 'active' ],
      boxShadow: [ 'hover' ],
    },
  },
};
export default config;
