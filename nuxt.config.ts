// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    'nuxt-studio',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/icon/module',
    '@nuxt/image',
  ],
  devtools: { enabled: false },
  compatibilityDate: '2024-04-03',
  studio: {
    route: '/_studio',
    repository: {
      provider: 'github', // 'github' or 'gitlab', default: 'github'
      owner: 'ambientelivre', // your GitHub/GitLab username or organization
      repo: 'ambiente-livre-labs-v2', // your repository name
      branch: 'main', // the branch to commit to (default: main)
    }
  },
  css: [
    '~/assets/css/app.css',
  ],
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
      ]
    }
  }
})
