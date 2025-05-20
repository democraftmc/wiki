// @ts-check
import { defineConfig } from 'astro/config';

// Styling
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://wiki.democraft.fr',
  integrations: [icon(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  }
});
