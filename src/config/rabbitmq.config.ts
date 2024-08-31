import { registerAs } from '@nestjs/config';

export default registerAs('RMQ_CONFIG', () => ({
  URL: process.env.RMQ_URL || 'amqp://guest:guest@newshop-rabbitmq:5672/',
  USER_QUEUE: process.env.USER_QUEUE || 'users_queue',
  AUTH_QUEUE: process.env.AUTH_QUEUE || 'auth_queue',
  DURABLE: process.env.DURABLE || false,
}));
