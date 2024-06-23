import { Module } from "@nestjs/common";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { PassportModule } from "@nestjs/passport";

//Services
import { AuthService } from "./services/auth.service";

//Controller
import { AuthController } from "./controllers/auth.controller";

//Modules
import { UserModule } from "@App/user/user.module";

//strategy
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
	imports: [
		ConfigModule,
		UserModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>("app.auth.secret"),
				signOptions: {
					algorithm: "HS256",
					expiresIn: configService.get<string>("app.auth.expires"),
				},
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
