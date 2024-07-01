import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class BodyCreateOrgDto {
	@IsString()
	@IsNotEmpty()
	name: string;
}

export class CreateOrgDto extends BodyCreateOrgDto {
	@IsInt()
	@IsNotEmpty()
	user_id: number;
}
