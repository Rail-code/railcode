import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

/**
 * Create scheme env
 */
const scheme = z.object({
	PORT: z.number().default(3000),
	VITE_API_CORE: z
		.string({
			required_error: "⚠️ You forgot to add a backend URL",
		})
		.trim()
		.min(1),
	NODE_ENV: z.enum(["development", "production"]).default("development"),
});

/**
 * Parse env
 */
const parsedEnv = scheme.safeParse({
	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	VITE_API_CORE: process.env.VITE_API_CORE,
});

if (!parsedEnv.success) {
	const invalidEnvs = parsedEnv.error.issues.map((item) => item.message);

	throw new Error(`Invalid/Missing envs:\n ${invalidEnvs.join("\n")}`);
}

export const ENV = parsedEnv.data;
