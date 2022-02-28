import development from './development';
import production from './production';

const config = {
  development,
  production,
};

const env = process.env.NODE_ENV || 'development';

export default () => config[env];
