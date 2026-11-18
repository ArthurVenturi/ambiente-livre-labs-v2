import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const github = z.object({
  stars: z.number(),
  license: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  htmlUrl: z.string(),
  downloadUrl: z.string(),
  owner: z.object({ login: z.string(), avatarUrl: z.string() }),
  release: z.object({
    tag: z.string(),
    publishedAt: z.string(),
    url: z.string(),
  }).nullable(),
  contributorCount: z.number(),
  contributors: z.array(z.object({
    login: z.string(),
    avatarUrl: z.string(),
    url: z.string(),
    contributions: z.number(),
  })),
})


export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        kind: z.string().optional(),
        type: z.enum(['plugin', 'integration']),
        software: z.array(z.string()).min(1),
        publisher: z.string(),
        license: z.string(),
        repository: z.string().regex(/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/, 'Must be a GitHub repo URL'),
        version: z.string().optional(),
        categories: z.array(z.string()).default([]),
        keywords: z.array(z.string()).default([]),
        initials: z.string().max(3).optional(),
        logo: z.string().optional(),
        openSource: z.boolean().default(true),
        verified: z.boolean().default(false),
        featured: z.boolean().default(false),
        github: github,
      }),
    }),
  },
})