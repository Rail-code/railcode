import { Module } from "@nestjs/common";

//Services
import { ChannelService } from "./services/channel.service";

//Controllers
import { ChannelController } from "./controllers/channel.controller";

@Module({
	controllers: [ChannelController],
	providers: [ChannelService],
})
export class ChannelModule {}
