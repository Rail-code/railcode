/**
 * @description Platform doesn't require a complex role system, for now we keep as const
 */
export const RoleEnum = {
	admin: "admin",
	member: "member",
	developer: "developer",
} as const;

//Type roles
export type RoleEnumType = keyof typeof RoleEnum;
