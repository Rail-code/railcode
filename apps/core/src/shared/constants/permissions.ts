/**
 * @description Platform doesn't require a complex role system, for now we keep as const
 */
export const Roles = {
	admin: "admin",
	member: "member",
	developer: "developer",
} as const;

//Type roles
export type RolesType = keyof typeof Roles;

/**
 * @description Actions
 */
export const Actions = {
	read: "read",
	update: "update",
	delete: "delete",
	create: "create",
} as const;

//Type Actions
export type ActionsType = keyof typeof Actions;

/**
 * @description Modules
 */
export const Modules = {
	app: "app",
	channel: "channel",
	organization: "organization",
	device: "device",
	update: "update",
	account: "account",
} as const;

//Type Modules
export type ModulesType = keyof typeof Modules;

/**
 * @description Permissions
 */
export const Permissions = {
	[Roles.admin]: {
		[Actions.read]: Object.values(Modules),
		[Actions.update]: Object.values(Modules),
		[Actions.delete]: Object.values(Modules),
		[Actions.create]: Object.values(Modules),
	},
	[Roles.member]: {
		[Actions.read]: Object.values(Modules),
		[Actions.update]: Object.values(Modules),
		[Actions.delete]: [Modules.channel, Modules.update],
		[Actions.create]: [Modules.app, Modules.channel, Modules.update],
	},
	[Roles.developer]: {
		[Actions.read]: Object.values(Modules),
		[Actions.update]: [Modules.channel, Modules.update, Modules.account],
		[Actions.delete]: [],
		[Actions.create]: [Modules.update],
	},
};
