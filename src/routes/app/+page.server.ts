import { list, count } from '$lib/db/list';

export async function load({ locals }: any) {
	const data = await list({ id: locals.user.id, skip: 0, take: 10 });
	const list_count = await count();

	return {
		lists: data,
		list_count
	};
}
