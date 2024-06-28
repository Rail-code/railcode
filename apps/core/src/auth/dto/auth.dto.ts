import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";

/**
 * Signup
 */
export class SignUpDto {
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

/**
 * Login
 */
export class SignInDto {
	@Length(1, 255)
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string;
}
