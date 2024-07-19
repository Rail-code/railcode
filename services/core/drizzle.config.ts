import { defineConfig } from "drizzle-kit";

export default defineConfig({
	migrations: {
		table: "migrations",
		schema: "migrations",
	},
	dialect: "postgresql",
	schema: "./src/database/schemes/index.ts",
	out: "./src/database/migrations",
	dbCredentials: {
		url: process.env.DATABASE_POSTGRES_URI || "postgres://root:root@localhost:5432/railcode",
	},
});
