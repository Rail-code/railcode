import { Test, TestingModule } from "@nestjs/testing";

//Controller
import { UserController } from "./user.controller";

//Service
import { UserService } from "../services/user.service";

describe("UserController", () => {
	let controller: UserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [UserService],
		}).compile();

		controller = module.get<UserController>(UserController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
