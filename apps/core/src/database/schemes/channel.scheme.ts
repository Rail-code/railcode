import { serial, integer, varchar, pgTable } from "drizzle-orm/pg-core";

//Schemes
import { AppScheme } from "@App/database/schemes/app.scheme";

/**
 * Scheme
 */
export const AppChannelScheme = pgTable("app_channels", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	app_id: integer("app_id").references(() => AppScheme.id),
});
