import { Injectable } from "@nestjs/common";

//Dto
import { CreateDto } from "../dto/create.dto";
import { UpdateDto } from "../dto/update.dto";

@Injectable()
export class UpdateService {
	create(createVersionDto: CreateDto) {
		return "This action adds a new version";
	}

	findAll() {
		return "This action returns all version";
	}

	findOne(id: number) {
		return `This action returns a #${id} version`;
	}

	update(id: number, updateVersionDto: UpdateDto) {
		return `This action updates a #${id} version`;
	}

	remove(id: number) {
		return `This action removes a #${id} version`;
	}
}
