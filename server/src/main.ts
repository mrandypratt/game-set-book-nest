import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { writeFileSync } from 'fs';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './routes/logger/logger.service';

const { PORT, NODE_ENV } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(await app.resolve(LoggerService));

  // Security middleware
  app.use(helmet()); // Helps protect app from well-known web vulnerabilities

  // TODO: Revisit to see if we should enable cookie parsing
  // app.use(cookieParser()); // For handling JWT in cookies securely

  if (NODE_ENV === 'production') {
    // Rate limiting to prevent DDOS
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again later',
      })
    );
  }

  // Set timezone to UTC for consistency in database storage and retrieval
  process.env.TZ = 'UTC';

  console.log('TIMEZONE set to', process.env.TZ);

  // Enable data validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips non-whitelisted properties
      forbidNonWhitelisted: false, // when true,throws error if non-whitelisted properties are present
      transform: true, // transforms payloads to be objects typed according to their DTO classes
    })
  );

  // CORS configuration with security best practices
  const allowedOrigins =
    NODE_ENV === 'production'
      ? ['https://gamesetbook.com', 'https://www.gamesetbook.com']
      : ['http://localhost:5173'];

  // Enable CORS
  app.enableCors({
    origin: allowedOrigins, // This allows all origins in development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    credentials: true,
    maxAge: 3600, // Cache preflight requests for 1 hour
  });

  const config = new DocumentBuilder()
    .setTitle('GameSetBook API')
    .setDescription('API for Booking Tennis and Pickleball Courts')
    .setVersion('1.0')
    .addTag('GameSetBook')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const port = PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Server is running on port ${port} 🚀`);

  // Export Swagger JSON file
  writeFileSync('./swagger.json', JSON.stringify(document));
}
bootstrap();
