import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { RequestTransformInterceptor } from './core/interceptor/request-transform.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Log4jsLogger } from '@nestx-log4js/core';
import { LoggerMiddleware } from './middleware/logger.middleware';

const logger = new Logger('main.ts');

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  // 获取ConfigServic模块
  const configService = app.get(ConfigService);
  const port = configService.get('Port');
  // 获取Log4jsLogger模块
  const log4jsLogger = app.get(Log4jsLogger);
  // 注册全局路由前缀
  app.setGlobalPrefix('api');
  // 注册全局错误过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 注册全局请求拦截
  app.useGlobalInterceptors(new RequestTransformInterceptor());
  // 注册全局数据验证
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // 获取Log4js模块 注册全局Logger
  app.useLogger(log4jsLogger);
  // logger 中间件
  app.use(LoggerMiddleware);

  await app.listen(port);
  return { port };
};

bootstrap().then(({ port }) =>
  logger.log(`listen in http://127.0.0.1:${port}`),
);
