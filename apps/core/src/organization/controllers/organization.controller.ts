import { Controller, Req, Get, Post, Body, Patch, Param, Delete, BadRequestException } from "@nestjs/common";

//Services
import { OrganizationService } from "../services/organization.service";

//Decorator
import { AuthPermission } from "@App/auth/decorator/permission.decorator";

//Dto
import { BodyCreateOrgDto } from "../dto/create.dto";
import { BodyUpdateOrgDto } from "../dto/update.dto";

//Types
import { ReqSession } from "@App/shared/express/request.type";

@Controller({
	version: "1",
	path: "organization",
})
export class OrganizationController {
	constructor(private readonly organizationService: OrganizationService) {}

	/**
	 * @description Create an organization
	 */
	@Post()
	create(@Req() req: ReqSession, @Body() data: BodyCreateOrgDto) {
		return this.organizationService.create({
			...data,
			user_id: req.session.user,
		});
	}

	/**
	 * @description Get	all organizations of a user
	 */
	@Get("/user")
	findAllByUser(@Req() req: ReqSession) {
		return this.organizationService.findAllByUser(req.session.user);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.organizationService.findOne(+id);
	}

	@Patch(":organization")
	@AuthPermission({
		roles: (roles) => [roles.admin],
		module: (module) => module.organization,
		action: (action) => action.update,
	})
	async update(@Req() req: ReqSession, @Param("organization") organization: string, @Body() data: BodyUpdateOrgDto) {
		return this.organizationService.update(+organization, {
			...data,
			user_id: req.session.user,
		});
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.organizationService.remove(+id);
	}
}
