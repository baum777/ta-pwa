/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          orange: "#FF6200",
          green: "#00FF66",
          cyan: "#00E5FF",
          silver: "#C5F6FF",
        },
        plasma: {
          blue: "#3B82F6"
        },
        "void-black": "#0B0F14",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        neon: "0 0 10px rgba(0,255,102,0.5)",
      },
    },
  },
  plugins: [],
};
