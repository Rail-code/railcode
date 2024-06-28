import { Test, TestingModule } from "@nestjs/testing";

//Controller
import { DeviceController } from "./device.controller";

//Services
import { DeviceService } from "../services/device.service";

describe("VersionController", () => {
	let controller: DeviceController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DeviceController],
			providers: [DeviceService],
		}).compile();

		controller = module.get<DeviceController>(DeviceController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
