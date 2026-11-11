<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'))

const { search, status, init } = useSearchCollection('content', {
    immediate: false,
    ignoredTags: ['style']
})

const { open } = useContentSearch()

// Defer index initialization until the user opens the palette when using `immediate: false`
watch(open, (value) => {
    if (value && status.value === 'idle') {
        init()
    }
})

</script>

<template>
    <ClientOnly>
        <UContentSearchButton :collapsed="true" />
        <LazyUContentSearch
            v-model:open="open"
            :navigation="navigation"
            :search="search"
            :search-status="status"
            shortcut="meta_k"
        />
    </ClientOnly>
</template>
