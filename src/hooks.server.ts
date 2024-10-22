import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const cookieHeader = event.request.headers.get("cookie");

  const cookies = Object.fromEntries(
    (cookieHeader ? cookieHeader.split("; ") : []).map((cookie) => {
      const [key, value] = cookie.split("=");
      return [key, decodeURIComponent(value)];
    })
  );
  const AuthToken = cookies.AuthToken;

  if (event.url.pathname.startsWith("/admin")) {
    if (!AuthToken) {
      return new Response("403 Not Authorized", { status: 403 });
    }
    const role = await LoadUser(AuthToken, event);
    if (!role || role !== "Admin") {
      return new Response("403 Not Authorized", { status: 403 });
    }
  }

  return await resolve(event);
};

// Load user function
const LoadUser = async (AuthToken: string, event: any) => {
  const response = await event.fetch("/api/auth/admin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + AuthToken,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.role;
  } else {
    console.error("Failed to fetch user data:", response.status);
    return null;
  }
};
