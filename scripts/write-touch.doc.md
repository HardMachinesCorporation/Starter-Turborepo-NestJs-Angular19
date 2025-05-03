# 🎯 `write-touch.js`

---

### ✅ WHY?

Turbo relies on **declared outputs** (in `turbo.json`) to determine whether it can **cache or replay a build**.

However, if it detects **no real file changes or writes**, it shows the warning:

> ⚠️ `no output files found for task ...`

To avoid this, we **force a file write** by generating a `.touch` file **after each build**, even when the output is minimal or rarely updated.

---

### 🔧 HOW?

#### 👉 In Angular (`apps/ui/package.json`):

```json
"scripts": {
  "build": "ng build && node ../../scripts/write-touch.js"
}
```

#### 👉 In NestJS (`apps/api/package.json`):

```json
"scripts": {
  "build": "nest build && node ../../scripts/write-touch.js"
}
```

---

### 🧠 TIP: Use this universal script

Place this in `scripts/write-touch.js`:

```ts
const fs = require('fs');
const path = require('path');

const targets = [
  'dist/apps/api/.touch',
  'dist/apps/ui/browser/.touch',
];

for (const target of targets) {
  const resolvedPath = path.resolve(__dirname, '..', target);
  const dir = path.dirname(resolvedPath);

  // 👉 Ensure the parent directory exists
  fs.mkdirSync(dir, { recursive: true });

  // 📝 Write a timestamp to the .touch file
  fs.writeFileSync(resolvedPath, `Built: ${Date.now()}\n`);
}
```

---

### 📜 Script Goal

This script creates or overwrites `.touch` files **with a timestamp**, so Turbo can detect a **valid output**, which it would otherwise ignore if:

- the file is empty,
- unchanged from the last run,
- or too small.

---

### 🧠 Why this matters

Turbo’s cache won't trigger unless the outputs change.

So by writing a **timestamp** (`Date.now()`), we create a **guaranteed change** — unlocking proper caching behavior.

---

### 🧱 Code Breakdown

```ts
const fs = require('fs');                   // Node.js module to interact with the filesystem
const path = require('path');               // Handles cross-platform path construction

const targets = [
  'dist/apps/api/.touch',
  'dist/apps/ui/browser/.touch',
];

for (const target of targets) {
  const resolvedPath = path.resolve(__dirname, '..', target);
  const dir = path.dirname(resolvedPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(resolvedPath, `Built: ${Date.now()}\n`);
}
```

---

### ✅ Result

Each time you run `npm run build`, you’ll get output like:

```
dist/apps/api/.touch → Built: 1714751498091
dist/apps/ui/browser/.touch → Built: 1714751498091
```

> ✅ This dynamic content ensures Turbo sees a **real output**, enabling **correct caching** every time.

---

**Crafted with love** ❤️  
by **Jordach & Aegis** from **Hard Machine™**  
**"We code. We build. We industrialize."**
