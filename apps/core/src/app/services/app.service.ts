import { Injectable, Inject, BadRequestException } from "@nestjs/common";

import { eq, and } from "drizzle-orm";

//Modules
import { DatabaseORM, type NodePgDatabase } from "@App/database/database.module";

//Scheme
import { AppScheme } from "@App/database/schemes";

//Dto
import { CreateAppDto } from "../dto/create.dto";
import { UpdateAppDto } from "../dto/update.dto";

//Types
import { SystemMobileOsType } from "@App/shared/constants/platform";

@Injectable()
export class AppService {
	constructor(
		@Inject(DatabaseORM)
		readonly database: NodePgDatabase<{
			AppScheme: typeof AppScheme;
		}>,
	) {}

	/**
	 * @description Create an app
	 */
	async create(data: CreateAppDto) {
		/**
		 * Check if already exists app
		 */
		await this.exists(data.platform, data.identifier);

		try {
			/**
			 * Create app
			 */
			const [result] = await this.database.insert(AppScheme).values(data).returning();

			return result;
		} catch (error) {
			throw new BadRequestException({
				message: "App could not be created",
				error: error.message,
			});
		}
	}

	/**
	 * @description All apps of an organization
	 */
	async findAllInOrg(organization: number) {
		return this.database.query.AppScheme.findMany({
			where: eq(AppScheme.organization_id, organization),
		});
	}

	/**
	 * @description Get an app organization
	 */
	async findOneInOrg(appId: number, organization: number) {
		return this.database.query.AppScheme.findFirst({
			where: and(eq(AppScheme.id, appId), eq(AppScheme.organization_id, organization)),
		});
	}

	/**
	 * @description Get an app
	 */
	async findOne(id: number) {
		return this.database.query.AppScheme.findFirst({
			where: eq(AppScheme.id, id),
		});
	}

	/**
	 * @description Check if app exits and belongs to x organization
	 */
	async existsInOrg(appId: number, organization: number) {
		const result = await this.database.query.AppScheme.findFirst({
			where: and(eq(AppScheme.id, appId), eq(AppScheme.organization_id, organization)),
			columns: {
				id: true,
				organization_id: true,
			},
		});

		if (!result) {
			throw new BadRequestException("App doesn't exits");
		}

		return result;
	}

	/**
	 * @description Check if app exists based on identifier and os
	 */
	async exists(platform: SystemMobileOsType, identifier: string) {
		const result = await this.database.query.AppScheme.findFirst({
			where: and(eq(AppScheme.platform, platform), eq(AppScheme.identifier, identifier)),
		});

		if (result) {
			throw new BadRequestException("App already exists with same identifier");
		}

		return result;
	}

	/**
	 * @description Update app
	 */
	async update(appId: number, data: UpdateAppDto) {
		/**
		 * Check if app exits
		 */
		const app = await this.existsInOrg(appId, data.organization_id);

		/**
		 * Update app
		 */
		const [result] = await this.database
			.update(AppScheme)
			.set(data)
			.where(and(eq(AppScheme.id, app.id), eq(AppScheme.organization_id, data.organization_id)))
			.returning();

		return result;
	}

	async remove(id: number) {
		return `This action removes a #${id} app`;
	}
}
