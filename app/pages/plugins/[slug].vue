<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import AvatarGroup from '~/components/elements/AvatarGroup.vue'

const items = ref<TabsItem[]>([
  { label: 'Overview', value: 'overview', icon: 'line-md:confirm-circle' },
  { label: 'Installation', value: 'installation', icon: 'line-md:cog-loop' },
  { label: 'Changelog', value: 'changelog', icon: 'line-md:backup-restore' },
])
const activeTab = ref<PluginTab>('overview')

const route = useRoute()
const slug = route.params.slug as string

// Single markdown: content/plugins/<slug>.md  (Overview + Installation + Changelog)
const { data: plugin } = await useAsyncData(`plugin-${slug}`, () =>
  queryCollection('content').path(`/plugins/${slug}`).first(),
)

if (!plugin.value) {
  throw createError({ statusCode: 404, statusMessage: 'Plugin not found', fatal: true })
}

const pluginData = computed(() => plugin.value!)
const logoFailed = ref(false)

// Body split into the three tabs
const sections = computed(() => splitPluginBody((plugin.value?.body?.value ?? []) as any[]))

// TOC = the "###" headings under the active tab's "##"
const tocLinks = computed(() =>
  plugin.value?.body?.toc?.links?.find(l => l.id === activeTab.value)?.children ?? [],
)

useSeoMeta({
  title: () => `${pluginData.value.title} | Ambiente Livre Labs`,
  description: () => pluginData.value.description,
})
</script>

<template>
  <main v-if="pluginData" class="w-full">
    <div class="mx-auto w-[min(1000px,calc(100%-2rem))] pb-16 pt-6">
      <UBreadcrumb :items="[{ label: 'Catalog', to: '/catalog' }, { label: pluginData.title }]" class="mb-8" />

      <div class="flex flex-col gap-6 pb-10 dark:border-zinc-800 md:flex-row md:items-start md:justify-between">
        <div class="flex items-start gap-4">
          <div
            class="grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50 text-lg font-bold text-indigo-600 dark:border-indigo-900 dark:bg-indigo-950">
            <img v-if="pluginData.logo && !logoFailed" :src="pluginData.logo" :alt="`${pluginData.title} logo`"
              class="size-10 object-contain" @error="logoFailed = true">
            <span v-else>{{ pluginData.initials || pluginData.title.slice(0, 2) }}</span>
          </div>
          <div class="grid grid-rows-3">
            <div class="inline-flex items-center text-xs py-1 gap-1">
              <Icon name="material-symbols:extension-outline" mode="svg" size="16" class="shrink-0 text-zinc-400" />
              <Icon v-if="pluginData.type?.toLowerCase() === 'integration'" name="line-md:arrows-horizontal-alt"
                mode="svg" size="16" class="shrink-0 text-zinc-400" />
              <span class="p-1">{{ pluginData.type }}</span>
              <Icon v-if="pluginData.openSource" name="boxicons:community" mode="svg" size="16"
                class="shrink-0 text-zinc-400" />
              <Icon v-else name="line-md:security-twotone" mode="svg" size="16" class="shrink-0 text-zinc-400" />
              <span class="p-1">{{ pluginData.openSource ? 'Community' : 'Enterprise' }}</span>
              <template v-if="pluginData.verified">
                <Icon name="line-md:confirm-circle" mode="svg" size="16" class="shrink-0 text-zinc-400" />
                <span class="p-1">Verified</span>
              </template>
            </div>
            <h1 class="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              {{ pluginData.title }}
            </h1>
            <div class="inline-flex items-center text-xs py-1.5 gap-1">
              <Icon name="line-md:star-alt-twotone-right-half" mode="svg" size="1.2rem"
                class="shrink-0 text-zinc-400" />
              <span class="p-0.5">98 stars</span>
              <span class="inline-block size-1 rounded-full bg-zinc-400 mx-1" />
              <Icon name="boxicons:price-tag-alt" mode="svg" size="16" class="shrink-0 text-zinc-400" />
              <span class="p-0.5">v1.2.1</span>
              <span class="p-1">|</span>
              <ULink to="#" class="hover:-translate-y-1 hover:scale-110 transition-all duration-300">
                <UTooltip text="Miguel">
                  <UAvatar src="https://avatars.githubusercontent.com/u/97977665?s=130&v=4" size="sm" loading="lazy" />
                </UTooltip>
              </ULink>
            </div>
          </div>
        </div>

        <UButton to="/catalog" color="neutral" variant="outline" class="self-center mr-[10%]">
          <Icon name="line-md:download" mode="svg" />
          Get Plugin
        </UButton>
      </div>

      <div class="grid grid-cols-[minmax(0,1fr)_16rem] gap-8">
        <!-- Tabs: every tab comes from the same markdown -->
        <UTabs v-model="activeTab" color="neutral" variant="link" :content="true" :items="items" class="w-full">
          <template #content="{ item }">
            <div class="p-4">
              <PluginChangelog v-if="item.value === 'changelog'" :nodes="sections.changelog" :doc="plugin!" />

              <ContentRenderer v-else-if="sections[item.value as PluginTab].length"
                :value="toDoc(plugin, sections[item.value as PluginTab])" />

              <p v-else class="text-sm text-zinc-500">Nothing here yet.</p>
            </div>
          </template>
        </UTabs>

        <!-- Sidebar -->
        <aside class="sticky top-10 flex flex-col gap-2 self-start overflow-x-clip">
          <ContentTable :links="tocLinks" />

          <USeparator class="py-4 w-full" :avatar="{ src: 'https://github.com/alfresco.png', loading: 'lazy' }" />

          <div class="px-4 py-2">
            <div class="grid grid-rows-3 gap-2">
              <h2>Details</h2>
              <ULink to="#"
                class="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                <Icon name="material-symbols:bigtop-updates" mode="svg" size="1.2rem" />
                <span>Updated 3 weeks ago</span>
              </ULink>
              <ULink to="#"
                class="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                <Icon name="griddy-icons:code-package" mode="svg" size="1.2rem" />
                <span>Created 2 years ago</span>
              </ULink>
            </div>
          </div>

          <div class="grid grid-rows-3 gap-1 px-4 py-2">
            <h2>Contributors <span class="not-dark:bg-zinc-200 p-1 rounded-full text-sm">10</span></h2>
            <AvatarGroup />
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>