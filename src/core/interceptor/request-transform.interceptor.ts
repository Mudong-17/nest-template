import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from 'src/utils/log4js';

@Injectable()
export class RequestTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((data) => {
        // prettier-ignore
        const logFormat = `Request original url: ${req.originalUrl}; Method: ${req.method}; IP: ${req.ip}; Response data: ${JSON.stringify(data)}`;

        Logger.info(logFormat);
        Logger.access(logFormat);
        return {
          data,
          code: 200,
          message: '请求成功',
        };
      }),
    );
  }
}
