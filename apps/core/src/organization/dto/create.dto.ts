import { IsInt, IsNotEmpty, IsString } from "class-validator";

import { OmitType } from "@nestjs/swagger";

export class CreateOrgDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsInt()
	@IsNotEmpty()
	user_id: number;
}

export class BodyCreateOrgDto extends OmitType(CreateOrgDto, ["user_id"]) {}
