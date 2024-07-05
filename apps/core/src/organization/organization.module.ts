import { Module } from "@nestjs/common";

//Services
import { OrganizationService } from "./services/organization.service";

//Controller
import { OrganizationController } from "./controllers/organization.controller";

//Modules
import { DatabaseModule } from "@App/database/database.module";

@Module({
	imports: [DatabaseModule],
	controllers: [OrganizationController],
	providers: [OrganizationService],
	exports: [OrganizationService],
})
export class OrganizationModule {}
