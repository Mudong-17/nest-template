import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'src/utils/log4js';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>(); // 获取上下文中Response对象
    const status = exception.getStatus(); // 获取异常状态
    const exResponse: any = exception.getResponse();
    // 设置错误信息 兼容ValidationPipe message返回
    const message =
      typeof exResponse === 'string'
        ? exception.message
          ? exception.message
          : `${status >= 500 ? 'Server Error' : 'Client Error'}`
        : exResponse?.message;

    // prettier-ignore
    const logFormat = `Request original url: ${request.originalUrl}; Method: ${request.method}; IP: ${request.ip}; Status code: ${status}; Response: ${message.toString()} `;

    Logger.info(logFormat);
    const ErrorResponse = {
      data: {},
      message: message,
      code: status,
    };
    // 设置状态码 大于500是服务器端错误，否则以200返回，通过code码区分错误原因
    response.status(status >= 500 ? status : 200);
    response.send(ErrorResponse);
  }
}
