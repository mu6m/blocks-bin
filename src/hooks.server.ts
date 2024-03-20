import type { Handle } from '@sveltejs/kit';
import { verifyAccessToken } from '$lib/helpers/jwt';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('user');

	//that's how it's should be done
	//not with .startswith
	const routes = event.url.pathname.split('/').slice(1);

	if (!session) {
		// Dont allow him to access the api route we use it to send the posts
		if (routes[0] === 'app' || routes[0] === 'api') {
			return new Response(null, {
				status: 302,
				headers: { location: '/' }
			});
		}
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

	//why do you need login/register when you are already signed up?
	if (routes[0] === 'auth' && routes[1] !== 'logout') {
		return new Response(null, {
			status: 302,
			headers: { location: '/app' }
		});
	}

	// load page as normal
	return await resolve(event);
};
