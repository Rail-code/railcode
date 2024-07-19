import { Controller, UseGuards, Req, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

//Services
import { ChannelService } from "../services/channel.service";

//Guards
import { OrgUserGuard } from "@App/organization/guard/org-user.guard";

//Dto
import { BodyCreateAppChannelDto } from "../dto/create.dto";
import { BodyUpdateAppChannelDto } from "../dto/update.dto";

//Types
import { ReqSession } from "@App/shared/express/request.type";

@Controller({
	version: "1",
	path: "organization/:org/app/:app/channel",
})
@UseGuards(OrgUserGuard)
// @UseGuards(AppOrgGuard)
export class ChannelController {
	constructor(private readonly channelService: ChannelService) {}

	/**
	 * @description Create a channel for app
	 */
	@Post()
	create(
		@Req() req: ReqSession,
		@Param("org") org: string,
		@Param("app") app: string,
		@Body() data: BodyCreateAppChannelDto,
	) {
		return this.channelService.create({
			...data,
			app_id: +app,
			organization_id: +org,
		});
	}

	/**
	 * @description All channels of an app
	 */
	@Get()
	findAll(@Req() req: ReqSession, @Param("org") org: string, @Param("app") app: string) {
		return this.channelService.findAllInApp({
			orgId: +org,
			appId: +app,
		});
	}

	/**
	 * @description Get a channel
	 */
	@Get(":id")
	findOne(@Param("id") id: string, @Param("org") org: string, @Param("app") app: string) {
		return this.channelService.findOneInApp({
			appId: +app,
			orgId: +org,
			channelId: +id,
		});
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() data: BodyUpdateAppChannelDto) {
		return this.channelService.update(+id, data);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.channelService.remove(+id);
	}
}
