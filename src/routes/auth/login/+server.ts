import { JWT_SECRET } from '$env/static/private';
import { find_user, login } from '$lib/db/user';
import { error, json, redirect } from '@sveltejs/kit';
import { z } from 'zod';

export async function POST({ request, cookies }: any) {
	const body = await request.json();

	const schema = z.object({
		username: z
			.string()
			.regex(new RegExp('[A-Za-z0-9]'), {
				message: 'Username should have only characters and numbers '
			})
			.min(1, { message: 'Username is required' })
			.max(10, { message: 'Username should be less than 10 chars' }),
		password: z.string().min(8, { message: 'Password Too Short' })
	});

	const parsed = schema.safeParse(body);
	if (!parsed.success) {
		return error(400, parsed.error.message);
	}
	const notRegistered = await find_user({ user: body.username });
	if (!notRegistered) {
		error(404, 'user not found');
	}

	const data = await login(body);

	if (data == null) {
		error(402, 'wrong password');
	}

	cookies.set('user', data, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: JWT_SECRET,
		maxAge: 60 * 60 * 24 * 30
	});

	redirect(302, '/app');
}
