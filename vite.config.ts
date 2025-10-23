import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "TA-PWA",
        short_name: "TA-PWA",
        start_url: "/",
        display: "standalone",
        background_color: "#0B0F14",
        theme_color: "#00FF66",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
        ],
      },
      workbox: { globPatterns: ["**/*.{js,css,html,ico,png,svg}"] },
    }),
  ],
  server: {
    proxy: { "/api": "http://localhost:8787" }, // falls du den API-Proxy nutzt
  },
});
