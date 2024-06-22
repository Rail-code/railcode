import { Test, TestingModule } from "@nestjs/testing";

//Controller
import { AppController } from "./app.controller";

//Services
import { AppService } from "../services/app.service";

describe("AppController", () => {
	let controller: AppController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile();

		controller = module.get<AppController>(AppController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
