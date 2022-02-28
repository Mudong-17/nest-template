declare namespace Config {
  type TypeORM = {
    // 数据库类型
    type: 'mysql' | 'mongodb';
    // 数据库Host
    host: string;
    // 数据库端口
    port: number;
    // 数据库用户名
    username: string;
    // 数据库密码
    password: string;
    // 数据库名
    database: string;
    // 给此数据库连接上的所有表（或集合）加的前缀
    entityPrefix?: string;
    // 连接的字符集（默认值：UTF8_GENERAL_CI）
    charset?: string;
    // 服务器上配置的时区（默认：local）
    timezone?: string;
    // 要加载并用于此连接的实体
    entities?: string[];
    // 如果为true,将自动加载实体(默认：false)
    autoLoadEntities?: boolean;
    // 指示是否在每次应用程序启动时自动创建数据库架构。 请注意此选项，不要在生产环境中使用它，否则将丢失所有生产数据。但是此选项在调试和开发期间非常有用。作为替代方案，你可以使用 CLI 运行 schema：sync 命令。请注意，对于 MongoDB 数据库，它不会创建模式，因为 MongoDB 是无模式的。相反，它只是通过创建索引来同步。
    synchronize: boolean;
    // 指示是否启用日志记录。
    logging?: boolean;
  };
  type JWT = {
    secret: string;
    signOptions: {
      expiresIn: string;
    };
  };
  type AppConfig = {
    Port: number;
    TypeORM: TypeORM;
    JWT?: JWT;
  };
}
