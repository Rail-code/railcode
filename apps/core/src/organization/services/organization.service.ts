import { Injectable } from "@nestjs/common";

//Dto
import { CreateDto } from "../dto/create.dto";
import { UpdateDto } from "../dto/update.dto";

@Injectable()
export class OrganizationService {
	create(createOrganizationDto: CreateDto) {
		return "This action adds a new organization";
	}

	findAll() {
		return "This action returns all organization";
	}

	findOne(id: number) {
		return `This action returns a #${id} organization`;
	}

	update(id: number, updateOrganizationDto: UpdateDto) {
		return `This action updates a #${id} organization`;
	}

	remove(id: number) {
		return `This action removes a #${id} organization`;
	}
}
