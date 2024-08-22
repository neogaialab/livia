import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Google } from "arctic";
import { db } from "db";
import { sessions, User, users } from "db/schema";
import { Lucia } from "lucia";
import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from "../public_keys";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<User, "id">;
	}
}

export const google = new Google(GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET!, GOOGLE_REDIRECT_URI);
