import { relations, InferSelectModel } from "drizzle-orm";
import { serial, text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";

//Schemes
import { OrganizationUserScheme } from "@App/database/schemes/organization.scheme";

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
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Type for UserScheme
export type UserModel = InferSelectModel<typeof UserScheme>;

/**
 * Relations: Users
 */
export const UserRelations = relations(UserScheme, ({ one, many }) => ({
	organizations: many(OrganizationUserScheme),
}));
