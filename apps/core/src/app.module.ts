import { Module } from "@nestjs/common";

//Modules
import { DatabaseModule } from "./database/database.module";
import { AppConfigModule } from "./config/config.module";
import { UserModule } from "./user/user.module";

@Module({
	exports: [],
	imports: [DatabaseModule, AppConfigModule, UserModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
