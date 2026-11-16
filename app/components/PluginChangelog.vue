<script setup lang="ts">
const props = defineProps<{
  nodes: any[]
  doc: Record<string, any>
}>()

const entries = computed(() => parseChangelog(props.nodes))

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <UChangelogVersions v-if="entries.length">
    <UChangelogVersion
      v-for="(entry, index) in entries"
      :id="entry.id"
      :key="entry.id"
      :title="entry.title"
      :date="entry.date"
      :badge="index === 0 ? { label: 'Latest', color: 'primary', variant: 'subtle' } : undefined"
      :ui="{
        root: 'scroll-mt-12 lg:ps-40',
        title: 'text-xl',
        date: 'text-sm text-muted',
      }"
    >
      <template #date>
        <time v-if="entry.date" :datetime="entry.date">{{ formatDate(entry.date) }}</time>
      </template>

      <template #body>
        <ContentRenderer :value="toDoc(doc, entry.nodes)" />
      </template>
    </UChangelogVersion>
  </UChangelogVersions>

  <p v-else class="text-sm text-zinc-500">No changelog yet.</p>
</template>