import type { RequestHandler } from "@sveltejs/kit";
import pool from "$lib/db";

export const GET: RequestHandler = async () => {
  try {
    const [rows] = await pool.query("SELECT username FROM users");
    return new Response(JSON.stringify(rows), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database query error:", error);
    return new Response(JSON.stringify({ error: "Database query error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
