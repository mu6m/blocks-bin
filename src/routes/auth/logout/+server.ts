import { json, redirect } from '@sveltejs/kit';

export async function POST({ cookies }: any) {
	cookies.delete('user', { path: '/' });
	redirect(302, '/');
}
