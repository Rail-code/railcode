import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

//Services
import { DeviceService } from "../services/device.service";

//Dto
import { CreateDto } from "../dto/create.dto";
import { UpdateDto } from "../dto/update.dto";

@Controller("devices")
export class DeviceController {
	constructor(private readonly deviceService: DeviceService) {}

	@Post()
	create(@Body() createVersionDto: CreateDto) {
		return this.deviceService.create(createVersionDto);
	}

	@Get()
	findAll() {
		return this.deviceService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.deviceService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateVersionDto: UpdateDto) {
		return this.deviceService.update(+id, updateVersionDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.deviceService.remove(+id);
	}
}
