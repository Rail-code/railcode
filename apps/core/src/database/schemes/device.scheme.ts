import { serial, integer, varchar, timestamp, pgTable, primaryKey } from "drizzle-orm/pg-core";

//Schemes
import { platformOsEnum } from "@App/database/schemes/app.scheme";
import { AppChannelScheme } from "@App/database/schemes/channel.scheme";
import { AppUpdateScheme } from "@App/database/schemes/update.scheme";

/**
 * Scheme
 */
export const DeviceScheme = pgTable("devices", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	platform_os: platformOsEnum("platform_os").notNull(),
	channel_id: integer("channel_id").references(() => AppChannelScheme.id),
});

export const DeviceUpdateScheme = pgTable(
	"device_updates",
	{
		device_id: integer("device_id").references(() => DeviceScheme.id),
		update_id: integer("update_id").references(() => AppUpdateScheme.id),
		received_at: timestamp("received_at").defaultNow(),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.device_id, table.update_id] }),
	}),
);
