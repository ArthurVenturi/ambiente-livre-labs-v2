<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <main class="flex w-full flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>