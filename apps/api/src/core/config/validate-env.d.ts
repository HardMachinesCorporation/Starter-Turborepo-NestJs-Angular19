import { z } from 'zod';
export declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "production", "test"]>>;
    APP_PORT: z.ZodDefault<z.ZodNumber>;
    DATABASE_URL: z.ZodString;
    JWT_SECRET: z.ZodString;
    FRONTEND_URL: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    NODE_ENV: "development" | "production" | "test";
    APP_PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    FRONTEND_URL?: string | undefined;
}, {
    DATABASE_URL: string;
    JWT_SECRET: string;
    NODE_ENV?: "development" | "production" | "test" | undefined;
    APP_PORT?: number | undefined;
    FRONTEND_URL?: string | undefined;
}>;
export type EnvVariables = z.infer<typeof envSchema>;
