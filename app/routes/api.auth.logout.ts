import { json, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { parseCookies } from "oslo/cookie";
import { lucia } from "~/auth.server";

function destroySession() {
  const sessionCookie = lucia.createBlankSessionCookie();

  return redirect("/sign-in", {
    headers: {
      "Set-Cookie": sessionCookie.serialize(),
    },
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const cookies = request.headers.get("cookie");
  const sessionId = parseCookies(cookies || "").get(lucia.sessionCookieName);

  if (!sessionId)
    return redirect("/sign-in");

  await lucia.invalidateSession(sessionId)
  
  return destroySession()
}
