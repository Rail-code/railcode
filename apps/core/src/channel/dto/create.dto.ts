import { IsInt, IsNotEmpty, IsString } from "class-validator";

import { OmitType } from "@nestjs/swagger";

export class CreateAppChannelDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsInt()
	@IsNotEmpty()
	app_id: number;

	@IsInt()
	@IsNotEmpty()
	organization_id: number;
}

export class BodyCreateAppChannelDto extends OmitType(CreateAppChannelDto, ["organization_id", "app_id"]) {}
