import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { RequestTransformInterceptor } from './core/interceptor/request-transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { Logger } from './utils/log4js';
import { AllExceptionFilter } from './core/filter/all-exception.filter';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  // 获取ConfigServic模块
  const configService = app.get(ConfigService);
  const port = configService.get('Port');
  // 获取Log4js模块 注册全局Logger
  app.use(LoggerMiddleware);
  // 注册全局路由前缀
  app.setGlobalPrefix('api');
  // 注册全局错误过滤器
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  // 注册全局请求拦截
  app.useGlobalInterceptors(new RequestTransformInterceptor());
  // 注册全局数据验证
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port);
  return { port };
};

bootstrap().then(({ port }) =>
  Logger.log(`listen in http://127.0.0.1:${port}`),
);
