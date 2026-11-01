<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="inline-flex sm:footer-horizontal text-neutral-content items-center p-4 relative">
        <!-- <p>Copyright © {{ currentYear }}</p> -->
        <!-- <p class="inline-block items-center justify-start-safe text-8xl text-transparent font-extrabold"
            style="-webkit-text-stroke: 2px black;">
            AMBIENTE LIVRE<span style="-webkit-text-stroke: 2px #078DEB;">LABS</span>
        </p> -->
        <nav class="inline-flex ml-4 space-x-4 sm:ml-auto sm:mt-0">

            <a href="https://www.youtube.com/ambientelivre" target="_blank" rel="noopener noreferrer" class="">
                <Icon name="line-md:youtube-filled" size="1.5rem" mode="svg" />
            </a>

            <a href="https://www.linkedin.com/company/ambientelivre" target="_blank" rel="noopener noreferrer">
                <Icon name="line-md:linkedin" size="1.5rem" mode="svg" />
            </a>
            
            <a href="https://twitter.com/ambientelivre" target="_blank" rel="noopener noreferrer">
                <Icon name="line-md:twitter-x" size="1.5rem" mode="svg" />
            </a>

            <a href="https://www.facebook.com/ambientelivre" target="_blank" rel="noopener noreferrer">
                <Icon name="line-md:facebook" size="1.5rem" mode="svg" />
            </a>

            <!-- <p class="absolute inset-0 z-0 flex items-center justify-end-safe text-8xl text-transparent font-semibold" style="-webkit-text-stroke: 2px black;">
                AMBIENTE LIVRE <span style="-webkit-text-stroke: 2px #078DEB;">LABS</span>
            </p> -->
        </nav>
    </footer>
</template>