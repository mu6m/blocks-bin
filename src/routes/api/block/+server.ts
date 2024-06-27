import prisma from '$lib/helpers/prisma';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

export async function POST({ request, locals }: any) {
	const body = await request.json();

	const schema = z.object({
		id: z.string().min(1, { message: 'content is required' }),
		content: z.array(z.string().min(1, { message: 'content is required' }))
	});

	const parsed = schema.safeParse(body);
	if (!parsed.success) {
		return error(400, parsed.error.message);
	}
	const data = await prisma.$transaction(async (tx) => {
		await tx.block.deleteMany({
			where: {
				listId: body.id
			}
		});
		for (let index = 0; index < body.content.length; index++) {
			const text = body.content[index];

			body.content[index] = {
				listId: body.id,
				content: text
			};
		}
		console.log(body);
		const data = await tx.block.createMany({
			data: body.content
		});
		return data;
	});

	return json(data);
}
