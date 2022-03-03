import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/log4js';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: () => NextFunction,
) {
  const code = res.statusCode;
  next();
  //  组装日志信息
  // prettier-ignore
  const logFormat = `Method:${req.method}; Request original url: ${req.originalUrl}; IP:${req.ip}; Status code:${code}`;
  // 根据状态码进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}
