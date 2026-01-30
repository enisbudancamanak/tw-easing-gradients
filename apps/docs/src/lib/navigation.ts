import { defineNavigation } from '@svecodocs/kit';
import ChalkboardTeacher from 'phosphor-svelte/lib/ChalkboardTeacher';
import RocketLaunch from 'phosphor-svelte/lib/RocketLaunch';
import PlayCircle from 'phosphor-svelte/lib/PlayCircle';

export const navigation = defineNavigation({
	anchors: [
		{
			title: 'Introduction',
			href: '/docs',
			icon: ChalkboardTeacher
		},
		{
			title: 'Getting Started',
			href: '/docs/getting-started',
			icon: RocketLaunch
		},
		{
			title: 'Playground',
			href: '/playground',
			icon: PlayCircle
		}
	],
	sections: [
		{
			title: 'Reference',
			items: [
				{
					title: 'Utilities',
					href: '/docs/utilities'
				},
				{
					title: 'Examples',
					href: '/docs/examples'
				},
				{
					title: 'API Reference',
					href: '/docs/api-reference'
				}
			]
		}
	]
});
