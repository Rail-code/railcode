import { Injectable, BadRequestException } from "@nestjs/common";

import * as _ from "lodash";

import { JwtService } from "@nestjs/jwt";

//Services
import { UserService } from "@App/user/services/user.service";

//Database
import { RoleEnum } from "@App/user/constants/roles";

//Helpers
import { SaltHelper } from "@App/auth/helper/salt";

//Dto
import { SignupDto } from "@App/auth/dto/auth.dto";

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	/**
	 * Signup user
	 */
	async signup(data: SignupDto) {
		try {
			const state = {
				...data,
				//Default user is admin
				role: RoleEnum.admin,
			};

			const result = await this.userService.create(state);

			return _.first(result);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	/**
	 * Generate token and get basic user information
	 */
	async login(payload: { user: number }) {
		return {
			token: this.jwtService.sign({ sub: payload.user }),
		};
	}

	/**
	 * Validate credentials
	 */
	async validate(params: { email: string; password: string }) {
		const user = await this.userService.findOneByEmail(params.email);

		if (!user) {
			throw new BadRequestException("Invalid credentials");
		}

		//Validate salt
		const passwordMatch = await SaltHelper.validate(params.password, user.hash);

		if (!passwordMatch) {
			throw new BadRequestException("Invalid credentials");
		}

		return user;
	}
}
