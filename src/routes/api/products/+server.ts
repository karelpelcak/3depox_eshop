import pool from "$/lib/db";
import { config } from "$/lib/variables";
import type { RequestHandler } from "@sveltejs/kit";
const pkg = await import("jsonwebtoken");
const { verify } = pkg.default;

export const GET: RequestHandler = async ({ request }) => {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return new Response(
      JSON.stringify({ message: "Authorization header missing" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return new Response(JSON.stringify({ message: "Token missing" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const secret_key: string | undefined = config.JWT_SECRET;

    if (!secret_key) {
      return new Response(JSON.stringify({ message: "Secret key not found" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const GettingProducts: any[] = await pool.query(
      "SELECT * FROM products"
    );
    return new Response(JSON.stringify({ Products: GettingProducts[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
