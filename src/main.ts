import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar Swagger
  const swaggerDoc = new DocumentBuilder()
    .setTitle('PI BACKEND')
    .setVersion('1.0.0')
    .setDescription('API PF')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDoc);

  SwaggerModule.setup('api', app, document);

  // Configurar CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Configurar prefijo global para las rutas
  //app.setGlobalPrefix('api');

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Aplicación ejecutándose en: http://localhost:${port}`);
  console.log(`📚 Documentación API: http://localhost:${port}/api`);
}

bootstrap();
