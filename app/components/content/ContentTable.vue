<script setup lang="ts">
import type { ContentTocLink } from '@nuxt/ui'

withDefaults(defineProps<{
  links?: ContentTocLink[]
  title?: string
}>(), {
  links: () => [],
  title: 'On this page',
})
</script>

<template>
  <UContentToc
    v-if="links.length"
    :title="title"
    :links="links"
    highlight
    highlight-color="primary"
    highlight-variant="circuit"
  />
</template>