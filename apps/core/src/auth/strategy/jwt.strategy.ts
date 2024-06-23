import { Injectable } from "@nestjs/common";

import { ConfigService } from "@nestjs/config";

import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>("app.auth.secret"),
		});
	}

	async validate(payload: any) {
		return { user: payload.sub, };
	}
}
