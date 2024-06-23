import { Injectable, BadRequestException } from "@nestjs/common";

import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";

//Services
import { AuthService } from "@App/auth/services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			usernameField: "email",
		});
	}

	async validate(email: string, password: string) {
		return this.authService.validate({ email, password });
	}
}
