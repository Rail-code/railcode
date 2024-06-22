import { Test, TestingModule } from "@nestjs/testing";

//Controller
import { VersionController } from "./version.controller";

//Services
import { VersionService } from "../services/version.service";

describe("VersionController", () => {
	let controller: VersionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [VersionController],
			providers: [VersionService],
		}).compile();

		controller = module.get<VersionController>(VersionController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
