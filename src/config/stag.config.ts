import { registerAs } from '@nestjs/config';

export default registerAs('STAG_CONFIG', () => ({
  POSTGRES_HOST: 'rdsdatabase.cfibo3449h0a.ap-south-1.rds.amazonaws.com',
  POSTGRES_PORT: 5432,
  POSTGRES_USER: 'postgres',
  POSTGRES_PASSWORD: 'FmzY6hvp0DZDotGTDv3l',
  POSTGRES_DATABASE: 'new_shop_test',
}));
