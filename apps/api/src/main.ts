import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { ZodConfigService } from './core/config/zod-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Activate versioning based on URI - Fallback version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion:['1']
  })

  const configService: ZodConfigService = app.get(ZodConfigService);
  const appPort:number = configService.get("APP_PORT")
  await app.listen(appPort ?? 3000);
  Logger.log(`🚀 Application is running on: http://localhost:${appPort}`, 'Bootstrap');
}
bootstrap();
