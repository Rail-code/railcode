import { serial, text, integer, primaryKey, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";

//Scheme
import { UserScheme } from "@App/database/schemes/user.scheme";

//Enum
import { RolesEnumPg } from "@App/database/shared/enum";

/**
 * Scheme: Organizations
 */
export const OrganizationScheme = pgTable("organizations", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	//Secret key to use to sign app keys and more. (auto generate)
	secret: varchar("secret", { length: 100 }).notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Scheme: Organizations user
 */
export const OrganizationUserScheme = pgTable(
	"organization_users",
	{
		role: RolesEnumPg("role").notNull(),
		user_id: integer("user_id").references(() => UserScheme.id),
		organization_id: integer("organization_id").references(() => OrganizationScheme.id),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.user_id, table.organization_id] }),
		};
	},
);
