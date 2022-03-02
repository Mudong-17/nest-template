import {
  Controller,
  UseGuards,
  Post,
  Body,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenGuard } from '../../guards/token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(new TokenGuard())
  async login(@Body() loginParmas: any) {
    const user = await this.authService.validateUser(loginParmas);
    if (user) return this.authService.certificate(user);

    throw new HttpException('用户不存在', 404);
  }
}
