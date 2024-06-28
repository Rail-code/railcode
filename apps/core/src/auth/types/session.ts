//Types
import type { RolesType } from "@App/shared/constants/permissions";

export type JwtUserType = {
	sub: number;
	role: RolesType;
};
