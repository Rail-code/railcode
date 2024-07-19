import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

//Services
import { UpdateService } from "../services/update.service";

//Dto
import { CreateDto } from "../dto/create.dto";
import { UpdateDto } from "../dto/update.dto";

@Controller("updates")
export class UpdateController {
	constructor(private readonly versionService: UpdateService) {}

	@Post()
	create(@Body() createVersionDto: CreateDto) {
		return this.versionService.create(createVersionDto);
	}

	@Get()
	findAll() {
		return this.versionService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.versionService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateVersionDto: UpdateDto) {
		return this.versionService.update(+id, updateVersionDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.versionService.remove(+id);
	}
}
