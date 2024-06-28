import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { JwtService } from "@nestjs/jwt";

import { ConfigService } from "@nestjs/config";

import { Request } from "express";

//Types
import { JwtUserType } from "@App/auth/types/session";

//Decorator
import { AUTH_PUBLIC } from "@App/auth/decorator/public.decorator";
import { AUTH_PERMISSIONS, type AuthPermissionType } from "@App/auth/decorator/permission.decorator";

//Constants
import { Permissions } from "@App/shared/constants/permissions";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
		private reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		/**
		 * Check if is public
		 */
		const PublicAuth = this.reflector.getAllAndOverride<boolean>(AUTH_PUBLIC, [
			context.getHandler(),
			context.getClass(),
		]);

		/**
		 * Permissions
		 */
		const Permissions = this.reflector.get<AuthPermissionType>(AUTH_PERMISSIONS, context.getHandler());

		//If is public endpoint, return true
		if (PublicAuth) {
			return true;
		}

		const request = context.switchToHttp().getRequest();

		const state: { token: string | null; user: JwtUserType | null } = {
			token: null,
			user: null,
		};

		/**
		 * Extract token from header
		 */
		state.token = this.extractTokenFromHeader(request);

		if (!state.token) {
			throw new UnauthorizedException();
		}

		/**
		 * Verify token
		 */
		try {
			state.user = await this.jwtService.verifyAsync<JwtUserType>(state.token, {
				secret: this.configService.get<string>("app.auth.secret"),
			});
		} catch {
			throw new UnauthorizedException();
		}

		/**
		 * Check permission
		 */
		if (Permissions) {
			this.checkPermission(Permissions, state.user);
		}

		/**
		 * Assign user to request
		 */
		request.session = state.user;

		return true;
	}

	/**
	 * @description Check permission
	 */
	private checkPermission(params: AuthPermissionType, user: JwtUserType) {
		//Get permission
		const permission = Permissions[user.role];

		//Check if a role exits in permissions.
		if (!permission) {
			throw new UnauthorizedException("Role not allowed");
		}

		//Check if action is allowed
		if (!Object.keys(permission).includes(params.action)) {
			throw new UnauthorizedException("Action not allowed");
		}

		//Get modules
		const modules = permission[params.action] as AuthPermissionType["module"][];

		//Check if module is allowed
		if (!modules.includes(params.module)) {
			throw new UnauthorizedException("Module not allowed");
		}
	}

	/**
	 * @description Extract token from header
	 */
	private extractTokenFromHeader(request: Request): string | undefined {
		const authorization = request.headers.authorization;

		if (!authorization) {
			return null;
		}

		const [type, token] = authorization.split(" ");

		if (type !== "Bearer" || !token) {
			return null;
		}

		return token;
	}
}
