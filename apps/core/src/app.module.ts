import {Module} from "@nestjs/common";

//Modules
import {AppConfigModule} from "./config/config.module";


@Module({
    exports: [],
    imports: [
        AppConfigModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
