# 🚀 API Starter Documentation

> Crafted with love by **Jordach & Aegis** from **Hard Machine™**

---

## 📦 Default Stack Included

This NestJS starter comes pre-configured with:

| Package                       | Purpose                                            |
| ----------------------------- | -------------------------------------------------- |
| `@nestjs/config`              | Advanced `.env` loading & configuration            |
| `@nestjs/typeorm` + `typeorm` | Scalable TypeORM integration for PostgreSQL        |
| `pg`                          | PostgreSQL official driver                         |
| `zod`                         | Environment variable schema validation             |
| `dotenv`                      | Loads `.env` files                                 |
| `class-validator`             | DTO validation                                     |
| `class-transformer`           | Automatic object transformations                   |
| `@nestjs/mapped-types`        | PartialType, PickType for advanced DTO composition |

---

## ✅ Key Features

### 🛡️ Zod-powered environment validation

All environment variables are:

* **Type-safe**
* **Validated at runtime**
* **Accessible via `ZodConfigService`**

Invalid or missing variables throw clear, early errors at startup.

---

### ⚙️ TypeORM: Centralized and Production-Ready

* Configuration loaded dynamically via `ZodConfigService`
* Centralized entities and migrations folders
* Smart `ssl` config for production based on `NODE_ENV`

### 📁 Clean Folder Structure

```
apps/
  api/
    src/
      core/config/        ← Zod env validation & config service
      infra/database/     ← Centralized TypeORM module + datasource
      shared/             ← Shared logic
```

---

## 🔀 API Versioning via URI

Enabled by default:

```ts
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: ['1'],
});
```

You can now build routes like:

* `/api/v1/...`
* `/api/v2/...`

---

## 📚 Swagger Multi-Version Support

* `/docs/v1` → Swagger UI for version 1
* `/docs/v2` → (optional) Extendable for future versions

See `setupSwagger(app)` in `main.ts` to customize headers, themes, and grouping.

---

## 📝 TurboRepo Touch File

After every build, a `.touch` file is written inside `dist/` folders to:

* ✅ Trigger Turbo’s caching mechanism correctly
* ✅ Avoid warnings like `no output files found for task...`

📄 Learn more: [`scripts/write-touch.doc.md`](../../../scripts/write-touch.doc.md)

---

## 🧪 What's Next to see

* ✅ `zod-config-doc.md` → explains the configuration pattern in detail
* ✅ `repo-folder-structure.doc.md` → clean overview of project structure
* 🔜 `zod-config.service.spec.ts` → unit tests for config validation

---

This starter was designed with **industrial scalability** in mind — ready to evolve into a production-grade monorepo.


