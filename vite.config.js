import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import MetaMaskSDK from "@metamask/sdk";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), MetaMaskSDK],
  css: {
    modules: true,
  },
});
