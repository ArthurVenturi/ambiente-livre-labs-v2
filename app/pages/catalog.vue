<script setup lang="ts">
interface Plugin {
  path: string
  title: string
  description: string
  type: string
  software: string[]
  version: string
  publisher: string
  license: string
  logo?: string
  initials?: string
  categories: string[]
  featured: boolean
  openSource: boolean
  verified: boolean
}

const { data: content } = await useAsyncData('plugin-catalog', () =>
  queryCollection('content').where('kind', '=', 'plugin').all(),
)

const plugins = computed<Plugin[]>(() => (content.value || []) as unknown as Plugin[])
const route = useRoute()
const router = useRouter()
const search = ref(typeof route.query.search === 'string' ? route.query.search : '')
const selectedTypes = ref<string[]>([])
const selectedPublishers = ref<string[]>([])
const selectedLicenses = ref<string[]>([])
const sortBy = ref('recommended')
const filtersOpen = ref(false)
const page = ref(1)
const pageSize = 6

function useFacet(get: (plugin: Plugin) => string, format: (value: string) => string = value => value) {
  const options = computed(() =>
    [...new Set(plugins.value.map(get))].sort((a, b) => a.localeCompare(b)),
  )
  const counts = computed(() =>
    plugins.value.reduce<Record<string, number>>((acc, plugin) => {
      const key = get(plugin)
      acc[key] = (acc[key] ?? 0) + 1
      return acc
    }, {}),
  )
  const items = computed(() =>
    options.value.map(value => ({
      label: format(value),
      value,
      description: `${counts.value[value] ?? 0} plugins`,
    })),
  )
  return { options, counts, items }
}

