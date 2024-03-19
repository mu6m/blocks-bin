import { signAccessToken } from '$lib/helpers/jwt';
import prisma from '$lib/helpers/prisma';
import bcrypt from 'bcrypt';

export async function register({
	email,
	username,
	password
}: {
	email: string;
	username: string;
	password: string;
}) {
	const hashed = await bcrypt.hash(password, 10);

	const user = await prisma.user.update({
		where: {
			email: email
		},
		data: {
			username,
			password: hashed
		}
	});
	return user;
}

export async function login({ username, password }: { username: string; password: string }) {
	let user: any = await prisma.user.findUnique({
		where: {
			username
		}
	});

	if (user === null || user.password === null) {
		return null;
	}

	const result = bcrypt.compare(password, user.password);

	if (!result) {
		return null;
	}

	delete user.password;

	const token = await signAccessToken(user);

	return token;
}

export async function find_user({ user }: { user: string }) {
	const data = await prisma.user.findFirst({
		where: { OR: [{ username: user }, { email: user }] }
	});

	if (data?.username != null) {
		return true;
	}

	return false;
}
