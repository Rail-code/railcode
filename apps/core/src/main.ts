import "reflect-metadata";

import {NestFactory} from "@nestjs/core";
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

/**
 * App Module
 */
import {AppModule} from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Starts listening for shutdown hooks
    app.enableShutdownHooks();

    // Set a global prefix for all routes
    app.setGlobalPrefix("api");

    /**
     * Import configuration
     */
    const configService = app.get(ConfigService);

    /**
     * Configure Open API documentation
     */
    const configDocs = new DocumentBuilder()
        .setTitle("Railcode")
        .setDescription("Dynamic App Updates")
        .setVersion("0.0.1")
        .build();

    //Generate docs
    const docs = SwaggerModule.createDocument(app, configDocs);

    //Create swagger
    SwaggerModule.setup("api/docs", app, docs);

    /**
     * Enable Global validation for endpoints
     */
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(configService.get<number>("app.port"));
}

bootstrap();
