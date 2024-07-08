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

    const decoded: any = verify(token, secret_key);

    const { role } = decoded;

    if (role === "Admin") {
      const GettingCategories: any[] = await pool.query(
        "SELECT * FROM category"
      );
      return new Response(
        JSON.stringify({ Categories: GettingCategories[0] }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
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

export const DELETE: RequestHandler = async ({ request }) => {
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

    const { CategoryName, CategoryId } = await request.json();

    const decoded: any = verify(token, secret_key);

    const { role } = decoded;

    if (role === "Admin") {
      const GettingCategories: any[] = await pool.query(
        "DELETE FROM category WHERE CategoryName=? AND CategoryId=?",
        [CategoryName, CategoryId]
      );
      if (GettingCategories[0].affectedRows === 1) {
        return new Response(
          JSON.stringify({ Categories: GettingCategories[0].affectedRows }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        return new Response(JSON.stringify({ message: "Row not found" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
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

    const { CategoryName } = await request.json();

    const decoded: any = verify(token, secret_key);

    const { role } = decoded;

    if (role === "Admin") {
      const PuttingCategories: any[] = await pool.query(
        "INSERT INTO category (CategoryName) VALUES (?)",
        [CategoryName]
      );
      if (PuttingCategories[0].affectedRows === 1) {
        return new Response(
          JSON.stringify({ Categories: PuttingCategories[0].affectedRows }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        return new Response(JSON.stringify({ message: "Row not found" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
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
