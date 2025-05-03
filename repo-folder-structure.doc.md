
# 🧱 Repository Structure

> Crafted with love by **Jordach & Aegis** from **Hard Machine™**

---

## 🎯 Purpose

This file explains the structure and philosophy behind your monorepo, which combines multiple applications (API & UI) with centralized builds, shared logic, and unified tooling.

---

## 📁 Root Folders Overview

```
project-starter/
├── apps/                 → Main applications (API, UI, etc.)
├── libs/                 → Shared libraries and utilities
├── dist/                 → Centralized build outputs
├── scripts/              → Utilities like `write-touch.js`
├── .turbo/               → TurboRepo cache and state
├── .env / .env-example   → Environment variable definitions
```

---

## ⚙️ apps/

Contains your applications.

| Path        | Tech    | Description                   |
| ----------- | ------- | ----------------------------- |
| `apps/api/` | NestJS  | Backend app (REST API)        |
| `apps/ui/`  | Angular | Frontend app (SPA or CSR/SSR) |

Each app contains its own `src/` with features, config, modules, etc.

---

## 💾 dist/

Centralized output for builds.

| Path                    | Output From   |
| ----------------------- | ------------- |
| `dist/apps/api/`        | NestJS build  |
| `dist/apps/ui/browser/` | Angular build |

**Note:** Each build writes a `.touch` file here to help Turbo detect changes.

---

## 📦 libs/

You can place shared logic here, like:

* DTOs
* Utilities
* Guards / Decorators
* Shared pipes, filters, etc.

---

## 🛠 scripts/

Utility scripts.

| File                 | Purpose                                          |
| -------------------- | ------------------------------------------------ |
| `write-touch.js`     | Force file output after builds for Turbo caching |
| `write-touch.doc.md` | Documentation explaining the reason behind it    |

---

## ⚡ TurboRepo Integration

You’re using TurboRepo to manage builds and caching between apps.

* Outputs declared in `turbo.json`
* Builds produce `.touch` files to enable smart caching
* Dev tasks scoped by app (`pnpm --filter api dev`, etc.)

---

## ✅ Best Practices Followed

* Centralized configuration (`@nestjs/config` + `Zod`)
* Type-safe `.env` loading (`ZodConfigService`)
* API versioning (`/v1`, `/v2`)
* Swagger multi-doc setup
* CI/CD and caching ready

---

📄 See [`api-starter-doc.md`](../apps/api/src/core/config/api-starter-doc.md)
📄 See [`write-touch.doc.md`](../scripts/write-touch.doc.md)

---


