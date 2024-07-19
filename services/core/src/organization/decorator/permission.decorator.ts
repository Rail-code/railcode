import { SetMetadata } from "@nestjs/common";

//Constants
import {
	Roles,
	Modules,
	Actions,
	type RolesType,
	type ActionsType,
	type ModulesType,
} from "@App/shared/constants/permissions";

export interface AuthPermissionOptType {
	roles: (roles: typeof Roles) => Array<RolesType>;
	module: (module: typeof Modules) => ModulesType;
	action: (action: typeof Actions) => ActionsType;
}

export interface AuthPermissionType {
	roles: Array<RolesType>;
	module: ModulesType;
	action: ActionsType;
}

export const AUTH_PERMISSIONS = "permissions";

export const OrgPermission = (options: AuthPermissionOptType) => {
	const state: AuthPermissionType = {
		roles: options.roles(Roles),
		module: options.module(Modules),
		action: options.action(Actions),
	};

	return SetMetadata(AUTH_PERMISSIONS, state);
};
