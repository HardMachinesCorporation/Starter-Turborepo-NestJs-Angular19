import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../../core/config/app-config.module';
import { ZodConfigService } from '../../core/config/zod-config.service';
import { DataSourceOptions } from 'typeorm';



@Module({
  imports: [AppConfigModule,TypeOrmModule.forRootAsync({
    inject:[ZodConfigService],
    useFactory:(config:ZodConfigService): DataSourceOptions =>({
      type: 'postgres',
      url: config.get('DATABASE_URL'),
      entities: [__dirname + '/../../**/*.entity.{ts,js}'],
      migrations: [__dirname + '/migrations/*.{ts,js}'],
      synchronize: config.isDev, // true only in dev
      logging: ['error', 'warn'],
      ssl: config.isProd ? { rejectUnauthorized: false } : false,
    })
  })]
})
export class DatabaseModule {}
