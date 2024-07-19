import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { OrganizationService } from "@App/organization/services/organization.service";

/**
 * Validate that user belongs to the organization that is requesting.
 */
@Injectable()
export class OrgUserGuard implements CanActivate {
	constructor(
		private readonly orgService: OrganizationService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		//Get organization from params
		const { org } = request.params;

		//Get user from request
		const user = request.session.user;

		if (!user || !org) {
			throw new ForbiddenException("Authentication required");
		}

		const hasAccess = await this.orgService.userBelongsTo(user, +org);

		if (!hasAccess) {
			throw new ForbiddenException("You do not have access to this organization");
		}

		return true;
	}
}
