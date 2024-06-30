import { config } from "$/lib/variables";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request }) => {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return json({ message: "Authorization header missing" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return json({ message: "Token missing" }, { status: 401 });
  }

  try {
    const pkg = await import("jsonwebtoken");
    const { verify } = pkg.default;

    const secret_key: string | undefined = config.JWT_SECRET;

    if (!secret_key) {
      return json({ message: "Secret key not found" }, { status: 500 });
    }

    const decoded: any = verify(token, secret_key);

    const { Username, role } = decoded;

    return json({ Username, role });
  } catch (error) {
    console.error("JWT verification failed:", error);
    return json({ message: "Invalid token" }, { status: 401 });
  }
};
