import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { AuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { RedisInstance } from '../../utils/redis';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ phone, password }): Promise<any> {
    const user = await this.usersService.findOneByPhone(phone);

    if (user) {
      return user;
    }
    throw new HttpException('该手机号未注册', 400);
  }

  async certificate(user) {
    const payload = {
      account: user.account,
      userId: user['id'],
      phone: user.phone,
    };
    try {
      const access_token = this.jwtService.sign(payload);
      const redis = await RedisInstance.initRedis('auth.certificate', 0);
      await redis.setex(
        `${user.id}-${user.account}`,
        2 * 60 * 60,
        `${access_token}`,
      );
      return { access_token };
    } catch (error) {
      throw new HttpException('账号或密码错误', 401);
    }
  }

  // async getUser(user: User) {}
}
