import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

//Services
import { ChannelService } from "../services/channel.service";

//Dto
import { CreateDto } from "../dto/create.dto";
import { UpdateDto } from "../dto/update.dto";

@Controller("channel")
export class ChannelController {
	constructor(private readonly channelService: ChannelService) {}

	@Post()
	create(@Body() createChannelDto: CreateDto) {
		return this.channelService.create(createChannelDto);
	}

	@Get()
	findAll() {
		return this.channelService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.channelService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateChannelDto: UpdateDto) {
		return this.channelService.update(+id, updateChannelDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.channelService.remove(+id);
	}
}
