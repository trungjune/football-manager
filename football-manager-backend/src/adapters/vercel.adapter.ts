import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import serverlessExpress from "@vendia/serverless-express";
import { Callback, Context, Handler } from "aws-lambda";
import { AppModule } from "../app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// Biến server được lưu trữ giữa các lần gọi serverless function
let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log", "debug", "verbose"], // Bật full logging
  });

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

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle("Football Manager API")
    .setDescription("API for Football Manager application")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  // Log request để debug
  console.log("Incoming request:", {
    path: event.path,
    httpMethod: event.httpMethod,
    headers: event.headers,
  });

  // Đảm bảo context.callbackWaitsForEmptyEventLoop = false để tránh timeout
  context.callbackWaitsForEmptyEventLoop = false;

  // Khởi tạo server nếu chưa có
  if (!server) {
    console.log("Bootstrapping application...");
    server = await bootstrap();
  }

  // Xử lý request
  try {
    return await server(event, context, callback);
  } catch (error) {
    console.error("Error handling request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
