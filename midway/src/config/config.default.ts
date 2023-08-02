import { MidwayConfig } from '@midwayjs/core';
import { EverythingSubscriber } from '../event/EverythingSubscriber';
export default {
  keys: '1690945253999_4437',
  koa: {
    port: 8840,
    globalPrefix: '/koa2-web',
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root1234',
        database: 'midway',
        synchronize: true,
        logging: false,
        entities: ['**/entity/*.entity{.ts,.js}'],
        subscribers: [EverythingSubscriber],
      },
    },
  },
} as MidwayConfig;

export const cors = {
  credentials: true,
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  maxAge: 60 * 60,
};
