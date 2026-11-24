export interface Conference {
  id: string
  name: string
  initials: string
  logo?: string       // optional, falls back to initials
  edition: string
}

export interface Talk {
  title: string
  speaker: string
  category: string
  image?: string      // TODO: will be removed to be used the slid instead
  date: string        // ISO 8601 format
  conference: Conference
}