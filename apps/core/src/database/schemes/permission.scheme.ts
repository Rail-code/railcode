import { serial, varchar, text, pgTable, unique } from "drizzle-orm/pg-core";

//Enum
import { RolesEnumPg } from "@App/database/shared/enum";

/**
 * Scheme: Permission
 */
export const PermissionScheme = pgTable(
	"permissions",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 50 }).notNull(),
		value: varchar("value", { length: 50 }).notNull(),
		role: RolesEnumPg("role").notNull(),
		description: text("description"),
	},
	(table) => {
		return {
			uniqueRoleValue: unique("unique_role_value").on(table.role, table.value),
		};
	},
);
