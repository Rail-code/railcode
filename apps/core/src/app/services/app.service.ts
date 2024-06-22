import { Injectable } from "@nestjs/common";

//Dto
import { CreateDto } from "../dto/create.dto";
import { UpdateDto } from "../dto/update.dto";

@Injectable()
export class AppService {
	create(createAppDto: CreateDto) {
		return "This action adds a new app";
	}

	findAll() {
		return "This action returns all app";
	}

	findOne(id: number) {
		return `This action returns a #${id} app`;
	}

	update(id: number, updateAppDto: UpdateDto) {
		return `This action updates a #${id} app`;
	}

	remove(id: number) {
		return `This action removes a #${id} app`;
	}
}
