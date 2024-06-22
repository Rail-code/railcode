import { Injectable, Inject } from "@nestjs/common";

//Database
import { DatabaseORM, type DatabaseORMType } from "@App/database/database.module";

//Dto
import { CreateUserDto } from "../dto/create.dto";
import { UpdateDto } from "../dto/update.dto";

@Injectable()
export class UserService {
	constructor(@Inject(DatabaseORM) readonly database: DatabaseORMType) {}

	create(createUserDto: CreateUserDto) {
		return "This action adds a new user";
	}

	async findAll() {
		return "This action returns all user";
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
