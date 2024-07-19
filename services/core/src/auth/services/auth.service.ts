import { Injectable, BadRequestException } from "@nestjs/common";

import { instanceToPlain } from "class-transformer";

import { JwtService } from "@nestjs/jwt";

//Services
import { UserService } from "@App/user/services/user.service";

//Database
import type { UserModel } from "@App/database/schemes";

//Constants
import { Roles } from "@App/shared/constants/permissions";

//Helpers
import { SaltHelper } from "@App/auth/helper/salt";

//Dto
import { SignUpDto } from "@App/auth/dto/auth.dto";
import { UserResponseDto } from "@App/user/dto/response.dto";

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	/**
	 * Signup user
	 */
	async signup(data: SignUpDto) {
		return this.userService.create(data);
	}

	/**
	 * Generate token and normalize user
	 */
	async login(user: UserModel) {
		return {
			user: instanceToPlain(new UserResponseDto(user)),
			token: this.jwtService.sign({ sub: user.id }),
		};
	}

	/**
	 * Validate user
	 */
	async validate(data: { email: string; password: string }) {
		const user = await this.userService.findOneByEmail(data.email);

		if (!user) {
			throw new BadRequestException("Invalid credentials");
		}

		//Validate salt
		const passwordMatch = await SaltHelper.validate(data.password, user.hash);

		if (!passwordMatch) {
			throw new BadRequestException("Invalid credentials");
		}

		return user;
	}
}
