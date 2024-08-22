import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from "morgan";
import { ResponseInterceptor } from './common/handler/response.interceptor';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

  const config = new DocumentBuilder()
  .setTitle('Registeration')
  .setDescription("Simple apis for registeration")
  .addBearerAuth({type: 'http', name: 'token', in: 'header'}, 'authentication')
  .addServer("http://localhost:3000", "local Server")
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {enableImplicitConversion: true}
    })
  );
  // useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(3000);
  console.log("listening at port.. 3000");
}
bootstrap();
