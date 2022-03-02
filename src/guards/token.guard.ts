import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RedisInstance } from '../utils/redis';

@Injectable()
export class TokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    // 获取请求头里的 token
    const authorization = request['headers'].authorization || 0;
    if (!authorization) throw new UnauthorizedException();
    const access_token = authorization.split(' ')[1]; // authorization: Bearer xxx
    const redis = await RedisInstance.initRedis('TokenGuard.canActivate', 0);
    const key = `${user.userId}-${user.account}`;
    const cache = await redis.get(key);

    if (access_token !== cache) {
      throw new UnauthorizedException('您的账号在其他地方登录，请重新登录');
    }
    return true;
  }
}
