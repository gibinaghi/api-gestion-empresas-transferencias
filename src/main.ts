import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS
  app.enableCors();

  // Global prefix
  const globalPrefix = configService.get('SWAGGER_PREFIX', 'api');
  app.setGlobalPrefix(globalPrefix);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE', 'API Gestión Empresas'))
    .setDescription(configService.get('SWAGGER_DESCRIPTION', 'API para gestionar empresas y transferencias'))
    .setVersion(configService.get('SWAGGER_VERSION', '1.0'))
    .addTag('Empresas', 'Operaciones relacionadas con empresas')
    .addTag('Transferencias', 'Operaciones relacionadas con transferencias')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = configService.get('PORT', 3000);
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}/${globalPrefix}`);
  console.log(`Swagger documentation: http://localhost:${port}/docs`);
}

bootstrap();