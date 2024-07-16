import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { AppService } from "@App/app/services/app.service";

/**
 * Validate the app belong to the organization in context
 */
@Injectable()
export class AppOrgGuard implements CanActivate {
	constructor(
		private readonly appService: AppService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		//Get organization/app from params
		const { app, org } = request.params;

		if (!app || !org) {
			throw new ForbiddenException("App and organization is missing");
		}

		const hasAccess = await this.appService.existsInOrg(+app, +org);

		if (!hasAccess) {
			throw new ForbiddenException("Organization doesn't have access to app");
		}

		return true;
	}
}
