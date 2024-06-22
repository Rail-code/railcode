import { Test, TestingModule } from "@nestjs/testing";

//Service
import { VersionService } from "./version.service";

describe("VersionService", () => {
	let service: VersionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [VersionService],
		}).compile();

		service = module.get<VersionService>(VersionService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
