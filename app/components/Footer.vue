<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socials = [
  { label: 'X (Twitter)', icon: 'line-md:twitter-x', href: 'https://twitter.com/ambientelivre' },
  { label: 'Instagram', icon: 'line-md:instagram', href: 'https://www.instagram.com/ambientelivreopensoftware' },
  { label: 'Facebook', icon: 'line-md:facebook', href: 'https://www.facebook.com/ambientelivre' },
  { label: 'LinkedIn', icon: 'line-md:linkedin', href: 'https://www.linkedin.com/company/ambientelivre' },
  { label: 'YouTube', icon: 'line-md:youtube-filled', href: 'https://www.youtube.com/channel/UCkKoUCzTo8WMs6cI-DCTWYA' },
]
</script>

<template>
  <footer class="flex flex-col gap-6 px-6 py-5 text-zinc-900 transition-colors duration-300 sm:px-12 lg:px-24">
    <!-- Row 1: custom logo text -->
    <p
      class="text-5xl font-extrabold leading-none text-transparent sm:text-7xl lg:text-8xl"
      style="-webkit-text-stroke: 2px black;"
    >
      AMBIENTE LIVRE <span style="-webkit-text-stroke: 2px #078DEB;">LABS</span>
    </p>

    <div class="flex flex-wrap items-center justify-between gap-4">
      <p class="dark:text-labs-off-white">Copyright {{ currentYear }} © Ambiente Livre Labs</p>

      <nav class="inline-flex items-center gap-4">
        <a
          v-for="social in socials"
          :key="social.icon"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.label"
          class="rounded-full p-2 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-labs-cyan not-dark:bg-zinc-200 dark:text-labs-off-white"
        >
          <Icon :name="social.icon" size="1.5rem" mode="svg" />
        </a>
      </nav>
    </div>
  </footer>
</template>

