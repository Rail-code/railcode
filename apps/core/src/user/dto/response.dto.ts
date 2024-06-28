import { IsEmail, IsInt, IsString, IsEnum } from "class-validator";
import { Exclude } from "class-transformer";

//Role
import { Roles, type RolesType } from "@App/shared/constants/permissions";

export class UserResponseDto {
	@IsInt()
	id: number;

	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsEmail()
	email: string;

	@IsString()
	password: string;

	@IsString()
	@Exclude()
	hash: string;

	@IsString()
	@IsEnum(Roles)
	role: RolesType;

	constructor(partial: Partial<UserResponseDto>) {
		Object.assign(this, partial);
	}
}
