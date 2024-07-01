import { IsEmail, IsInt, IsString } from "class-validator";
import { Exclude } from "class-transformer";

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

	constructor(partial: Partial<UserResponseDto>) {
		Object.assign(this, partial);
	}
}
