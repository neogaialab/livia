import { createCookie, redirect } from "@remix-run/node"
import { generateCodeVerifier, generateState } from "arctic"
import { google } from "~/auth.server"

export async function loader() {
  const scopeOrigin = "https://www.googleapis.com"

  const scopes = [
    `${scopeOrigin}/auth/userinfo.email`,
    `${scopeOrigin}/auth/userinfo.profile`,
  ]

  const state = generateState()
  const codeVerifier = generateCodeVerifier()
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes,
  })

  // Create cookies
  const googleOauthStateCookie = createCookie("google_oauth_state", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    maxAge: 60 * 10, // 10 minutes
  });

  const codeVerifierCookie = createCookie("code_verifier", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    maxAge: 60 * 10, // 10 minutes
  });

  const headers = new Headers();
  headers.append("Set-Cookie", await googleOauthStateCookie.serialize(state));
  headers.append("Set-Cookie", await codeVerifierCookie.serialize(codeVerifier));

  return redirect(url.toString(), { headers });
}
