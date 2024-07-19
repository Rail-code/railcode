import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { JwtService } from "@nestjs/jwt";

import { ConfigService } from "@nestjs/config";

import { Request } from "express";

//Types
import type { JwtUserType } from "@App/auth/types/session.type";

//Decorator
import { AUTH_PUBLIC } from "@App/auth/decorator/public.decorator";

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

		//If is public endpoint, return true
		if (PublicAuth) {
			return true;
		}

		const request = context.switchToHttp().getRequest();

		const state: { token: string | null; jwt: JwtUserType | null } = {
			token: null,
			jwt: null,
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
			state.jwt = await this.jwtService.verifyAsync<JwtUserType>(state.token, {
				secret: this.configService.get<string>("app.auth.secret"),
			});
		} catch {
			throw new UnauthorizedException();
		}

		/**
		 * Assign user to request
		 */
		request.session = {
			user: state.jwt.sub,
		};

		return true;
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
