import { Module } from "@nestjs/common";

//Services
import { OrganizationService } from "./services/organization.service";

//Controller
import { OrganizationController } from "./controllers/organization.controller";

@Module({
	controllers: [OrganizationController],
	providers: [OrganizationService],
})
export class OrganizationModule {}
