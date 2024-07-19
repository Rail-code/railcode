import { Module, Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

//Scheme
import * as Schema from "./schemes";

//Provide Name
export const DatabaseORM = "DatabaseORM";

//Export type
export type { NodePgDatabase } from "drizzle-orm/node-postgres";

@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: DatabaseORM,
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				try {
					const DATABASE_URL = configService.get<string>("database.postgres.uri");

					//Create pool
					const pool = new Pool({
						connectionString: DATABASE_URL,
					});

					Logger.log("Connecting Database..", "DatabaseModule");

					//Connect
					await pool.connect();

					Logger.log("Connected Database..", "DatabaseModule");

					return drizzle(pool, { schema: Schema, logger: true });
				} catch (error) {
					throw {
						message: "Error connecting to database",
					};
				}
			},
		},
	],
	exports: [DatabaseORM],
})
export class DatabaseModule {}
