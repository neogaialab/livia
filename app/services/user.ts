import { AppLoadContext } from "@remix-run/node";
import { and, eq, sql } from "drizzle-orm";
import { generateId } from "lucia";
import { parseCookies } from "oslo/cookie";
import { lucia } from "~/auth.server";
import { OAuthProviderParams } from "~/types";
import { db } from "../../db";
import { oAuthAccounts, UserInsert, users } from "../../db/schema";

export async function createUser(
  userInsert: UserInsert,
  providerParams: OAuthProviderParams,
) {
  const userId = generateId(15)

  await db.insert(users).values({
    ...userInsert,
    id: userId,
  })
  await db.insert(oAuthAccounts).values({
    ...providerParams,
    userId,
  })

  return { id: userId }
}

export async function getOAuthAccount(
  providerParams: OAuthProviderParams,
) {
  const userP1 = db
    .select()
    .from(oAuthAccounts)
    .where(
      and(
        eq(oAuthAccounts.providerId, providerParams.providerId),
        eq(oAuthAccounts.providerUserId, sql.placeholder("id")),
      ),
    )
    .prepare("p1")

  const [oAuthAccount] = await userP1.execute({ id: providerParams.providerUserId })

  return oAuthAccount
}

export async function getUsers() {
  const result = await db.select().from(users);

  return result
}

export async function getUser(request: Request) {
  const cookies = request.headers.get("cookie");
  const sessionId = parseCookies(cookies || "").get(lucia.sessionCookieName);

  if(!sessionId) {
    return null
  }

  const { user } = await lucia.validateSession(sessionId);
  return user;
}
