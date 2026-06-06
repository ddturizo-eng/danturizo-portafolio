const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SRC_DIR = path.join(__dirname, '..', 'app');
const IMAGE_PATTERN = /\/img\/[^\s"'`)\]}>!]+/gi;

function getAllFilesOnDisk(dir) {
  const files = {};
  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        const relativePath = path.relative(PUBLIC_DIR, fullPath).replace(/\\/g, '/');
        files[relativePath] = { fullPath, name: entry.name };
      }
    }
  }
  if (fs.existsSync(dir)) walk(dir);
  return files;
}

function findImageReferencesInCode(dir) {
  const refs = [];
  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.next') {
        walk(fullPath);
      } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        let match;
        while ((match = IMAGE_PATTERN.exec(content)) !== null) {
          refs.push({
            file: path.relative(path.join(__dirname, '..'), fullPath).replace(/\\/g, '/'),
            ref: match[0].replace(/^\//, ''),
            line: content.substring(0, match.index).split('\n').length,
          });
        }
      }
    }
  }
  if (fs.existsSync(dir)) walk(dir);
  return refs;
}

function main() {
  const diskFiles = getAllFilesOnDisk(PUBLIC_DIR);
  const codeRefs = findImageReferencesInCode(SRC_DIR);

  let hasErrors = false;

  const diskMap = {};
  for (const [relativePath, info] of Object.entries(diskFiles)) {
    diskMap[relativePath.toLowerCase()] = info;
  }

  for (const ref of codeRefs) {
    const refLower = ref.ref.toLowerCase();
    const match = diskMap[refLower];
    if (!match) {
      console.error(`[ERROR] Referencia a imagen que no existe en disco: ${ref.ref}`);
      console.error(`        Archivo: ${ref.file}:${ref.line}`);
      hasErrors = true;
      continue;
    }
    if (match.name !== path.basename(ref.ref)) {
      console.error(`[ERROR] Case mismatch para: ${ref.ref}`);
      console.error(`        En disco:       ${match.name}`);
      console.error(`        En código:      ${path.basename(ref.ref)}`);
      console.error(`        Archivo:        ${ref.file}:${ref.line}`);
      console.error(`        Solución:       Cambiar a: ${match.name}`);
      hasErrors = true;
    }
  }

  if (!hasErrors) {
    console.log('[OK] Todas las referencias a imágenes coinciden correctamente.');
  }

  process.exit(hasErrors ? 1 : 0);
}

main();
