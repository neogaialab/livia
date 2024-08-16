import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

// #region Users

export const users = pgTable("User", {
    id: serial("id").primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    lastName: varchar('name', { length: 256 }).notNull(),
    picture: varchar("picture"),
    email: varchar("email"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// #endregion
