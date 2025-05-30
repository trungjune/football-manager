import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import serverlessExpress from "@vendia/serverless-express";
import { Callback, Context, Handler } from "aws-lambda";
import { AppModule } from "../app.module";
import { ValidationPipe } from "@nestjs/common";

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  // Cấu hình CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  // Cấu hình global prefix
  app.setGlobalPrefix("api");

  // Cấu hình validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  // Đảm bảo context.callbackWaitsForEmptyEventLoop = false để tránh timeout
  context.callbackWaitsForEmptyEventLoop = false;

  // Khởi tạo server nếu chưa có
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
