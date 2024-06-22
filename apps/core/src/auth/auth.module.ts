import { Module } from "@nestjs/common";

//Services
import { AuthService } from "./services/auth.service";

//Controller
import { AuthController } from "./controllers/auth.controller";

@Module({
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
