import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemap({
      hostname: 'https://www.instantstudentsolution.com',
      dynamicRoutes: [
        '/',
        '/about',
        '/contact',
        '/services/visa-counselling',
        '/services/student-admissions',
        '/services/work-permits',
        '/services/pr-applications',
        '/services/interview-prep',
        '/destinations/ireland',
        '/destinations/australia',
        '/destinations/united-kingdom',
        '/blog',
      ],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));