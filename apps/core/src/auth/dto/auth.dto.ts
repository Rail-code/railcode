import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";

export class SignupDto {
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
}
