const production: Config.AppConfig = {
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
    logging: true,
  },
};

export default production;
