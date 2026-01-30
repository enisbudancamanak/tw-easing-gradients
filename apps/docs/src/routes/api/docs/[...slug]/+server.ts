import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url }) => {
	const slug = params.slug || 'index';

	try {
		const modules = import.meta.glob('/src/content/**/*.md', {
			query: '?raw',
			import: 'default'
		});

		let content: string | null = null;

		for (const [path, resolver] of Object.entries(modules)) {
			const pathSlug = path.replace('/src/content/', '').replace('.md', '');
			if (pathSlug === slug) {
				content = (await resolver()) as string;
				break;
			}
		}

		if (!content) {
			error(404, 'Document not found');
		}

		return new Response(content, {
			headers: {
				'Content-Type': 'text/markdown; charset=utf-8'
			}
		});
	} catch (e) {
		error(404, 'Document not found');
	}
};
