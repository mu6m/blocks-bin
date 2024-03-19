import { send_code } from '$lib/db/email';
import { find_user } from '$lib/db/user';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

export async function POST({ request }: any) {
	const body = await request.json();

	const schema = z
		.string()
		.min(1, { message: 'Email is required' })
		.email({ message: 'Please enter a valid email address.' })
		.refine(
			(email) => {
				const usernamePart = email.substring(0, email.indexOf('@'));
				return (
					!usernamePart.includes('+') && !usernamePart.includes('.') && email.endsWith('@gmail.com')
				);
			},
			{
				message: 'only gmail addresses without + or . in username are allowed.'
			}
		);
	const parsed = schema.safeParse(body.email);
	if (!parsed.success) {
		return error(400, parsed.error.message);
	}
	const user = await find_user({ user: body.email });

	if (user) {
		return error(422);
	}

	const data = await send_code({ email: body.email });

	return json(data);
}
