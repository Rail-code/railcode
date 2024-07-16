import { Inject, Injectable, BadRequestException } from "@nestjs/common";

import * as _ from "lodash";

import { eq } from "drizzle-orm";

//Database
import { DatabaseORM, type NodePgDatabase } from "@App/database/database.module";
import { UserScheme } from "@App/database/schemes";

//Helpers
import { SaltHelper } from "@App/auth/helper/salt";

//Dto
import { CreateUserDto } from "../dto/create.dto";
import { UpdateDto } from "../dto/update.dto";

@Injectable()
export class UserService {
	constructor(@Inject(DatabaseORM) readonly database: NodePgDatabase<{ UserScheme: typeof UserScheme }>) {}

	/**
	 * Create a user
	 */
	async create(data: CreateUserDto) {
		const state = {
			hash: "",
		};

		//Create salt
		state.hash = await SaltHelper.create(data.password);

		/**
		 * Check if user exits
		 */
		if (await this.findOneByEmail(data.email)) {
			throw new BadRequestException("An account already exist");
		}

		const entity = await this.database
			.insert(UserScheme)
			.values({ ...data, ...state })
			.returning();

		return _.first(entity);
	}

	async findAll() {
		return "This action returns all user";
	}

	/**
	 * @description Find by user id
	 */
	async findOne(id: number) {
		return this.database.query.UserScheme.findFirst({
			where: eq(UserScheme.id, id),
		});
	}

	/**
	 * @description Find by user email
	 */
	async findOneByEmail(email: string) {
		return this.database.query.UserScheme.findFirst({
			where: eq(UserScheme.email, email),
		});
	}

	update(id: number, updateUserDto: UpdateDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
