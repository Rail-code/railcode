import {Module} from "@nestjs/common";

import {ConfigModule} from "@nestjs/config";

//Config
import {AppConfig} from "./configuration";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [AppConfig],
        }),
    ],
})
export class AppConfigModule {
}
