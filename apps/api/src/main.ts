import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const configuredOrigin = process.env.WEB_ORIGIN;
  const allowedOrigins = configuredOrigin ? [configuredOrigin] : ['http://localhost:3000', 'http://127.0.0.1:3000'];
  app.enableCors({ origin: allowedOrigins });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swaggerConfig = new DocumentBuilder().setTitle('FinTwin API').setDescription('Personal finance digital twin API').setVersion('0.1').build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  await app.listen(process.env.PORT ?? 4000);
}

void bootstrap();
