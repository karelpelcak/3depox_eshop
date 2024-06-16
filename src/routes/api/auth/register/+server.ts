import {type RequestHandler } from '@sveltejs/kit';
import pool from '$lib/db';
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { Username, Password, Email, PhoneNumber, StreetAndNumber, City, PostalCode } = await request.json();

    const existingUser: any[] = await pool.query('SELECT count(userId) AS count FROM users WHERE username = ?', [Username]);

    if (existingUser[0][0].count > 0) {
      return new Response(JSON.stringify({ error: 'Username already taken' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    await pool.query(
      'INSERT INTO users (Username, Password, Email, PhoneNumber, StreetAndNumber, City, PostalCode) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Username, hashedPassword, Email, PhoneNumber, StreetAndNumber, City, PostalCode]
    );

    return new Response(JSON.stringify({ message: 'User registered successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Registration failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};