import { error } from '@sveltejs/kit';

export function load({ params }: any) {
	const type = params.type;
	if (type != 'login' && type != 'register' && type != 'confirm' && type != 'reset') {
		error(404, 'Not Found');
	}
}
