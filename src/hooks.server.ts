import type { Handle } from '@sveltejs/kit';
import { verifyAccessToken } from '$lib/helpers/jwt';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('user');

	//that's how it's should be done
	//not with .startswith
	if (!session && event.url.pathname.split('/')[1] === 'app') {
		// if there is no session load page as normal
		return new Response(null, {
			status: 302,
			headers: { location: '/' }
		});
	}

	const user = await verifyAccessToken(session);

	if (!user) {
		// event.cookies.delete('user', { path: '/' });
		return await resolve(event);
	}

	// if `user` exists set `events.local`
	if (user) {
		event.locals.user = {
			id: user.id,
			username: user.username,
			email: user.email
		};
	}

	// load page as normal
	return await resolve(event);
};
