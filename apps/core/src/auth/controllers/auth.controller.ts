import { Controller, Post, Body } from "@nestjs/common";

//Service
import { AuthService } from "../services/auth.service";

//Dtos
import { CreateAuthDto } from "../dto/create.dto";
import { UpdateAuthDto } from "../dto/update.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Sign in user
	 */
	@Post("/login")
	signin(@Body() createAuthDto: CreateAuthDto) {
		return this.authService.create(createAuthDto);
	}
}
