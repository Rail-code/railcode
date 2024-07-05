import { Injectable, Inject, BadRequestException } from "@nestjs/common";

import * as _ from "lodash";

import { eq, and } from "drizzle-orm";

//Modules
import { DatabaseORM, type NodePgDatabase } from "@App/database/database.module";

//Constants
import { Roles } from "@App/shared/constants/permissions";

//Scheme
import { OrganizationScheme, OrganizationUserScheme, UserScheme } from "@App/database/schemes";

//Dto
import { CreateOrgDto } from "../dto/create.dto";
import { UpdateOrgDto } from "../dto/update.dto";

@Injectable()
export class OrganizationService {
	constructor(
		@Inject(DatabaseORM)
		readonly database: NodePgDatabase<{
			OrganizationScheme: typeof OrganizationScheme;
			OrganizationUserScheme: typeof OrganizationUserScheme;
		}>,
	) {}

	/**
	 * @description Create organization
	 */
	async create(data: CreateOrgDto) {
		return this.database.transaction(async (tx) => {
			/**
			 * Create organization
			 */
			const [organization] = await tx
				.insert(OrganizationScheme)
				.values({
					name: data.name,
				})
				.returning();

			/**
			 * Assign user to organization
			 */
			await tx
				.insert(OrganizationUserScheme)
				.values({
					role: Roles.admin,
					user_id: data.user_id,
					organization_id: organization.id,
				})
				.returning();

			return organization;
		});
	}

	/**
	 * @description Get all organizations of a user
	 */
	async findAllByUser(user_id: number) {
		const result = await this.database
			.select()
			.from(OrganizationScheme)
			.innerJoin(OrganizationUserScheme, eq(OrganizationUserScheme.organization_id, OrganizationScheme.id))
			.where(eq(OrganizationUserScheme.user_id, user_id));

		//Format response
		return _.map(result, (entity) => ({ ...entity.organizations }));
	}

	/**
	 * @description Find by organization id
	 */
	async findOne(id: number) {
		return this.database.query.OrganizationScheme.findFirst({
			where: eq(OrganizationScheme.id, id),
		});
	}

	/**
	 * @description Check if user belongs to organization
	 */
	async userBelongsTo(user: number | string, organization: number | string) {
		const result = await this.database.query.OrganizationUserScheme.findFirst({
			where: and(
				eq(OrganizationUserScheme.organization_id, Number(organization)),
				eq(OrganizationUserScheme.user_id, Number(user)),
			),
		});

		if (!result) {
			throw new BadRequestException("User does not belong to organization");
		}

		return result;
	}

	/**
	 * @description Update organization
	 */
	async update(organization: number, data: UpdateOrgDto) {
		/**
		 * Check if belongs to the user
		 */
		await this.userBelongsTo(data.user_id, organization);

		const [result] = await this.database
			.update(OrganizationScheme)
			.set(data)
			.where(eq(OrganizationScheme.id, organization))
			.returning();

		return result;
	}

	remove(id: number) {
		return `This action removes a #${id} organization`;
	}
}
