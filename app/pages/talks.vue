<script setup lang="ts">
import type { Talk, Conference } from '~/types/talk'

type Theme = 'AI' | 'Data Driven' | 'BPMN' | 'ECM'

// Placeholder thumbnails, 16:9. Swap for real images in public/talks/*.jpg
const img = (seed: string) => `https://picsum.photos/seed/${seed}/640/360`

const tdc:  Conference = { id: 'tdc', name: 'TDC', initials: 'TDC', edition: '2026' }
const mysql: Conference = { id: 'mysql-br', name: 'MySQL BR Conf', initials: 'MY', edition: '2026' }
const pg: Conference = { id: 'pgconf', name: 'PG Conf', initials: 'PG', edition: '2026' }
const tic: Conference = { id: 'tic-nova', name: 'TIC Nova', initials: 'TN', edition: '2026' }

const talks: Talk[] = [
  { title: 'AI agents on top of enterprise content', speaker: 'Miguel', category: 'AI', date: '2026-07-14', image: img('tdc-1'), conference: tdc },
  { title: 'Document lifecycle automation with BPMN', speaker: 'Arthur Venturi', category: 'BPMN', date: '2026-07-14', image: img('tdc-2'), conference: tdc },
  { title: 'Building a data-driven content platform', speaker: 'Speaker Name', category: 'Data Driven', date: '2026-07-15', image: img('tdc-3'), conference: tdc },
  { title: 'Open source ECM in the real world', speaker: 'Speaker Name', category: 'ECM', date: '2026-07-15', image: img('tdc-4'), conference: tdc },
  { title: 'RAG over Alfresco repositories', speaker: 'Speaker Name', category: 'AI', date: '2026-07-16',  image: img('tdc-5'), conference: tdc },
  { title: 'Process mining for document flows', speaker: 'Speaker Name', category: 'BPMN', date: '2026-07-16', image: img('tdc-6'), conference: tdc },
]

const themeIcon: Record<Theme, string> = {
  'AI': 'lucide:sparkles',
  'Data Driven': 'lucide:bar-chart-3',
  'BPMN': 'lucide:workflow',
  'ECM': 'lucide:files',
}

const theme = ref<'all' | Theme>('all')


const sortBy = ref('date-desc')

const sortItems = [
  { label: 'Latest', value: 'date-desc', icon: 'lucide:calendar-arrow-down' },
  { label: 'Oldest', value: 'date-asc', icon: 'lucide:calendar-arrow-up' },
  { label: 'Year', value: 'year', icon: 'lucide:calendar-range' },
  { label: 'Conference', value: 'conference', icon: 'lucide:mic' },
]

const year = (t: Talk) => t.date.slice(0, 4)

const visibleTalks = computed(() => {
  const list = talks.filter(t => theme.value === 'all' || t.category === theme.value)

  return [...list].sort((a, b) => {
    if (sortBy.value === 'date-asc') return a.date.localeCompare(b.date)
    if (sortBy.value === 'year') {
      // newest year first, then conference name, then newest talk first
      return year(b).localeCompare(year(a))
        || a.conference.name.localeCompare(b.conference.name)
        || b.date.localeCompare(a.date)
    }
    if (sortBy.value === 'conference') {
      // conference name A-Z, then newest year and date first
      return a.conference.name.localeCompare(b.conference.name)
        || b.date.localeCompare(a.date)
    }
    return b.date.localeCompare(a.date) // date-desc
  })
})

const items = [
  { label: 'All', value: 'all', icon: 'lucide:layout-grid' },
  ...(Object.keys(themeIcon) as Theme[]).map(t => ({ label: t, value: t, icon: themeIcon[t] })),
]

// Static data loads instantly, so the skeleton is simulated here.
// With real data, replace this with the `pending` flag from useAsyncData / useFetch.
const loading = ref(true)
onMounted(() => {
  setTimeout(() => (loading.value = false), 700)
})

useSeoMeta({
  title: 'Talks | Ambiente Livre Labs',
  description: 'Conferences and lectures presented by Ambiente Livre Labs.',
})
</script>

