import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, IsEnum, MinLength } from "class-validator";

//Role
import { Roles, type RolesType } from "@App/shared/constants/permissions";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsOptional()
	lastName: string;

	@IsEmail()
	@Length(1, 255)
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string;

	@IsInt()
	@IsEnum(Roles)
	role: RolesType;
}
