import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";

//Config
import { AppConfig, DatabaseConfig } from "./configuration";

//Scheme
import { EnvSchema } from "@App/config/config.scheme";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [AppConfig, DatabaseConfig],
			validate: (v) => EnvSchema.parse(v),
		}),
	],
})
export class AppConfigModule {}
