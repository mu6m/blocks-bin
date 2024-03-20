import { create, list } from '$lib/db/list';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';

export async function POST({ request, locals }: any) {
	const body = await request.json();

	const schema = z.object({
		title: z
			.string()
			.min(1, { message: 'title is required' })
			.max(1000, { message: 'title should be less than 1000 chars' })
	});

	const parsed = schema.safeParse(body);
	if (!parsed.success) {
		return error(400, parsed.error.message);
	}

	const data = await create({ title: body.title, id: locals.user.id });

	return json(data);
}

export async function GET({ request, locals, url }: any) {
	if (!url.searchParams.has('skip') || !url.searchParams.has('take')) {
		error(401, 'fields are required !');
	}
	const body = {
		skip: Number(url.searchParams.get('skip')),
		take: Number(url.searchParams.get('take'))
	};

	const schema = z.object({
		skip: z
			.number()
			.min(0, { message: 'take is required' })
			.max(1000, { message: 'take should be less than 1000' }),
		take: z
			.number()
			.min(0, { message: 'take is required' })
			.max(1000, { message: 'take should be less than 1000' })
	});

	const parsed = schema.safeParse(body);

	if (!parsed.success) {
		return error(400, parsed.error.message);
	}

	const data = await list({ skip: body.skip, take: body.take, id: locals.user.id });

	return json(data);
}
