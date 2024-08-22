import { createCookie, createSession, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { UserInsert } from "db/schema";
import { google, lucia } from "~/auth.server";
import { createUser, getOAuthAccount } from "~/services/user";
import { getGoogleUser } from "~/utils/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");

  const googleOauthStateCookie = createCookie("google_oauth_state");
  const codeVerifierCookie = createCookie("code_verifier");

  const storedState = (await googleOauthStateCookie.parse(cookieHeader)) || null;
  const storedCodeVerifier = (await codeVerifierCookie.parse(cookieHeader)) || null;

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
    return new Response(null, { status: 400 })
  }

  const googleUser = await getGoogleUser(google, code, storedCodeVerifier);

  const userInsert: UserInsert = {
    name: googleUser.given_name,
    lastName: googleUser.family_name,
    email: googleUser.email,
    picture: googleUser.picture,
  }

  const existingUser = await getOAuthAccount({
    providerId: "google",
    providerUserId: googleUser.sub,
  })

  let userId: string;

  if(existingUser) {
    userId = existingUser.userId
  } else {
    const newUser = await createUser(userInsert, {
      providerId: "google",
      providerUserId: googleUser.sub,
    })

    userId = newUser.id
  }

  const session = await lucia.createSession(userId, {})

  const headers = new Headers();
  headers.append("Set-Cookie", lucia.createSessionCookie(session.id).serialize());

  return redirect("/", { headers })
}
