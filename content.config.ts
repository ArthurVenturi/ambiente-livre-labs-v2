import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        kind: z.string().optional(),
        publisher: z.string().optional(),
        license: z.string().optional(),
        initials: z.string().optional(),
        logo: z.string().optional(),
        categories: z.array(z.string()).default([]),
        type: z.string().optional(),
        openSource: z.boolean().default(false),
        featured: z.boolean().default(false),
        verified: z.boolean().default(false),
        install: z.object({
          packageManager: z.string().optional(),
          command: z.string().optional(),
          requirements: z.array(z.string()).default([]),
        }).optional(),
      }),
    }),
  },
})