import { Module } from "@nestjs/common";

//Services
import { AppService } from "./services/app.service";
import { OrganizationService } from "@App/organization/services/organization.service";

//Controllers
import { AppController } from "./controllers/app.controller";

//Modules
import { DatabaseModule } from "@App/database/database.module";

@Module({
	imports: [DatabaseModule],
	controllers: [AppController],
	providers: [AppService, OrganizationService],
	exports: [AppService],
})
export class AppModule {}
