import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import Sitemap from "vite-plugin-sitemap";
// https://vite.dev/config/

const endpoint = [
  "tentang-api",
  "fitur-utama",
  "panduan-instalasi",
  "api-documentation/get-provinsi",
  "api-documentation/get-kabupaten-kota",
  "api-documentation/get-kecamatan",
  "api-documentation/get-desa-kelurahan",
  "data-wilayah/provinsi",
  "data-wilayah/kabupaten-kota",
  "data-wilayah/kecamatan",
  "data-wilayah/desa-kelurahan",
];
const dynamicRoutes = endpoint.map((item) => `/${item}`);
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({ hostname: "https://nusakita.yuefii.site", dynamicRoutes }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
