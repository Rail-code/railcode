import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

//Services
import { OrganizationService } from "../services/organization.service";

//Dto
import { CreateDto } from "../dto/create.dto";
import { UpdateDto } from "../dto/update.dto";

@Controller("organization")
export class OrganizationController {
	constructor(private readonly organizationService: OrganizationService) {}

	@Post()
	create(@Body() createOrganizationDto: CreateDto) {
		return this.organizationService.create(createOrganizationDto);
	}

	@Get()
	findAll() {
		return this.organizationService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.organizationService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateOrganizationDto: UpdateDto) {
		return this.organizationService.update(+id, updateOrganizationDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.organizationService.remove(+id);
	}
}
