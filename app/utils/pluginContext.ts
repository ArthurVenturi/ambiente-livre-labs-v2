export const PLUGIN_TABS = ['overview', 'installation', 'changelog'] as const
export type PluginTab = typeof PLUGIN_TABS[number]

export interface ChangelogEntry {
  id: string
  title: string
  date?: string
  nodes: any[]
}

// Plain text of a minimark node
function nodeText(node: any): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.slice(2).map(nodeText).join('')
  return ''
}

// Split the body at each "##" heading that matches a tab id
export function splitPluginBody(nodes: any[]): Record<PluginTab, any[]> {
  const sections: Record<PluginTab, any[]> = { overview: [], installation: [], changelog: [] }
  let current: PluginTab = 'overview' // anything before the first tab heading goes to Overview

  for (const node of nodes) {
    if (Array.isArray(node) && node[0] === 'h2' && PLUGIN_TABS.includes(node[1]?.id)) {
      current = node[1].id
      continue // the tab label already acts as the heading
    }
    sections[current].push(node)
  }
  return sections
}

// "### v1.2.1" + optional date paragraph + body -> one entry per version
export function parseChangelog(nodes: any[]): ChangelogEntry[] {
  const entries: ChangelogEntry[] = []
  let current: ChangelogEntry | null = null

  for (const node of nodes) {
    if (Array.isArray(node) && node[0] === 'h3') {
      current = { id: node[1]?.id, title: nodeText(node), nodes: [] }
      entries.push(current)
      continue
    }
    if (!current) continue

    if (!current.date && Array.isArray(node) && node[0] === 'p'
      && /^\d{4}-\d{2}-\d{2}$/.test(nodeText(node).trim())) {
      current.date = nodeText(node).trim()
      continue
    }
    current.nodes.push(node)
  }
  return entries
}

// Build a document <ContentRenderer> can render from a slice of the body
export function toDoc(doc: any, nodes: any[]) {
  return { ...doc, body: { ...doc.body, value: nodes } }
}