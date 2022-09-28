import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
    const app: NestExpressApplication = await NestFactory.create(AppModule);
    const config: ConfigService = app.get(ConfigService);
    const port: number = config.get<number>('PORT');

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Relevic Backend')
        .setDescription('API')
        .setVersion('1.0')
        .addTag('users')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true }),
    );

    await app.listen(port, () => {
        console.log('[WEB]', `http://localhost:${port}`);
    });
}

bootstrap();
