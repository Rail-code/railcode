import { Controller, Post, Get, Body, Req, BadRequestException } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";

//Service
import { AuthService } from "../services/auth.service";

//Decorator
import { AuthPublic } from "@App/auth/decorator/public.decorator";
import { OrgPermission } from "@App/organization/decorator/permission.decorator";

//Dtos
import { SignInDto, SignUpDto } from "../dto/auth.dto";

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
	@Post("/login")
	@AuthPublic()
	async login(@Req() req, @Body() data: SignInDto) {
		try {
			const result = await this.authService.validate(data);

			return this.authService.login(result);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	/**
	 * Signup in user
	 */
	@Post("/signup")
	@AuthPublic()
	async signup(@Req() req, @Body() data: SignUpDto) {
		try {
			const result = await this.authService.signup(data);

			return this.authService.login(result);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	/**
	 * Me profile
	 */
	@Get("/profile")
	@OrgPermission({
		roles: (role) => [role.admin],
		module: (module) => module.account,
		action: (action) => action.read,
	})
	profile(@Req() req) {
		return req.session;
	}
}
