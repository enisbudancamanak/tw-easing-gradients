import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

const __dirname = new URL('.', import.meta.url).pathname;

export default defineConfig({
	plugins: [enhancedImages(), sveltekit(), tailwindcss()],
	server: {
		fs: {
			allow: [resolve(__dirname, './.velite')]
		}
	},
	ssr: {
		noExternal: ['@svecodocs/kit']
	}
});
