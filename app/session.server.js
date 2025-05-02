import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production", // só HTTPS em prod
    secrets: [process.env.SESSION_SECRET],         // segredo forte!
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  }
});

export const { getSession, commitSession, destroySession } = sessionStorage;