<template>
  <main class="w-full pb-20">
    <div class="mx-auto w-[min(1320px,calc(100%-2rem))] md:w-[min(1320px,calc(100%-4rem))]">
      <section class="pt-6 md:pt-10">
        <p class="mb-2 text-[0.65rem] font-bold tracking-[0.12em] text-zinc-400">TALKS</p>
        <h1 class="max-w-3xl text-4xl font-semibold tracking-[-0.07em] text-zinc-900 dark:text-white md:text-5xl">
          Conferences and <span class="text-sky-600">lectures</span>
        </h1>
        <p class="mt-3 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
          Talks we have given at the main developer and database events in Brazil.
        </p>
      </section>

      <div class="mt-8 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div class="hidden md:block" />

        <div class="-mx-4 px-4 md:mx-0 md:px-0">
          <UTabs v-model="theme" :items="items" :content="false" color="neutral" variant="link" class="mx-auto w-max"
            :ui="{ list: 'w-max' }" />
        </div>

        <div class="flex justify-end">
          <UDropdownMenu :content="{ align: 'end' }" :items="[sortItems.map(item => ({
            ...item,
            type: 'checkbox' as const,
            checked: sortBy === item.value,
            onUpdateChecked: () => sortBy = item.value,
          }))]">
            <UButton color="neutral" variant="ghost" size="sm" trailing-icon="line-md:chevron-down"
              class="min-w-44 shrink-0 justify-between rounded-full bg-white text-zinc-500 hover:bg-transparent dark:bg-labs-navy dark:text-zinc-400">
              <span class="flex items-center gap-2">
                <Icon name="line-md:filter" />
                Sort by
                <strong class="text-zinc-900 dark:text-white">
                  {{sortItems.find(item => item.value === sortBy)?.label}}
                </strong>
              </span>
            </UButton>
          </UDropdownMenu>
        </div>
      </div>

      <div v-if="loading" class="mt-8 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-busy="true" aria-label="Loading talks">
        <div v-for="n in 8" :key="n">
          <USkeleton class="aspect-video w-full rounded-xl" />
          <div class="mt-3 flex gap-3">
            <USkeleton class="size-10 shrink-0 rounded-full" />
            <div class="min-w-0 flex-1 space-y-2">
              <USkeleton class="h-4 w-11/12" />
              <USkeleton class="h-4 w-2/3" />
              <USkeleton class="h-3 w-1/2" />
            </div>
          </div>
        </div>
      </div>

      <!-- Grid -->
      <div v-else-if="visibleTalks.length"
        class="mt-8 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-live="polite">
        <NuxtLink v-for="t in visibleTalks" :key="`${t.conference.id}-${t.title}`"
          class="group block focus-visible:outline-none">
          <!-- Thumbnail -->
          <div
            class="relative aspect-video overflow-hidden rounded-xl bg-zinc-200 ring-1 ring-black/5 transition-all duration-300 group-hover:rounded-md group-focus-visible:ring-2 group-focus-visible:ring-sky-500 dark:bg-zinc-800 dark:ring-white/10">
            <NuxtImg :src="t.image" :alt="t.title" loading="lazy"
              class="size-full object-cover transition-transform duration-400 group-hover:scale-105" />
          </div>

          <!-- Info: conference logo + title + meta -->
          <div class="mt-3 flex gap-3">
            <UAvatar :src="t.conference.logo" :text="t.conference.initials" :alt="t.conference.name" size="md"
              class="shrink-0 bg-indigo-50 font-bold text-indigo-600 dark:bg-indigo-950" />
            <div class="min-w-0">
              <h3 class="line-clamp-1 text-sm font-semibold leading-snug text-zinc-900 dark:text-white">
                {{ t.title }}
              </h3>
              <p
                class="mt-1 truncate text-xs text-zinc-500 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                {{ t.speaker }} · {{ t.conference.name }} {{ t.conference.edition }}
              </p>
              <p class="text-xs text-zinc-500">
                <NuxtTime :datetime="t.date" date-style="medium" />
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <UEmpty v-else icon="lucide:mic-off" title="No talks yet" description="There are no talks in this category."
        class="mt-8 border border-dashed border-zinc-200 dark:border-zinc-800" />
    </div>
  </main>
</template>