import { serial, integer, varchar, pgTable, unique } from "drizzle-orm/pg-core";

//Schemes
import { AppScheme } from "@App/database/schemes/app.scheme";
import { AppChannelScheme } from "@App/database/schemes/channel.scheme";

/**
 * Scheme
 */
export const AppUpdateScheme = pgTable(
	"app_updates",
	{
		id: serial("id").primaryKey(),
		version: varchar("version", { length: 50 }).notNull(),
		size: integer("size").notNull(), //Mb size
		app_id: integer("app_id").references(() => AppScheme.id),
		channel_id: integer("channel_id").references(() => AppChannelScheme.id),
	},
	(table) => ({
		//Updates can only be unique by app and version
		uniqueAppVersion: unique("unique_app_version").on(table.app_id, table.version),
	}),
);
