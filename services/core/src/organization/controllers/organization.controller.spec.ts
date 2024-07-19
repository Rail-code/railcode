import { Test, TestingModule } from "@nestjs/testing";

//Controllers
import { OrganizationController } from "./organization.controller";

//Services
import { OrganizationService } from "../services/organization.service";

describe("OrganizationController", () => {
	let controller: OrganizationController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrganizationController],
			providers: [OrganizationService],
		}).compile();

		controller = module.get<OrganizationController>(OrganizationController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
