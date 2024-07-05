import { serial, integer, varchar, unique, pgTable, timestamp } from "drizzle-orm/pg-core";

//Enum
import { PlatformOsEnum } from "@App/database/shared/enum";

//Schemes
import { OrganizationScheme } from "@App/database/schemes/organization.scheme";

/**
 * Scheme: Apps
 */
export const AppScheme = pgTable(
	"apps",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 100 }).notNull(),
		platform: PlatformOsEnum("platform").notNull(),
		identifier: varchar("identifier", { length: 100 }).notNull(),
		organization_id: integer("organization_id").references(() => OrganizationScheme.id),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		//Encrypted "app-identifier" sends it by sdk client
		verification: varchar("verification", { length: 100 }),
	},
	(table) => ({
		//Apps can only be unique by app and version
		uniqueOsIdentifier: unique("unique_os_identifier").on(table.identifier, table.platform),
	}),
);

/**
 * Scheme: Channels
 */
export const ChannelScheme = pgTable("app_channels", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	app_id: integer("app_id").references(() => AppScheme.id),
	created_at: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Scheme: App updates
 */
export const AppUpdateScheme = pgTable(
	"app_updates",
	{
		id: serial("id").primaryKey(),
		version: varchar("version", { length: 50 }).notNull(),
		size: integer("size").notNull(), //Mb size
		app_id: integer("app_id").references(() => AppScheme.id),
		channel_id: integer("channel_id").references(() => ChannelScheme.id),
		created_at: timestamp("created_at").notNull().defaultNow(),
	},
	(table) => ({
		//Updates can only be unique by app and version
		uniqueAppVersion: unique("unique_app_version").on(table.app_id, table.version),
	}),
);
