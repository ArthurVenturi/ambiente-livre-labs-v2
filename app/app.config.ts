export default defineAppConfig({
    ui: {
        colors: {
            primary: 'sky',
        },
        icons: {
            light: 'line-md:moon-alt-to-sunny-outline-loop-transition',
            dark: 'line-md:moon-alt-loop',
        },

        pagination: {
            slots: {
                item: "transition-colors duration-200 hover:bg-zinc-300 not-dark:bg-zinc-200 p-2 rounded-full dark:text-labs-off-white",
                next: "transition-colors duration-200 hover:bg-zinc-300 not-dark:bg-zinc-200 p-2 rounded-full dark:text-labs-off-white",
                prev: "transition-colors duration-200 hover:bg-zinc-300 not-dark:bg-zinc-200 p-2 rounded-full dark:text-labs-off-white",
                first: "transition-colors duration-200 hover:bg-zinc-300 not-dark:bg-zinc-200 p-2 rounded-full dark:text-labs-off-white",
                last: "transition-colors duration-200 hover:bg-zinc-300 not-dark:bg-zinc-200 p-2 rounded-full dark:text-labs-off-white",
            }
        },

        badge: {
            slots: {
               base: "inset-0"
            },
            compoundVariants: [
                {
                    color: 'neutral',
                    variant: 'outline',
                    class: 'bg-transparent border-0 border-transparent'
                }
            ]
        }
    }
})
