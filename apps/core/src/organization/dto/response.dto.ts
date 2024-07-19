import { IsInt, IsString,isDate } from "class-validator";
import { Exclude } from "class-transformer";

export class OrgResponseDto {
	@IsInt()
	id: number;

	@IsString()
	name: string;

	@IsString()
	@Exclude()
	secret: string;

	@IsString()
	createdAt: Date;

	constructor(partial: Partial<OrgResponseDto>) {
		Object.assign(this, partial);
	}
}
