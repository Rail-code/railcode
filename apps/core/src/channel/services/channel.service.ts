import { Injectable } from "@nestjs/common";

//Dto
import { CreateDto } from "../dto/create.dto";
import { UpdateDto } from "../dto/update.dto";

@Injectable()
export class ChannelService {
	create(createChannelDto: CreateDto) {
		return "This action adds a new channel";
	}

	findAll() {
		return "This action returns all channel";
	}

	findOne(id: number) {
		return `This action returns a #${id} channel`;
	}

	update(id: number, updateChannelDto: UpdateDto) {
		return `This action updates a #${id} channel`;
	}

	remove(id: number) {
		return `This action removes a #${id} channel`;
	}
}
