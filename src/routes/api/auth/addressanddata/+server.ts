import pool from '$/lib/db';
import { config } from '$/lib/variables';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
    let secret_key = await config.JWT_SECRET;
    if (!secret_key) {
        return new Response(JSON.stringify({ error: 'JWT secret key is not defined' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
        return new Response(JSON.stringify({ message: 'Authorization header missing' }), {
            status: 401,
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return new Response(JSON.stringify({ message: 'Token missing' }), {
            status: 401,
        });
    }

    try {
        const pkg = await import('jsonwebtoken');
        const { verify } = pkg.default;

        const secret_key: string | undefined = config.JWT_SECRET;

        const decoded: any = verify(token, secret_key);

        const { Email } = decoded;

        const GettingUser: any[] = await pool.query(
            'SELECT PhoneNumber, StreetAndNumber, City, PostalCode, Username, Email FROM users WHERE Email = ?',
            [Email]
        );

        return new Response(JSON.stringify({ Adr: GettingUser[0][0] }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
        });
    }
};
