import prisma from '$lib/helpers/prisma';

export async function load({ locals, params }: any) {
	const blocks = await prisma.block.findMany({
		where: {
			listId: params.list
		}
	});
	return {
		blocks
	};
}
