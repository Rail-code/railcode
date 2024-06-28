import { relations, InferSelectModel } from "drizzle-orm";
import { serial, text, integer, primaryKey, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";

//Enum
import { RolesEnumPg } from "@App/database/shared/enum";

//Schemes
import { OrganizationScheme } from "@App/database/schemes/organization.scheme";

/**
 * Scheme: Users.
 * Users can belong to many organizations.
 * Each member of the organization will have a role.
 */
export const UserScheme = pgTable("user", {
	id: serial("id").primaryKey(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	email: varchar("email", { length: 255 }).notNull().unique(),
	hash: text("hash"),
	role: RolesEnumPg("role").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Type for UserScheme
export type UserModel = InferSelectModel<typeof UserScheme>;

/**
 * Scheme: User organizations
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
 * Relations: Users
 */
export const UserRelations = relations(UserScheme, ({ one, many }) => ({
	organizations: many(UserOrganizationScheme),
}));
