import { serial, integer, varchar, timestamp, pgTable, primaryKey } from "drizzle-orm/pg-core";

//Enums
import { PlatformOsEnum } from "@App/database/shared/enum";

//Schemes
import { AppUpdateScheme, ChannelScheme } from "@App/database/schemes/app.scheme";

/**
 * Scheme: Device
 */
export const DeviceScheme = pgTable("devices", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	platform: PlatformOsEnum("platform").notNull(),
	channel_id: integer("channel_id").references(() => ChannelScheme.id),
});

/**
 * Scheme: Device updates
 */
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
