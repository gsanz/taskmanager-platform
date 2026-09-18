import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendPort = env.VITE_BACKEND_PORT || "4000";
  const vitePort = env.VITE_VITE_PORT || "5173";
  const isDevelopment = mode === "development";

  return {
    plugins: [react()],
    server: {
      port: Number(vitePort),
      ...(isDevelopment && {
        proxy: {
          "/api": {
            target: `http://localhost:${backendPort}`,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      }),
    },
  };
});
