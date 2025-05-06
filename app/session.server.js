import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["alguma-coisa-secreta"],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7 // 1 semana
  }
});

export const getSession = (request) =>
  sessionStorage.getSession(request.headers.get("Cookie"));