import { serial, integer, varchar, unique, pgTable, pgEnum } from "drizzle-orm/pg-core";

//Schemes
import { OrganizationScheme } from "@App/database/schemes/organization.scheme";

export const platformOsEnum = pgEnum("platform_os", ["android", "ios"]);

/**
 * Scheme
 */
export const AppScheme = pgTable(
	"apps",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 100 }).notNull(),
		platform_os: platformOsEnum("platform_os").notNull(),
		identifier: varchar("identifier", { length: 100 }).notNull(),
		organization_id: integer("organization_id").references(() => OrganizationScheme.id),
	},
	(table) => ({
		//Apps can only be unique by app and version
		uniqueOsIdentifier: unique("unique_os_identifier").on(table.identifier, table.platform_os),
	}),
);
