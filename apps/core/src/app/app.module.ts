import { Module } from "@nestjs/common";

//Services
import { AppService } from "./services/app.service";

//Controllers
import { AppController } from "./controllers/app.controller";

@Module({
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
