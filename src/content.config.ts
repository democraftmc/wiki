import { defineCollection, z } from "astro:content";

const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    hidden: z.boolean().default(false),
    icon: z.string().optional(),
    image: z.string().optional(),
    weight: z.number().default(0),
  }),
});

export const collections = {
  wiki: docsCollection,
};