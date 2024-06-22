import { serial, varchar, text, pgTable } from "drizzle-orm/pg-core";

export const PermissionScheme = pgTable("permissions", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull(),
	value: varchar("value", { length: 50 }).notNull().unique(),
	description: text("description"),
});
