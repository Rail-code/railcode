import { Module } from "@nestjs/common";

//Services
import { DeviceService } from "./services/device.service";

//Controller
import { DeviceController } from "./controllers/device.controller";

@Module({
	controllers: [DeviceController],
	providers: [DeviceService],
})
export class DeviceModule {}
