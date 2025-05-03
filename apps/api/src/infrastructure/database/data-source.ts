import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import { envSchema } from '../../core/config/validate-env';

dotenv.config();
const env = envSchema.parse(process.env);

export default new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  entities: ['dist/apps/api/src/**/*.entity.js'],  // ✅ CENTRALISÉ
  migrations: ['dist/apps/api/src/infra/database/migrations/*.js'],
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
