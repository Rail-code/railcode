import { z } from "zod";

export const EnvSchema = z.object({
	PORT: z.number().optional().default(3000),
	APP_AUTH_SALT: z.number().optional().default(15),
	APP_AUTH_SECRET: z.string(),
	DATABASE_POSTGRES_URI: z.string(),
});

type EnvType = z.infer<typeof EnvSchema>;

export type EnvSchemeType = {
	app: {
		port: EnvType["PORT"];
		auth: {
			salt: EnvType["APP_AUTH_SALT"];
			secret: EnvType["APP_AUTH_SECRET"];
		};
	};
	database: {
		postgres: {
			uri: EnvType["DATABASE_POSTGRES_URI"];
		};
	};
};
