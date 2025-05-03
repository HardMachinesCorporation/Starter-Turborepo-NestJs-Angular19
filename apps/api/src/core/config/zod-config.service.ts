import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './validate-env';

@Injectable()
export class ZodConfigService{
  private readonly logger : Logger = new Logger(ZodConfigService.name);

  constructor(private readonly configService: ConfigService) {
    this.logger.log(`🚀 ${ZodConfigService.name} is initialized.`)
  }

  get<K extends keyof EnvVariables>(key: K): EnvVariables[K] {
    const value = this.configService.get(key, {infer:true});
    if(value === undefined || value === null) {
      // TODO :Add Logging
      throw new InternalServerErrorException("`❌ [ZodConfigService] Missing env var: ${String(key)}`");
    }
    return value
  }

  get isProd():boolean {
    return this.get("NODE_ENV") === "production";
  }

  get isDev():boolean {
    return this.get("NODE_ENV") === "development";
  }
}
