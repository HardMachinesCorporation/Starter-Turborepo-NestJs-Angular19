const fs = require('fs');
const path = require('path');

const targets = [
  'dist/apps/api/.touch',
  'dist/apps/ui/browser/.touch',
];

for (const target of targets) {
  const resolvedPath = path.resolve(__dirname, '..', target);
  const dir = path.dirname(resolvedPath);

  // 👉 Crée le dossier parent s’il n’existe pas
  console.log(`✏️ Touching file: ${resolvedPath}`);
  fs.mkdirSync(dir, { recursive: true });

  // 📝 Écrit le fichier .touch avec contenu horodaté
  fs.writeFileSync(resolvedPath, `Built: ${Date.now()}\n`);
}
