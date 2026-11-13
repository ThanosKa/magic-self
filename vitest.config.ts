import path from "node:path";
import { defineConfig } from "vitest/config";

// Kept apart from vite.config.ts, whose vinext and Cloudflare plugins are for
// the Worker build and refuse to run under Vitest.
export default defineConfig({
  test: {
    exclude: ["node_modules", ".next", "dist", ".cloudflare", ".vinext"],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./"),
    },
  },
});
