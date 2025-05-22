// @ts-check
import { defineConfig } from 'astro/config';

// Styling
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// Markdown
import remarkObsidian from 'remark-obsidian';
import mdx from '@astrojs/mdx';

// Site Managment
import sitemap from '@astrojs/sitemap'
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: 'https://wiki.democraft.fr',
  build: {
    format: "file",
  },
  integrations: [icon(), mdx(), sitemap(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
      syntaxHighlight: {
        type: 'shiki',
        excludeLangs: ['mermaid', 'math'],
      },
    remarkPlugins: [remarkObsidian],
  },
  experimental: {
    headingIdCompat: true,
  }
});