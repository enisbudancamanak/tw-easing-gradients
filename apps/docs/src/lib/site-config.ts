import { defineSiteConfig } from '@svecodocs/kit';

export const siteConfig = defineSiteConfig({
	name: 'tw-easing-gradients',
	url: 'https://tw-easing-gradients.dev',
	ogImage: {
		url: 'https://tw-easing-gradients.dev/og.png',
		height: '630',
		width: '1200'
	},
	description:
		'Tailwind CSS v4 plugin for smooth easing gradients - eliminates hard edges in color transitions.',
	author: '',
	keywords: ['tailwindcss', 'plugin', 'gradient', 'easing', 'css', 'oklch'],
	license: {
		name: 'MIT',
		url: 'https://github.com/enisbudancamanak/tw-easing-gradients/blob/main/LICENSE'
	},
	links: {
		github: 'https://github.com/enisbudancamanak/tw-easing-gradients'
	}
});
