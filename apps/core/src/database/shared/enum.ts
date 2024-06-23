import { pgEnum } from "drizzle-orm/pg-core";

//Constants
import { RoleEnum } from "@App/user/constants/roles";

/**
 * System os
 */
export const PlatformOsEnum = pgEnum("platform_os", ["android", "ios"]);

/**
 * User Roles
 */
export const RolesEnumPg = pgEnum("role", Object.values(RoleEnum) as [string, ...string[]]);
