import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      video: z
        .string()
        .optional()
        .refine((val) => !val || val.endsWith(".mp4"), {
          message: "Video must be an MP4 file",
        }),
    }),
});

export const collections = { projects };
