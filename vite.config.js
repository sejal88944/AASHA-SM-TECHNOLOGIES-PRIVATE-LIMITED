import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forwards calls to the Test Portal API (server/) during local dev so
      // the browser only ever talks to one origin (avoids CORS + lets
      // cookies work exactly like they will in production behind a reverse proxy).
      "/api": {
        // Matches the default PORT in server/.env.example — change here if
        // you run the API server on a different port locally.
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
