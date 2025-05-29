import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as express from "express";
import { ExpressAdapter } from "@nestjs/platform-express";

// Tạo instance express để sử dụng với serverless
const server = express();

// Hàm bootstrap để khởi tạo ứng dụng NestJS
async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Cấu hình CORS cho phép frontend truy cập
  app.enableCors({
    origin: process.env.FRONTEND_URL || "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  // Cấu hình validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Cấu hình global prefix cho API
  app.setGlobalPrefix("api");

  // Khởi động server nếu không chạy trong môi trường serverless
  if (process.env.NODE_ENV !== "production") {
    await app.listen(process.env.PORT || 3001);
    console.log(`Application is running on: ${await app.getUrl()}`);
  }

  return app;
}

// Khởi tạo ứng dụng
let cachedApp: any;

// Handler cho serverless function
export default async function handler(req: any, res: any) {
  if (!cachedApp) {
    cachedApp = await bootstrap();
  }

  // Xử lý request
  server(req, res);
}

// Khởi động ứng dụng nếu chạy trực tiếp (không phải serverless)
if (process.env.NODE_ENV !== "production") {
  bootstrap();
}
