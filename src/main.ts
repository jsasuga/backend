import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('RELEVIC')
    .setDescription('')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('roles')
    .addTag('modules')
    .addTag('provider')
    .addTag('branch')
    .addTag('service-type')
    .addTag('province')
    .addTag('provider-areas')
    .addTag('victim')
    .addTag('demographic-form')
    .addTag('survivor-evaluation')
    .addTag('attention-protocol')
    .addTag('follow-up-note')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, document);

  app.set('trust proxy', 1);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT || port, () => {
    console.log('[WEB]', `http://localhost:${port}`);
  });
}

bootstrap();
