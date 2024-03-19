import { check_code, send_code } from '$lib/db/email';
import { register, find_user } from '$lib/db/user';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

export async function POST({ request, params }: any) {
	const body = await request.json();

	const schema = z.object({
		email: z
			.string()
			.min(1, { message: 'Email is required' })
			.email({ message: 'Please enter a valid email address.' })
			.refine(
				(email) => {
					const usernamePart = email.substring(0, email.indexOf('@'));
					return (
						!usernamePart.includes('+') &&
						!usernamePart.includes('.') &&
						email.endsWith('@gmail.com')
					);
				},
				{
					message: 'Only Gmail addresses without + or . in username are allowed.'
				}
			),
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
	const data = await register(body);
	return json(data);
}
