import prisma from '$lib/helpers/prisma';
import { Resend } from 'resend';
import { RESEND_TOKEN } from '$env/static/private';

async function check_email(email: string) {
	let id = undefined;
	let data = undefined;

	//check if user exists
	const user = await prisma.user.findUnique({
		where: {
			email
		}
	});
	if (user) {
		return null;
	}
	data = await prisma.verify.findUnique({
		where: {
			email
		}
	});

	id = data?.id;
	if (!id) {
		data = await prisma.verify.create({
			data: {
				email
			}
		});
		id = data.id;
	}
	return id;
}

async function check_email_code({ email, code }: { email: string; code: string }) {
	//check the records
	const data = await prisma.verify.findUnique({
		where: {
			id: code,
			email
		}
	});
	if (data?.id) {
		// remove the code
		await prisma.verify.delete({
			where: {
				id: code
			}
		});
		// create a user with that email but without a user and a password
		const { id } = await prisma.user.create({
			data: {
				email
			}
		});
		if (id) {
			return true;
		}
	}
	return false;
}

//when registering the user and the code is null just continue with the registering
export async function check_code({ email, code }: { email: string; code: string }) {
	const verified = await check_email_code({ email, code });
	return { verified };
}

export async function send_code({ email }: { email: string }) {
	const resend = new Resend(RESEND_TOKEN);
	const code = await check_email(email);
	if (code === null) {
		return { error: 409, data: 'email already exists continue registering' };
	}
	const resp = await resend.emails.send({
		from: 'noreply@ledraa.space',
		to: email,
		subject: 'BlocksBin Code',
		html: `<p>Congrats on creating your account on blocksbin !</p><p>here is your code <strong>${code}</strong></p>`
	});
	console.log(resp);
	if (resp.error != null) {
		return { error: 500 };
	}
	return { error: 0 };
}
