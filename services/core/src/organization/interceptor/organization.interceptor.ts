import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from "@nestjs/common";

import { OrganizationService } from "../services/organization.service";

@Injectable()
export class OrganizationInterceptor implements NestInterceptor {
	constructor(private readonly organizationService: OrganizationService) {} // Replace with your actual service

	async intercept(context: ExecutionContext, next: CallHandler) {
		const req = context.switchToHttp().getRequest();

		const state: { id: number; data: unknown } = {
			id: req.params.organization,
			data: null,
		};

		if (!state.id) {
			throw new BadRequestException("Organization is required");
		}

		/**
		 * Get organization
		 */
		state.data = await this.organizationService.findOne(state.id); // Adjust method as per your service

		if (!state.data) {
			throw new BadRequestException("Organization not found");
		}

		// Attach organization to request
		req.organization = state.data;

		return next.handle();
	}
}
