import pool from "$/lib/db";
import { config } from "$/lib/variables";
import type { RequestHandler } from "@sveltejs/kit";
const pkg = await import("jsonwebtoken");
const { verify } = pkg.default;

export const POST: RequestHandler = async ({ request }) => {
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

    verify(token, secret_key);

    const {
      ProductName,
      ProductDesc,
      ProductImage1Url,
      ProductImage2Url,
      ProductImage3Url,
      ProductImage4Url,
      ProductPrice,
      ProductQuantity,
      CategoryId,
    } = await request.json();
    
    if (
      !ProductName ||
      !ProductDesc ||
      !ProductPrice ||
      !ProductQuantity ||
      !CategoryId
    ) {
      return new Response(
        JSON.stringify({ message: "Missing product information" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const SqlResponse: any[] = await pool.query(
      "INSERT INTO products (ProductName, ProductDesc, ProductImage1Url, ProductImage2Url, ProductImage3Url, ProductImage4Url, ProductPrice, ProductQuantity, CategoryId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        ProductName,
        ProductDesc,
        ProductImage1Url,
        ProductImage2Url,
        ProductImage3Url,
        ProductImage4Url,
        ProductPrice,
        ProductQuantity,
        CategoryId,
      ]
    );

    return new Response(JSON.stringify({ UserList: SqlResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
