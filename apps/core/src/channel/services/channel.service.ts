import { Injectable, Inject, BadRequestException } from "@nestjs/common";

import { eq, and } from "drizzle-orm";

import * as _ from "lodash";

//Modules
import { DatabaseORM, type NodePgDatabase } from "@App/database/database.module";

//Scheme
import { ChannelScheme, AppScheme, OrganizationScheme } from "@App/database/schemes";

//Services
import { AppService } from "@App/app/services/app.service";

//Dto
import { CreateAppChannelDto } from "../dto/create.dto";
import { UpdateAppChannelDto } from "../dto/update.dto";

@Injectable()
export class ChannelService {
	constructor(
		@Inject(DatabaseORM)
		readonly database: NodePgDatabase<{
			ChannelScheme: typeof ChannelScheme;
		}>,
		private appService: AppService,
	) {}

	/**
	 * @description Create a channel for app
	 */
	async create(data: CreateAppChannelDto) {
		try {
			/**
			 * Create channel
			 */
			const [result] = await this.database.insert(ChannelScheme).values(data).returning();

			return result;
		} catch (error) {
			throw new BadRequestException({
				message: "App channel could not be created",
				error: error.message,
			});
		}
	}

	/**
	 * @description All channels of an app
	 */
	async findAllInApp(appId: number) {
		const result = await this.database
			.select()
			.from(ChannelScheme)
			.innerJoin(AppScheme, eq(AppScheme.id, ChannelScheme.app_id))
			.innerJoin(OrganizationScheme, eq(OrganizationScheme.id, AppScheme.organization_id))
			.where(eq(ChannelScheme.app_id, appId));

		return _.map(result, (entity) => ({ ...entity.app_channels }));
	}

	/**
	 * @description Get a channel in app
	 */
	async findOneInApp(appId: number, channelId: number) {
		const [result] = await this.database
			.select()
			.from(ChannelScheme)
			//Channel belong to app
			.innerJoin(AppScheme, eq(AppScheme.id, ChannelScheme.app_id))
			//App belong to org
			.innerJoin(OrganizationScheme, eq(OrganizationScheme.id, AppScheme.organization_id))
			.where(and(eq(ChannelScheme.app_id, appId), eq(ChannelScheme.id, channelId)));

		if (!result?.app_channels) {
			throw new BadRequestException("App channel could not be found");
		}

		return result.app_channels;
	}

	findOne(id: number) {
		return `This action returns a #${id} channel`;
	}

	update(id: number, updateChannelDto: UpdateAppChannelDto) {
		return `This action updates a #${id} channel`;
	}

	remove(id: number) {
		return `This action removes a #${id} channel`;
	}
}
