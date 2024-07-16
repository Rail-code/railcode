import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { JwtService } from "@nestjs/jwt";

import { ConfigService } from "@nestjs/config";

import { Request } from "express";

//Types
import type { JwtUserType } from "@App/auth/types/session.type";

//Decorator
import { AUTH_PUBLIC } from "@App/auth/decorator/public.decorator";
import { AUTH_PERMISSIONS, type AuthPermissionType } from "@App/auth/decorator/permission.decorator";

//Constants
import { Permissions } from "@App/shared/constants/permissions";

@Injectable()
export class OrgPermissionGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		/**
		 * Permissions
		 */
		const Permissions = this.reflector.get<AuthPermissionType>(AUTH_PERMISSIONS, context.getHandler());

		//If permission not set, skip
		if (!Permissions) {
			return true;
		}

		const request = context.switchToHttp().getRequest();

		return true;
	}

	/**
	 * @description Check permission
	 */
	// private checkPermission(params: AuthPermissionType, user: JwtUserType) {
	// 	//Get permission
	// 	const permission = Permissions[user.role];
	//
	// 	//Check if a role exits in permissions.
	// 	if (!permission) {
	// 		throw new UnauthorizedException("Role not allowed");
	// 	}
	//
	// 	//Check if action is allowed
	// 	if (!Object.keys(permission).includes(params.action)) {
	// 		throw new UnauthorizedException("Action not allowed");
	// 	}
	//
	// 	//Get modules
	// 	const modules = permission[params.action] as AuthPermissionType["module"][];
	//
	// 	//Check if module is allowed
	// 	if (!modules.includes(params.module)) {
	// 		throw new UnauthorizedException("Module not allowed");
	// 	}
	// }
}
