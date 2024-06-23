import { Test, TestingModule } from "@nestjs/testing";

//Controller
import { UpdateController } from "./update.controller";

//Services
import { UpdateService } from "../services/update.service";

describe("VersionController", () => {
	let controller: UpdateController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UpdateController],
			providers: [UpdateService],
		}).compile();

		controller = module.get<UpdateController>(UpdateController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
