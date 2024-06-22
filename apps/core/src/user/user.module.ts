import { Module } from "@nestjs/common";

//Service
import { UserService } from "./services/user.service";

//Controller
import { UserController } from "./controllers/user.controller";

//Modules
import { DatabaseModule } from "@App/database/database.module";

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [DatabaseModule],
})
export class UserModule {}
