import { serial, varchar, pgTable } from "drizzle-orm/pg-core";

export const OrganizationScheme = pgTable("organizations", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
});
