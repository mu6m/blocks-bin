import prisma from '$lib/helpers/prisma';

export async function create({ title, id }: { title: string; id: string }) {
	const data = await prisma.list.create({
		data: {
			title,
			userId: id
		}
	});

	return data;
}

export async function count(userId: string) {
	const data = await prisma.list.count({
		where: {
			userId
		}
	});

	return data;
}

export async function list({ skip, take, id }: { skip: number; take: number; id: string }) {
	const data = await prisma.list.findMany({
		skip,
		take,
		include: {
			user: {
				select: {
					username: true
				}
			},
			blocks: true
		},
		where: {
			userId: id
		},
		orderBy: [
			{
				createdAt: 'desc'
			}
		]
	});

	return data;
}