const plural = (value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1)}s`

const { items: typeFilterItems } = useFacet(plugin => plugin.type, plural)
const { items: publisherFilterItems } = useFacet(plugin => plugin.publisher)
const { items: licenseFilterItems } = useFacet(plugin => plugin.license)

const filteredPlugins = computed(() => {
  const query = search.value.trim().toLowerCase()
  const result = plugins.value.filter((plugin) => {
    const searchable = [plugin.title, plugin.publisher, plugin.description, ...plugin.categories].join(' ').toLowerCase()
    return (!query || searchable.includes(query))
      && (!selectedTypes.value.length || selectedTypes.value.includes(plugin.type))
      && (!selectedPublishers.value.length || selectedPublishers.value.includes(plugin.publisher))
      && (!selectedLicenses.value.length || selectedLicenses.value.includes(plugin.license))
  })

  return [...result].sort((a, b) => {
    if (sortBy.value === 'name-asc') return a.title.localeCompare(b.title)
    if (sortBy.value === 'name-desc') return b.title.localeCompare(a.title)
    if (sortBy.value === 'publisher') return a.publisher.localeCompare(b.publisher)
    return Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title)
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filteredPlugins.value.length / pageSize)))
const pagedPlugins = computed(() => filteredPlugins.value.slice((page.value - 1) * pageSize, page.value * pageSize))
const pageItems = computed(() => Array.from({ length: pageCount.value }, (_, index) => index + 1))
const resultLabel = 'Plugins'

const hasFilters = computed(() =>
  Boolean(search.value || selectedTypes.value.length || selectedPublishers.value.length || selectedLicenses.value.length),
)

function removeFilter(filter: { kind: 'search' | 'type' | 'publisher' | 'license', value?: string }) {
  if (filter.kind === 'search') search.value = ''
  if (filter.kind === 'type' && filter.value) selectedTypes.value = selectedTypes.value.filter(value => value !== filter.value)
  if (filter.kind === 'publisher' && filter.value) selectedPublishers.value = selectedPublishers.value.filter(value => value !== filter.value)
  if (filter.kind === 'license' && filter.value) selectedLicenses.value = selectedLicenses.value.filter(value => value !== filter.value)
}

const sortItems = [
  { label: 'Recommended', value: 'recommended', icon: 'line-md:star-alt' },
  { label: 'Name: A-Z', value: 'name-asc', icon: 'line-md:arrow-up' },
  { label: 'Name: Z-A', value: 'name-desc', icon: 'line-md:arrow-down' },
  { label: 'Publisher', value: 'publisher', icon: 'line-md:account' },
]

watch([search, selectedTypes, selectedPublishers, selectedLicenses, sortBy], () => {
  page.value = 1
})

watch(search, () => {
  const query = { ...route.query }
  if (search.value.trim()) query.search = search.value.trim()
  else delete query.search
  void router.replace({ query })
})

watch(pageCount, (count) => {
  if (page.value > count) page.value = count
})

useSeoMeta({
  title: 'Plugin catalog | Ambiente Livre Labs',
  description: 'Explore open-source plugins, integrations, starters, extensions, and templates from Ambiente Livre Labs.',
})
</script>

<template>
  <main class="w-full px-0">
    <div class="mx-auto grid w-[min(1320px,calc(100%-4rem))] grid-cols-1 gap-y-7 pb-12 lg:grid-cols-[228px_minmax(0,1fr)] lg:gap-x-8">
      <section class="max-w-175 md:px-0 lg:col-span-2 lg:col-start-2">
        <h1 class="mt-3 text-4xl font-semibold tracking-[-0.07em] text-zinc-900 dark:text-white md:text-5xl">Browse the
          open source
          <span class="text-sky-600">plugins</span>
        </h1>
      </section>

      <div
        class="mx-auto flex w-full max-w-175 items-center gap-2 md:max-w-none lg:col-start-2 lg:row-start-2 lg:mx-0">
        <section
          class="flex flex-1 items-stretch rounded-xl border border-default bg-default shadow-sm focus-within:border-primary"
          aria-label="Search plugins">
          <UInput v-model="search" placeholder="Search plugins ..." aria-label="Search plugins" icon="line-md:search"
            class="w-full min-w-0 flex-1" />
        </section>
        <div class="w-24 shrink-0 lg:hidden">
          <UButton color="neutral" variant="outline" icon="line-md:filter" class="h-full w-full justify-center"
            @click="filtersOpen = true">
            Filters
          </UButton>
          <UDrawer v-model:open="filtersOpen" direction="right" title="Filters" :ui="{ content: 'w-full max-w-sm' }">
            <template #body>
              <div class="space-y-2 ">
                <UCollapsible default-open
                  class="rounded-xl border border-zinc-200 bg-white p-1.5 dark:border-zinc-800 dark:bg-labs-navy lg:lg:col-start-2">
                  <UButton color="neutral" variant="ghost" trailing-icon="line-md:chevron-down"
                    class="group w-full justify-between px-2 text-sm font-semibold hover:bg-transparent">
                    Type
                    <template #trailing>
                      <Icon name="line-md:chevron-down"
                        class="transition-transform group-data-[state=open]:rotate-180" />
                    </template>
                  </UButton>
                  <template #content>
                    <UCheckboxGroup v-model="selectedTypes" :items="typeFilterItems" color="primary" variant="list"
                      class="mt-3"
                      :ui="{ item: 'flex min-h-8 items-center text-xs px-2', label: 'text-zinc-600 dark:text-zinc-400', description: 'ml-auto text-[10px] text-zinc-400' }" />
                  </template>
                </UCollapsible>
                <UCollapsible
                  class="rounded-xl border border-zinc-200 bg-white p-1.5 dark:border-zinc-800 dark:bg-labs-navy">
                  <UButton color="neutral" variant="ghost" trailing-icon="line-md:chevron-down"
                    class="group w-full justify-between px-2 text-sm font-semibold hover:bg-transparent">
                    Published by
                    <template #trailing>
                      <Icon name="line-md:chevron-down"
                        class="transition-transform group-data-[state=open]:rotate-180" />
                    </template>
                  </UButton>
                  <template #content>
                    <UCheckboxGroup v-model="selectedPublishers" :items="publisherFilterItems" color="primary"
                      variant="list" class="mt-3"
                      :ui="{ item: 'flex min-h-8 items-center text-xs px-2', label: 'text-zinc-600 dark:text-zinc-400', description: 'ml-auto text-[10px] text-zinc-400' }" />
                  </template>
                </UCollapsible>
                <UCollapsible
                  class="rounded-xl border border-zinc-200 bg-white p-1.5 dark:border-zinc-800 dark:bg-labs-navy">
                  <UButton color="neutral" variant="ghost" trailing-icon="line-md:chevron-down"
                    class="group w-full justify-between px-2 text-sm font-semibold hover:bg-transparent">
                    License
                    <template #trailing>
                      <Icon name="line-md:chevron-down"
                        class="transition-transform group-data-[state=open]:rotate-180" />
                    </template>
                  </UButton>
                  <template #content>
                    <UCheckboxGroup v-model="selectedLicenses" :items="licenseFilterItems" color="primary"
                      variant="list" class="mt-3"
                      :ui="{ item: 'flex min-h-8 items-center text-xs px-2', label: 'text-zinc-600 dark:text-zinc-400', description: 'ml-auto text-[10px] text-zinc-400' }" />
                  </template>
                </UCollapsible>
              </div>
            </template>
          </UDrawer>
        </div>
      </div>

      <div class="contents lg:contents">
        <aside class="hidden min-w-0 lg:col-start-1 lg:row-span-2 lg:row-start-2 lg:block">
          <div class="space-y-3">
            <UCollapsible default-open
              class="rounded-xl border border-zinc-200 bg-white p-1.5 dark:border-zinc-800 dark:bg-labs-navy">
              <UButton color="neutral" variant="ghost" trailing-icon="line-md:chevron-down"
                class="group w-full justify-between px-2 text-sm font-semibold hover:bg-transparent">
                Type
                <template #trailing>
                  <Icon name="line-md:chevron-down" class="transition-transform group-data-[state=open]:rotate-180" />
                </template>
              </UButton>
              <template #content>
                <UCheckboxGroup v-model="selectedTypes" :items="typeFilterItems" color="primary" variant="list"
                  class="mt-3"
                  :ui="{ item: 'flex min-h-8 items-center text-xs px-2', label: 'text-zinc-600 dark:text-zinc-400', description: 'ml-auto text-[10px] text-zinc-400' }" />
              </template>
            </UCollapsible>
            <UCollapsible
              class="rounded-xl border border-zinc-200 bg-white p-1.5 dark:border-zinc-800 dark:bg-labs-navy">
              <UButton color="neutral" variant="ghost" trailing-icon="line-md:chevron-down"
                class="group w-full justify-between px-2 text-sm font-semibold hover:bg-transparent">
                Published by
                <template #trailing>
                  <Icon name="line-md:chevron-down" class="transition-transform group-data-[state=open]:rotate-180" />
                </template>
              </UButton>
              <template #content>
                <UCheckboxGroup v-model="selectedPublishers" :items="publisherFilterItems" color="primary"
                  variant="list" class="mt-3"
                  :ui="{ item: 'flex min-h-8 items-center text-xs px-2', label: 'text-zinc-600 dark:text-zinc-400', description: 'ml-auto text-[10px] text-zinc-400' }" />
              </template>
            </UCollapsible>
            <UCollapsible
              class="rounded-xl border border-zinc-200 bg-white p-1.5 dark:border-zinc-800 dark:bg-labs-navy">
              <UButton color="neutral" variant="ghost" trailing-icon="line-md:chevron-down"
                class="group w-full justify-between px-2 text-sm font-semibold hover:bg-transparent">
                License
                <template #trailing>
                  <Icon name="line-md:chevron-down" class="transition-transform group-data-[state=open]:rotate-180" />
                </template>
              </UButton>
              <template #content>
                <UCheckboxGroup v-model="selectedLicenses" :items="licenseFilterItems" color="primary" variant="list"
                  class="mt-3"
                  :ui="{ item: 'flex min-h-8 items-center text-xs px-2', label: 'text-zinc-600 dark:text-zinc-400', description: 'ml-auto text-[10px] text-zinc-400' }" />
              </template>
            </UCollapsible>
          </div>

        </aside>

        <section class="min-w-0 lg:col-start-2 lg:row-start-3" aria-label="Plugin catalog results">
          <div class="flex items-start gap-4 pb-4">
            <div class="min-w-0 flex-1">
              <p class="mb-1 text-[0.65rem] font-bold tracking-[0.12em] text-zinc-400">PLUGIN CATALOG</p>
              <div class="flex min-w-0 flex-wrap items-center gap-2 text-lg font-semibold">
                <span>{{ resultLabel }}</span>
                <UBadge color="neutral" variant="soft">{{ filteredPlugins.length }}</UBadge>

                <div v-if="hasFilters" class="flex min-w-0 flex-wrap items-center gap-2" aria-label="Active filters">
                  <UBadge v-if="search" color="primary" variant="soft" class="gap-1">
                    {{ search }}
                    <button type="button" class="inline-flex items-center rounded-full p-0.5"
                      aria-label="Remove search filter" @click="removeFilter({ kind: 'search' })">
                      <Icon name="line-md:close" size="0.75rem" />
                    </button>
                  </UBadge>
                  <UBadge v-for="type in selectedTypes" :key="`type-${type}`" color="primary" variant="soft"
                    class="gap-1">
                    {{ type }}
                    <button type="button" class="inline-flex items-center rounded-full p-0.5"
                      :aria-label="`Remove ${type} filter`" @click="removeFilter({ kind: 'type', value: type })">
                      <Icon name="line-md:close" size="0.75rem" />
                    </button>
                  </UBadge>
                  <UBadge v-for="publisher in selectedPublishers" :key="`publisher-${publisher}`" color="primary"
                    variant="soft" class="gap-1">
                    {{ publisher }}
                    <button type="button" class="inline-flex items-center rounded-full p-0.5 hover:bg-transparent"
                      :aria-label="`Remove ${publisher} filter`"
                      @click="removeFilter({ kind: 'publisher', value: publisher })">
                      <Icon name="line-md:close" size="0.75rem" />
                    </button>
                  </UBadge>
                  <UBadge v-for="license in selectedLicenses" :key="`license-${license}`" color="primary" variant="soft"
                    class="gap-1">
                    {{ license }}
                    <button type="button" class="inline-flex items-center rounded-full p-0.5 hover:bg-transparent"
                      :aria-label="`Remove ${license} filter`"
                      @click="removeFilter({ kind: 'license', value: license })">
                      <Icon name="line-md:close" size="0.75rem" />
                    </button>
                  </UBadge>
                </div>
                <UDropdownMenu class="ml-auto shrink-0" :content="{ align: 'end' }" :items="[sortItems.map(item => ({
              ...item,
              type: 'checkbox' as const,
              checked: sortBy === item.value,
              onUpdateChecked: () => sortBy = item.value,
            }))]">
              <UButton color="neutral" variant="ghost" size="sm" trailing-icon="line-md:chevron-down"
                class="min-w-44 shrink-0 justify-between rounded-full bg-white text-zinc-500 hover:bg-transparent dark:bg-labs-navy dark:text-zinc-400">
                <span class="flex items-center gap-2">
                  <Icon name="line-md:filter" />
                  Sort by <strong class="text-zinc-900 dark:text-white">{{sortItems.find(item => item.value ===
                    sortBy)?.label
                    }}</strong>
                </span>
              </UButton>
            </UDropdownMenu>


              </div>
            </div>
            
          </div>

          <div v-if="pagedPlugins.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-live="polite">
            <PluginCard v-for="plugin in pagedPlugins" :key="plugin.path" :plugin="plugin" />
          </div>
          <UEmpty v-else icon="line-md:search" title="No plugins found"
            description="Try another search or remove one of your filters."
            class="border border-dashed border-zinc-200 dark:border-zinc-800">
          </UEmpty>
          <div v-if="filteredPlugins.length" class="mt-8 flex items-center justify-center">
            <UPagination v-model:page="page" :items-per-page="pageSize" :total="filteredPlugins.length" show-edges />
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
