import { IsMobilePhone, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsMobilePhone()
  phone: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 17, { message: '密码长度在6-16个字符' })
  password: string;
}
