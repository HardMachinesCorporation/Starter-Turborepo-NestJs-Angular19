import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './validate-env';
export declare class ZodConfigService {
    private readonly configService;
    constructor(configService: ConfigService);
    get<K extends keyof EnvVariables>(key: K): EnvVariables[K];
    get isProd(): boolean;
    get isDev(): boolean;
}
