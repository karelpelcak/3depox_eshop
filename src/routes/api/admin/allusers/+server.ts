import pool from "$/lib/db";
import { config } from "$/lib/variables";
import type { RequestHandler } from "@sveltejs/kit";

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
    const pkg = await import("jsonwebtoken");
    const { verify } = pkg.default;

    const secret_key: string | undefined = config.JWT_SECRET;

    if (!secret_key) {
      return new Response(JSON.stringify({ message: "Secret key not found" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const decoded: any = verify(token, secret_key);

    const { role } = decoded;

    if (role === "Admin") {
      const GettingUser: any[] = await pool.query(
        "SELECT Username, Email, PhoneNumber, StreetAndNumber, City, PostalCode, RoleId FROM users"
      );
      return new Response(JSON.stringify({ UserList: GettingUser[0] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "Fuck you ass hole" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
