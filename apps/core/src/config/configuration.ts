import {registerAs} from "@nestjs/config";

/**
 * Common app config
 */
export const AppConfig = registerAs("app", () => ({
    port: process.env.PORT || 4000,
}));
