import { pgEnum } from "drizzle-orm/pg-core";

//Constants
import { Roles } from "@App/shared/constants/permissions";

/**
 * System os
 */
export const PlatformOsEnum = pgEnum("platform_os", ["android", "ios"]);

/**
 * User Roles
 */
export const RolesEnumPg = pgEnum("role", [Roles.admin, Roles.member, Roles.developer]);
