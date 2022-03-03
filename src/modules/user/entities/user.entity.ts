import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import stringRandom from 'string-random';
import { encryptPassword, makeSalt } from '../../../utils/bcrypt';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    comment: '用户昵称',
  })
  nickname: string;

  @Column({
    comment: '用户账号',
  })
  account: string;

  @Column({
    select: false,
    comment: '用户密码',
  })
  password: string;

  @Column({
    comment: '用户手机号',
  })
  phone: string;

  @Column({
    nullable: true,
    comment: '用户头像',
  })
  avatar: string;

  @Column('simple-array', {
    nullable: true,
    comment: '用户角色',
  })
  roles: string[];

  @Column({ default: 0, comment: '用户状态' })
  status: number;

  @Column()
  salt: string;

  @CreateDateColumn({
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date;

  @BeforeInsert()
  encryptPwd() {
    const salt = makeSalt();
    this.salt = salt;
    this.password = encryptPassword(this.password, salt);

    // 唯一账号 随机字符串 + 注册时秒级别时间戳
    this.account =
      stringRandom(16, { numbers: false }) + Math.floor(Date.now() / 1000);
  }
}
