import { Inject, Injectable } from "@nestjs/common";

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

		return this.database
			.insert(UserScheme)
			.values({ ...data, ...state })
			.returning();
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
