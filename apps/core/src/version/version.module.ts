import { Module } from "@nestjs/common";

//Services
import { VersionService } from "./services/version.service";

//Controller
import { VersionController } from "./controllers/version.controller";

@Module({
	controllers: [VersionController],
	providers: [VersionService],
})
export class VersionModule {}
