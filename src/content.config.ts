import { defineCollection, z } from "astro:content";

const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().default("Description"),
    draft: z.boolean().default(false),
    weight: z.number().default(0),
  }),
});

export const collections = {
  wiki: docsCollection,
};