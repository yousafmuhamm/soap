import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Locked palette from master plan §2 - no other colors allowed.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      black: "#000000",
      primary: "#C5922E",
      "primary-ink": "#8A641E",
      "primary-2": "#F7EAD2",
      "primary-border": "rgba(197,146,46,0.35)",
      "primary-border-strong": "rgba(197,146,46,0.5)",
      "primary-border-emphasis": "rgba(197,146,46,0.6)",
      "primary-wash": "rgba(197,146,46,0.12)",
      bg: "#FFFFFF",
      ink: "#111111",
      muted: "#6B6B6B",
      line: "rgba(17,17,17,0.1)",
    },
    // Border radius disabled everywhere (§4.1 D5) - every value maps to 0.
    borderRadius: {
      none: "0",
      sm: "0",
      DEFAULT: "0",
      md: "0",
      lg: "0",
      xl: "0",
      "2xl": "0",
      "3xl": "0",
      full: "0",
    },
    // Box shadows disabled everywhere (§4.1 D5) - no drop shadows in the design.
    boxShadow: {
      none: "none",
    },
    extend: {
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.16em",
      },
      keyframes: {
        // Slow Ken Burns zoom for the hero image (§2 motion spec).
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        kenburns: "kenburns 8s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
