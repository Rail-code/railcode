import { Controller, Post, Get, Body, Req, UseGuards, BadRequestException } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";

//Passport
import { LocalAuthGuard } from "@App/auth/guards/local.guard";
import { AppAuthGuard } from "@App/auth/guards/auth.guard";

//Service
import { AuthService } from "../services/auth.service";

//Dtos
import { SignupDto } from "../dto/auth.dto";

@Controller({
	version: "1",
	path: "auth",
})
@ApiTags("Auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Sign in user
	 */
	@UseGuards(LocalAuthGuard)
	@Post("/login")
	login(@Req() req) {
		return this.authService.login(req.user);
	}

	/**
	 * Signup in user
	 */
	@Post("/signup")
	async signup(@Req() req, @Body() data: SignupDto) {
		try {
			const result = await this.authService.signup(data);

			return this.authService.login({
				user: result.id,
			});
		} catch (error) {
			throw new BadRequestException(error);
		}
	}

	/**
	 * Me profile
	 */
	@UseGuards(AppAuthGuard)
	@Get("/profile")
	profile(@Req() req) {
		return req.user;
	}
}
