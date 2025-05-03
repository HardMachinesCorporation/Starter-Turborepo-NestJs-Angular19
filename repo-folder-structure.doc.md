# 🗂️ Repo Folder Structure — project-starter

This document describes the folder layout and architectural principles of your monorepo.

---

## 🧱 Core Structure

```
project-starter/
├── apps/
│   ├── api/       ← NestJS backend (TypeScript)
│   └── ui/        ← Angular frontend (v19+)
├── libs/          ← Shared libraries (optional, reusable logic or models)
├── dist/          ← Centralized build outputs for all apps and libs
├── scripts/       ← Custom automation scripts (e.g., Turbo workaround)
├── package.json   ← Root package definition and scripts
├── turbo.json     ← Turbo tasks & caching configuration
```

---

## 📦 Apps

### `apps/api/`

- **Framework**: [NestJS](https://nestjs.com)
- **Purpose**: Provides the backend services, APIs, and business logic.
- **Build output**: Written to `dist/apps/api/`.

### `apps/ui/`

- **Framework**: [Angular 19](https://angular.io)
- **Purpose**: Frontend application for users.
- **Build output**: Written to `dist/apps/ui/browser/`.

---

## 🧠 Centralized Builds in `dist/`

Instead of having each app output to its own folder, we centralize all builds under:

```
dist/
├── apps/
│   ├── api/         ← NestJS build
│   └── ui/browser/  ← Angular build
```

This ensures compatibility with Turbo caching and simplifies deployment steps.

---

## ⚙️ Turbo Workaround

Due to how [Turborepo](https://turbo.build) tracks `outputs`, we use a custom script to **force tangible file changes** so the cache works reliably.

📄 `scripts/write-touch.js` → See full explanation in `./scripts/write-touch.doc.md`

This script ensures a `.touch` file is updated during each build, which helps Turbo detect that the build truly produced an output.

---

## ✅ Why read `write-touch.doc.md`?

If you're using Turbo and wonder why:

> `⚠️ no output files found for task ...`

…then [write-touch.doc.md](./scripts/write-touch.doc.md) is for you.

It explains:

- Why this `.touch` trick is needed
- How to integrate it in Angular/Nest builds
- What the script does and how it helps Turbo caching

---

📌 **Crafted with love by Jordach & Aegis from Hard Machine™**