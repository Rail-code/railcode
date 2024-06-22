import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

//Services
import { AppService } from "../services/app.service";

//Dto
import { CreateDto } from "../dto/create.dto";
import { UpdateDto } from "../dto/update.dto";

@Controller("app")
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post()
	create(@Body() createAppDto: CreateDto) {
		return this.appService.create(createAppDto);
	}

	@Get()
	findAll() {
		return this.appService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.appService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateAppDto: UpdateDto) {
		return this.appService.update(+id, updateAppDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.appService.remove(+id);
	}
}
