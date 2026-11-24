<script setup lang="ts">
interface Plugin {
  path?: string
  title: string
  publisher: string
  description: string
  logo?: string
  initials?: string
  categories: string[]
  type: string
  featured: boolean
  install?: {
    packageManager?: string
    command?: string
    requirements?: string[]
  }
}

const props = defineProps<{ plugin: Plugin }>()
const logoFailed = ref(false)

const pluginInitials = computed(() => props.plugin.initials || props.plugin.title.slice(0, 2).toUpperCase())
const pluginUrl = computed(() => {
  const path = props.plugin.path
  if (!path) return '#'
  return path.startsWith('/plugins/') ? path : `/plugins/${path.split('/').pop()}`
})
</script>

<template>
  <NuxtLink :to="pluginUrl" class="block">
  <UCard
    class="h-full rounded-xl border-labs-line border bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-labs-blue/50 hover:shadow-md dark:border-zinc-700 dark:bg-labs-navy cursor-pointer relative overflow-hidden">
    <canvas v-if="plugin.type"
      class="absolute -bottom-8 -right-8 size-28 rounded-full bg-labs-blue/20 pointer-events-none"
      aria-hidden="true"></canvas>
    <div class="flex min-h-32 flex-col relative z-10">
      <div class="flex items-start justify-between gap-3">
        <div class="flex min-w-0 items-center gap-3">
          <div
            class="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-labs-blue/50 bg-labs-blue/5 text-xs font-bold text-labs-blue">
            <NuxtImg v-if="plugin.logo && !logoFailed" :src="plugin.logo" :alt="`${plugin.title} logo`" loading="lazy"
              @error="logoFailed = true" />
            <span v-else aria-hidden="true">{{ pluginInitials }}</span>
          </div>
          <div class="min-w-0">
            <h3 class="truncate text-[13px] font-semibold text-labs-navy dark:text-white">
              {{ plugin.title }}
            </h3>
            <p class="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
              by {{ plugin.publisher }}
            </p>
          </div>
        </div>
      </div>
      <p class="mt-4 line-clamp-2 text-[11px] leading-[1.7] text-zinc-500 dark:text-zinc-400 overflow-clip">
        {{ plugin.description }}
      </p>

      <div class="mt-auto flex items-center justify-between gap-2 pt-3 dark:border-zinc-700">
        <div class="flex min-w-0 flex-wrap gap-1.5" aria-label="Plugin categories">
          <UBadge v-for="category in plugin.categories" :key="category" color="neutral" variant="soft" size="sm"
            class="text-[10px]">
            <Icon name="line-md:link" class="mr-1" aria-hidden="true" />
            {{ plugin.type }}
          </UBadge>
        </div>
      </div>
    </div>
  </UCard>
  </NuxtLink>
</template>
