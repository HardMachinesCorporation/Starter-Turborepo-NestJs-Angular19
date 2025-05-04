const fs = require('fs');
const path = require('path');

const targets = [
  {
    // NestJS App
    touch: 'dist/apps/api/.touch',
    check: 'dist/apps/api/main.js',
  },
  {
    // Angular App (Browser Output)
    touch: 'dist/apps/ui/browser/.touch',
    check: 'dist/apps/ui/browser/index.html',
  },
];

for (const { touch, check } of targets) {
  const resolvedTouch = path.resolve(__dirname, '..', touch);
  const resolvedCheck = path.resolve(__dirname, '..', check);
  const dir = path.dirname(resolvedTouch);

  if (fs.existsSync(resolvedCheck)) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(resolvedTouch, `Built: ${Date.now()}\n`);
    console.log(`✅ Build confirmed → Touch created: ${touch}`);
  } else {
    console.warn(`⚠️ WARNING: Expected output not found → ${check}`);
    console.warn(`❌ Skipping touch file creation for: ${touch}`);
  }
}
