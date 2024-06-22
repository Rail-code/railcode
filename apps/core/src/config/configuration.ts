import { registerAs } from "@nestjs/config";

import { EnvSchemeType } from "@App/config/config.scheme";

/**
 * Common app config
 */
export const AppConfig = registerAs<EnvSchemeType["app"]>("app", () => ({
	port: Number.parseInt(process.env.PORT || "4000"),
	auth: {
		salt: Number.parseInt(process.env.APP_AUTH_SALT || "15"),
	},
}));

/**
 * Database config
 */
export const DatabaseConfig = registerAs<EnvSchemeType["database"]>("database", () => ({
	postgres: {
		uri: process.env.DATABASE_POSTGRES_URI || "postgres://root:root@localhost:5432/railcode",
	},
}));
