import pool from "$/lib/db";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  try {
    const GettingProducts: any[] = await pool.query(
      "SELECT ProductId, ProductName, ProductDesc, ProductImage1Url, ProductPrice, ProductQuantity FROM products"
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
