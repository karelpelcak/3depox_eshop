import pool from '$lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { type RequestHandler } from '@sveltejs/kit';
import { config } from '$/lib/variables';

export const POST: RequestHandler = async ({ request }) => {
    let secret_key = await config.JWT_SECRET;
    if (!secret_key) {
        return new Response(JSON.stringify({ error: 'JWT secret key is not defined' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { Email, Password } = await request.json();

        if (!Email || !Password) {
            return new Response(JSON.stringify({ error: 'Email and Password are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const GettingUser: any[] = await pool.query(
            'SELECT userId, password, Username, RoleId, Email FROM users WHERE Email = ?',
            [Email]
        );

        if (GettingUser.length === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const UserRole: any[] = await pool.query('SELECT Role FROM roles WHERE RoleId = ?', [GettingUser[0][0].RoleId]);

        if (await bcrypt.compare(Password, GettingUser[0][0].password)) {
            const token = jwt.sign(
                { Username: GettingUser[0][0].Username, Email: GettingUser[0][0].Email, role: UserRole[0][0].Role },
                secret_key,
                { expiresIn: '8h' }
            );
            return new Response(JSON.stringify({ token }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ error: 'Invalid password' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
