import { Module } from "@nestjs/common";

//Services
import { UpdateService } from "./services/update.service";

//Controller
import { UpdateController } from "./controllers/update.controller";

@Module({
	controllers: [UpdateController],
	providers: [UpdateService],
})
export class UpdateModule {}
