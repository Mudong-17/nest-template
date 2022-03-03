const development: Config.AppConfig = {
  Port: 3000,
  TypeORM: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'server-template',
    entityPrefix: 'st-',
    autoLoadEntities: true,
    synchronize: true,
    // logging: true,
  },
  JWT: {
    secret: 'server-template',
    signOptions: {
      expiresIn: '2h',
    },
  },
  Redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 'server-template',
    password: '',
  },
};

export default development;
