import { Module } from "@nestjs/common";

//Services
import { ChannelService } from "./services/channel.service";
import { AppService } from "@App/app/services/app.service";
import { OrganizationService } from "@App/organization/services/organization.service";

//Controllers
import { ChannelController } from "./controllers/channel.controller";

//Modules
import { DatabaseModule } from "@App/database/database.module";

@Module({
	imports: [DatabaseModule],
	controllers: [ChannelController],
	providers: [ChannelService, AppService, OrganizationService],
})
export class ChannelModule {}
