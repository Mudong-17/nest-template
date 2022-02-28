const development: Config.AppConfig = {
  Port: 3000,
  TypeORM: {
    type: 'mysql',
    host: 'localhost',
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

export default development;
