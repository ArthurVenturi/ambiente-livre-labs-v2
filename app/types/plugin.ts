export interface Plugin {
    title: string
    description: string
    type: string
    publisher: string
    license: string
    logo?: string
    downloadUrl: string
    categories: string[]
    keywords: string[]
    labels: ["oficial", "deprecated"]
    github: GitHubMetadata[]
}

export interface GitHubMetadata {
    stars: number
    license?: string | null
    createdAt: string
    updatedAt: string
    htmlUrl?: string
    downloadUrl?: string
    owner: {
        login: string
        avatarUrl?: string
    }
    release?: {
        tag: string
        publishedAt?: string
        url?: string
        verified: boolean
    } | null
    contributorCount?: number
    contributors?: PluginContributor[]
}

interface PluginContributor {
    username: string
    avatarUrl: string
    profile: string
}