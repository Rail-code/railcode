import { UseGuards, Controller, Req, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

//Services
import { AppService } from "../services/app.service";

//Dto
import { BodyCreateAppDto } from "../dto/create.dto";
import { BodyUpdateAppDto } from "../dto/update.dto";

//Guards
import { OrgUserGuard } from "@App/organization/guard/org-user.guard";

//Types
import { ReqSession } from "@App/shared/express/request.type";

@Controller({
	version: "1",
	path: "organization/:org/app",
})
@UseGuards(OrgUserGuard)
export class AppController {
	constructor(private readonly appService: AppService) {}

	/**
	 * @description Create an app for x organization
	 */
	@Post()
	create(@Req() req: ReqSession, @Param("org") org: string, @Body() data: BodyCreateAppDto) {
		return this.appService.create({
			...data,
			user_id: req.session.user,
			organization_id: +org,
		});
	}

	/**
	 * @description All apps that belong to an organization
	 */
	@Get()
	findAll(@Req() req: ReqSession, @Param("org") org: string) {
		return this.appService.findAllInOrg(+org);
	}

	/**
	 * @description Get an organization app
	 */
	@Get(":id")
	findOne(@Req() req: ReqSession, @Param("id") id: string, @Param("org") org: string) {
		return this.appService.findOneInOrg(+id, +org);
	}

	/**
	 * @description Update an app
	 */
	@Patch(":id")
	update(@Req() req: ReqSession, @Param("id") id: string, @Param("org") org: string, @Body() data: BodyUpdateAppDto) {
		return this.appService.update(+id, {
			...data,
			user_id: req.session.user,
			organization_id: +org,
		});
	}
}
