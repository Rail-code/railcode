import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

//Guard
import { AuthGuard } from "@App/auth/guard/auth.guard";
import { OrgPermissionGuard } from "@App/organization/guard/permission.guard";

//Modules
import { DatabaseModule } from "./database/database.module";
import { AppConfigModule } from "./config/config.module";

import { UserModule } from "./user/user.module";
import { AuthModule } from "@App/auth/auth.module";
import { AppModule } from "@App/app/app.module";
import { ChannelModule } from "@App/channel/channel.module";
import { DeviceModule } from "@App/device/device.module";
import { OrganizationModule } from "@App/organization/organization.module";
import { UpdateModule } from "@App/update/update.module";

@Module({
	exports: [],
	imports: [
		DatabaseModule,
		AppConfigModule,
		UserModule,
		AuthModule,
		AppModule,
		ChannelModule,
		DeviceModule,
		OrganizationModule,
		UpdateModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: OrgPermissionGuard,
		},
	],
})
export class CoreAppModule {}
