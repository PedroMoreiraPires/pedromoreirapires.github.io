import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    pubDate: z.string().optional(),
    categories: z.array(z.string()),
    heroImage: z.string(),
    github: z.string().optional(),
  }),
});

export const collections = { projects: projects };
