import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://pedromoreirapires.github.io",
  integrations: [mdx(), sitemap()],
  prefetch: true,

  markdown: {
    shikiConfig: {
      theme: "material-theme-darker",
    },
  },

  i18n: {
    locales: [
      {
        path: "es",
        codes: ["es-ES", "es-MX"]
      }, {
        path: "en",
        codes: ["en-US", "en-GB"]
      }, {
        path: "pt",
        codes: ["pt-BR", "pt-PT"]
      }
    ],
    defaultLocale: "en",
  },

  vite: {
    plugins: [tailwindcss()]
  }
});