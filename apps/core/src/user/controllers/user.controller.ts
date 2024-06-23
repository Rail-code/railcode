import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";

//Services
import { UserService } from "../services/user.service";

//Dto
import { CreateUserDto } from "../dto/create.dto";
import { UpdateDto } from "../dto/update.dto";

@Controller({
	version: "1",
	path: "user",
})
@ApiTags("User")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		// return this.userService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateDto) {
		return this.userService.update(+id, updateUserDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.userService.remove(+id);
	}
}
