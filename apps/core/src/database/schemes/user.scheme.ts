import { relations } from "drizzle-orm";
import { serial, text, integer, primaryKey, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";

//Schemes
import { OrganizationScheme } from "@App/database/schemes/organization.scheme";
import { RoleScheme } from "@App/database/schemes/role.scheme";

/**
 * Users can belong to many organizations.
 * Each member of the organization will have a role.
 */
export const UserScheme = pgTable("user", {
	id: serial("id").primaryKey(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	email: varchar("email", { length: 255 }).notNull().unique(),
	salt: text("salt"),
	role: integer("role_id").references(() => RoleScheme.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * Join schemes
 */
export const UserOrganizationScheme = pgTable(
	"user_organizations",
	{
		user_id: integer("user_id").references(() => UserScheme.id),
		organization_id: integer("organization_id").references(() => OrganizationScheme.id),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.user_id, table.organization_id] }),
		};
	},
);

/**
 * Relations
 */
export const UserRelations = relations(UserScheme, ({ one, many }) => ({
	role: one(RoleScheme, { fields: [UserScheme.role], references: [RoleScheme.id] }),
	organizations: many(UserOrganizationScheme),
}));
