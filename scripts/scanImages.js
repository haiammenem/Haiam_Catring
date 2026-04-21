import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const outFile = path.join(__dirname, '..', 'src', 'imagesIndex.json');

function walk(dir, callback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, callback);
    } else if (entry.isFile()) {
      callback(fullPath);
    }
  });
}

const images = {};

walk(publicDir, (filePath) => {
  const rel = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/');
  const folder = path.dirname(rel);
  // filter image extensions
  if (/[.](png|jpe?g|gif|webp)$/i.test(filePath)) {
    if (!images[folder]) images[folder] = [];
    images[folder].push(rel);
  }
});

fs.writeFileSync(outFile, JSON.stringify(images, null, 2));
console.log('imagesIndex.json generated with', Object.keys(images).length, 'folders');
