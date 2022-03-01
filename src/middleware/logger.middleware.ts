import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: () => NextFunction,
) {
  const code = res.statusCode;
  next();
  //  组装日志信息
  const logFormat = JSON.stringify({
    IP: req.ip,
    req_url: req.originalUrl,
    req_method: req.method,
    status_code: code,
    parmas: req.params,
    query: req.query,
    body: req.body,
  });
  // 根据状态码进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    // if ()
    Logger.log(logFormat);
  }
}
