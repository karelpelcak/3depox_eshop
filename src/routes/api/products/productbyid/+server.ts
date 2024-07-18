import pool from "$/lib/db";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
  try {
    const productId = url.searchParams.get("ProductId");

    if (!productId) {
      return new Response(
        JSON.stringify({ error: "ProductId is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const ProductById: any[] = await pool.query(
      "SELECT * FROM products WHERE ProductId = ?",
      [productId]
    );

    return new Response(
      JSON.stringify({ Products: ProductById[0] }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message, mess: "An error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
