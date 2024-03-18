import { check_code, send_code } from '$lib/db/user';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

export async function POST({ request, params }: any) {
	if (params.type == 'confirm') {
		const body = await request.json();

		//send code to email
		if (body.email !== undefined) {
			const schema = z
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
				);
			try {
				const schema_data = schema.parse(body.email);
				const data = await send_code({ email: schema_data });
				return json(data);
			} catch (error: any) {
				return json({ success: false, data: error?.issues });
			}
		}

		//check for code
		if (body.code !== undefined) {
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
			try {
				const schema_data = schema.parse(body);
				const data = await check_code(schema_data);
				return json(data);
			} catch (error: any) {
				return { success: false, data: error?.issues };
			}
		}
	}
	return error(405);
}
