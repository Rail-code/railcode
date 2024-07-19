import { Test, TestingModule } from "@nestjs/testing";

//Controllers
import { ChannelController } from "./channel.controller";

//Services
import { ChannelService } from "../services/channel.service";

describe("ChannelController", () => {
	let controller: ChannelController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ChannelController],
			providers: [ChannelService],
		}).compile();

		controller = module.get<ChannelController>(ChannelController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
