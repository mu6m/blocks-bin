import { check_code } from '$lib/db/email';
import { register } from '$lib/db/user';
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
		code: z.string().min(1, { message: 'Code is required' })
	});

	const parsed = schema.safeParse(body);
	if (!parsed.success) {
		return error(400, parsed.error.message);
	}

	const data = await check_code(body);
	return json(data);
}
