import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

declare module 'jsonwebtoken' {
	export interface UserJwtPayload extends jwt.JwtPayload {
		id: string;
		email: string;
		username: string;
	}
}

export async function signAccessToken(payload: any) {
	return jwt.sign(payload, JWT_SECRET);
}

export async function verifyAccessToken(token: any) {
	try {
		const decodedToken = <jwt.UserJwtPayload>jwt.verify(token, JWT_SECRET);
		return decodedToken;
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return false;
		}
	}
}
