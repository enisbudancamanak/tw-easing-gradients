const REPO = 'enisbudancamanak/tw-easing-gradients';
const CACHE_DURATION = 60 * 60 * 1000;

let cachedStars: number | null = null;
let cacheTimestamp = 0;

export const load = async ({ fetch }) => {
	const now = Date.now();

	// Cache noch gültig?
	if (cachedStars !== null && now - cacheTimestamp < CACHE_DURATION) {
		return { stars: cachedStars };
	}

	try {
		const res = await fetch(`https://api.github.com/repos/${REPO}`, {
			headers: {
				Accept: 'application/vnd.github.v3+json',
				'User-Agent': 'tw-easing-gradients-docs'
			}
		});

		if (res.ok) {
			const data = await res.json();
			cachedStars = data.stargazers_count;
			cacheTimestamp = now;
			return { stars: cachedStars };
		}
	} catch {
		// Silently fail
	}

	return { stars: cachedStars };
};
