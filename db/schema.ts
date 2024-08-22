import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

// #region Users

export const users = pgTable("User", {
    id: text("id").primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    lastName: varchar('last_name', { length: 256 }).notNull(),
    picture: varchar("picture"),
    email: varchar("email"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const userInsertSchema = createInsertSchema(users).omit({
    id: true,
})

export type UserInsert = z.infer<typeof userInsertSchema>

export const sessions = pgTable("Session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at", { mode: 'date', withTimezone: true }).notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
})

export const oAuthAccounts = pgTable("OAuthAccount", {
    providerId: text("provider_id").notNull(),
    providerUserId: text("provider_user_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
})

// #endregion
