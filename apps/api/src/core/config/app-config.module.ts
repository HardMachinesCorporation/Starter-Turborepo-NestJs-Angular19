import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './validate-env';
import { ZodConfigService } from './zod-config.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    cache: true,
    load:[],
    validate: (config: Record<string, unknown>) => {
      const result = envSchema.safeParse(config)
      if(!result.success){
        console.error("❌ Invalid environment variables:', result.error.format()")
        process.exit(1)
      }
      return result.data
    }
  })],
  providers: [ZodConfigService],
  exports: [ZodConfigService],
})
export class AppConfigModule {}
