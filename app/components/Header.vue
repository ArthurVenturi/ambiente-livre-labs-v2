<script setup lang="ts">
const isMobileMenuOpen = ref(false)
const colorMode = useColorMode()
const isMounted = ref(false)
const sortOpen = ref(false)

onMounted(() => {
    isMounted.value = true
})

const isDark = computed(() => isMounted.value && colorMode.value === 'dark')
const colorModeIcon = computed(() => isDark.value
    ? 'line-md:sunny-outline-to-moon-alt-loop-transition'
    : 'line-md:moon-alt-to-sunny-outline-loop-transition')

function toggleColorMode() {
    colorMode.preference = isDark.value ? 'light' : 'dark'
}

const productItems = [[
    { label: 'Plugin catalog', to: '/catalog', description: 'Browse integrations and extensions', icon: 'line-md:library' },
    { label: 'Submit a plugin', to: '/catalog#submit', description: 'Share your work with the community', icon: 'line-md:plus' },
]]

const serviceItems = [[
    { label: 'Consulting', to: '#', description: 'Open-source implementation support', icon: 'line-md:briefcase' },
    { label: 'Support', to: '#', description: 'Get help from our team', icon: 'line-md:chat' },
]]
</script>

<template>
    <nav class="relative flex items-center justify-between gap-6 px-6 py-4 md:px-12 lg:px-24 xl:px-40">
        <NuxtLink to="/" class="shrink-0 no-underline">
            <NuxtImg src="/logo.svg" class="h-16 w-32 object-contain" alt="Ambiente Livre Labs" />
        </NuxtLink>

        <!-- Desktop Nav Items -->
        <div class="hidden items-center gap-1 rounded-full bg-default px-2 py-1 shadow-sm md:flex">
            <UDropdownMenu :items="productItems" :content="{ align: 'start' }">
                <UButton color="neutral" variant="ghost" trailing-icon="line-md:chevron-down">Products</UButton>
            </UDropdownMenu>
            <UDropdownMenu :items="serviceItems" :content="{ align: 'start' }">
                <UButton color="neutral" variant="ghost" trailing-icon="line-md:chevron-down">Services</UButton>
            </UDropdownMenu>
            <NuxtLink v-for="label in ['Apps', 'Pricing', 'About']" :key="label" to="#"
                class="rounded-full px-3 py-2 text-sm text-default no-underline hover:bg-elevated">{{ label }}
            </NuxtLink>
        </div>

        <!-- Desktop CTA Button -->
        <div class="hidden items-center gap-3 md:flex">
            <ContentSearch />
            <UButton color="neutral" variant="ghost" square
                :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'" @click="toggleColorMode">
                <Icon :name="colorModeIcon" size="1.5rem" aria-hidden="true" />
            </UButton>
        </div>

        <!-- Mobile Hamburger -->
        <button id="hamburger" :aria-expanded="isMobileMenuOpen" aria-controls="mobileMenu"
            aria-label="Toggle navigation menu" type="button" @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden flex flex-col gap-1.5 cursor-pointer border-0 bg-transparent p-1">
            <span id="bar1" class="block w-6 h-0.5 bg-default transition-transform"></span>
            <span id="bar2" class="block w-6 h-0.5 bg-default transition-opacity"></span>
            <span id="bar3" class="block w-6 h-0.5 bg-default transition-transform"></span>
        </button>

        <!-- Mobile Menu -->
        <div v-if="isMobileMenuOpen" id="mobileMenu"
            class="absolute left-0 top-full z-50 flex w-full flex-col gap-1 border-t border-default bg-default p-5 shadow-lg md:hidden">
            <NuxtLink to="/catalog"
                class="rounded-lg px-4 py-2.5 text-sm font-medium text-default no-underline hover:bg-elevated"
                @click="isMobileMenuOpen = false">Products</NuxtLink>
            <NuxtLink to="#" class="rounded-lg px-4 py-2.5 text-sm text-muted no-underline hover:bg-elevated"
                @click="isMobileMenuOpen = false">Services</NuxtLink>
            <NuxtLink to="#" class="rounded-lg px-4 py-2.5 text-sm text-muted no-underline hover:bg-elevated"
                @click="isMobileMenuOpen = false">Apps</NuxtLink>
            <NuxtLink to="#" class="rounded-lg px-4 py-2.5 text-sm text-muted no-underline hover:bg-elevated"
                @click="isMobileMenuOpen = false">Pricing</NuxtLink>
            <NuxtLink to="#" class="rounded-lg px-4 py-2.5 text-sm text-muted no-underline hover:bg-elevated"
                @click="isMobileMenuOpen = false">About</NuxtLink>
            <UButton class="mt-3 w-fit rounded-full" @click="toggleColorMode">
                <Icon :name="colorModeIcon" aria-hidden="true" />
                {{ isDark ? 'Light mode' : 'Dark mode' }}
            </UButton>
        </div>
    </nav>

</template>