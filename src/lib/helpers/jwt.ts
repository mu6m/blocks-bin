import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export async function signAccessToken(payload: any) {
	return jwt.sign(payload, JWT_SECRET);
}

export async function verifyAccessToken(token: any) {
	try {
		const decodedToken = jwt.verify(token, JWT_SECRET);
		return decodedToken;
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return false;
		}
	}
}
