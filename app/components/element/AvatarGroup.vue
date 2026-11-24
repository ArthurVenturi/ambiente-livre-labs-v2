<script setup lang="ts">
interface Contributor {
    login: string
    avatarUrl: string
    url: string
    contributions?: number
}

withDefaults(defineProps<{
    contributors?: Contributor[]
    max?: number
}>(), {
    contributors: () => [],
    max: 10,
})
</script>

<template>
    <UAvatarGroup v-if="contributors.length" :max="max">
        <ULink v-for="c in contributors" :key="c.login" :to="c.url" target="_blank" rel="noopener"
            class="hover:-translate-y-1 hover:scale-110 transition-all duration-300">
            <UTooltip :text="c.login">
                <UAvatar :src="c.avatarUrl" :alt="c.login" loading="lazy" />
            </UTooltip>
        </ULink>
    </UAvatarGroup>
</template>