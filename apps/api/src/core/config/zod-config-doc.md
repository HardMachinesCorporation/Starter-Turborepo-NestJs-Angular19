# ⚙️ ZodConfigService — Configuration Module for NestJS

> ✅ Fully validated, typed, and scalable `.env` config system using Zod

---

## 🎯 Goal

The `ZodConfigService` is a custom injectable service built on top of NestJS's `ConfigService`, with the following enhancements:

- ✅ Validates environment variables at startup using `Zod`
- ✅ Provides type-safe access to environment variables via `get()`
- ✅ Exposes helpers like `isProd` and `isDev`
- ✅ Fails fast with descriptive errors if any variable is invalid or missing

---

## 🧱 Structure

```
apps/api/
└── src/core/config/
    ├── config.module.ts          # Module that sets up validation + service
    ├── validate-env.ts           # Defines Zod schema and EnvVariables type
    └── zod-config.service.ts     # The strongly typed accessor service
```

---

## 📁 `validate-env.ts`

Defines the Zod schema for validating `.env`:

```ts
import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  FRONTEND_URL: z.string().url().optional(),
});

export type EnvVariables = z.infer<typeof envSchema>;
```

---

## 📁 `zod-config.service.ts`

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { EnvVariables } from './validate-env';

@Injectable()
export class ZodConfigService {
  constructor(private readonly configService: ConfigService<EnvVariables>) {}

  get<K extends keyof EnvVariables>(key: K): EnvVariables[K] {
    const value = this.configService.get(key, { infer: true });
    if (value === undefined || value === null) {
      throw new Error(`❌ [ZodConfigService] Missing env var: ${String(key)}`);
    }
    return value;
  }

  get isProd(): boolean {
    return this.get('NODE_ENV') === 'production';
  }

  get isDev(): boolean {
    return this.get('NODE_ENV') === 'development';
  }
}
```

---

## 📁 `config.module.ts`

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema, EnvVariables } from './validate-env';
import { ZodConfigService } from './zod-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate(config: Record<string, unknown>) {
        const result = envSchema.safeParse(config);
        if (!result.success) {
          console.error('❌ Invalid environment variables:', result.error.format());
          process.exit(1);
        }
        return result.data;
      },
    }),
  ],
  providers: [ZodConfigService],
  exports: [ZodConfigService],
})
export class AppConfigModule {}
```

---

## ✅ Usage in your app

### In `main.ts`:

```ts
const config = app.get(ZodConfigService);
const port = config.get('PORT');
await app.listen(port);
```

### In a service:

```ts
constructor(private readonly config: ZodConfigService) {}

someMethod() {
  const secret = this.config.get('JWT_SECRET');
  if (this.config.isProd) { ... }
}
```

---

## 🧪 Example `.env`

```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://user:pass@localhost:5432/mydb
JWT_SECRET=superlongjwtsecretstring_over_32_chars
FRONTEND_URL=http://localhost:4200
```

---

📌 Crafted with love by Jordach & Aegis — Hard Machine™
