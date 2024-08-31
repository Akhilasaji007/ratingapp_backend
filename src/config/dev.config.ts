import { registerAs } from '@nestjs/config';

export default registerAs('DEV_CONFIG', () => ({
  POSTGRES_HOST: '127.0.0.1',
  POSTGRES_PORT: 5432,
  POSTGRES_USER: 'postgres',
  POSTGRES_PASSWORD: 'admin',
  POSTGRES_DATABASE: 'new_shop',
}));
