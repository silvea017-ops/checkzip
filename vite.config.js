import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/aladin-api": {
        target: "http://www.aladin.co.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aladin-api/, "/ttb/api"),
        secure: false,
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log("프록시 요청:", req.url);
          });
        },
      },
    },
  },
});
