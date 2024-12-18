import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true, // Hide the deprecation warnings of Bulma with new version of SCSS
            },                   // TODO: remove this when Bulma have a new version that solves it.
        },
    },	plugins: [sveltekit()]
});
