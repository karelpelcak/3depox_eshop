import prisma from "$/lib/prisma.js";
import { config } from "$/lib/variables.js";
const pkg = await import("jsonwebtoken");
const { verify } = pkg.default;

export const PUT = async ({ request }) => {
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

  const { productId, productPrice, productQuantity } = await request.json();

  try {
    const secret_key: string | undefined = config.JWT_SECRET;

    if (!secret_key) {
      return new Response(JSON.stringify({ message: "Secret key not found" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    verify(token, secret_key);

    const UpdateProduct = await prisma.products.update({
      where: {
        ProductId: productId,
      },
      data: {
        ProductPrice: productPrice,
        ProductQuantity: productQuantity,
      },
    });
    return new Response(JSON.stringify({ msg: UpdateProduct }), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ msg: e }), { status: 400 });
  }
};
