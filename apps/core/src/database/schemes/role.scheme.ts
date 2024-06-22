import { relations } from "drizzle-orm";
import { serial, integer, varchar, text, primaryKey, pgTable } from "drizzle-orm/pg-core";

//Schemes
import { PermissionScheme } from "@App/database/schemes/permission.scheme";

/**
 * Scheme
 */
export const RoleScheme = pgTable("roles", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull().unique(),
	description: text("description"),
});

/**
 * Join schemes
 */
export const RolePermissionScheme = pgTable(
	"role_permissions",
	{
		role_id: integer("role_id").references(() => RoleScheme.id),
		permission_id: integer("permission_id").references(() => PermissionScheme.id),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.role_id, table.permission_id] }),
		};
	},
);

/**
 * Relations
 */
const RolesRelations = relations(RoleScheme, ({ many }) => ({
	permissions: many(RolePermissionScheme),
}));
