import { list, count } from '$lib/db/list';

const perpage = 10;
export async function load({ locals }: any) {
	const data = await list({ id: locals.user.id, skip: perpage, take: perpage });
	const list_count = await count(locals.user.id);

	return {
		lists: data,
		list_count,
		perpage
	};
}
