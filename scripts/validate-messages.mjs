import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const msgsDir = join(__dirname, '..', 'src', 'messages');
const langs = ['pl', 'en', 'zh', 'ru', 'de'];

function load(lang) {
  return JSON.parse(readFileSync(join(msgsDir, `${lang}.json`), 'utf8'));
}

function leafPaths(obj, prefix = '') {
  const leaves = [];
  for (const key of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      leaves.push(...leafPaths(val, path));
    } else if (Array.isArray(val)) {
      leaves.push(...val.map((_, i) => `${path}[${i}]`));
    } else {
      leaves.push(path);
    }
  }
  return leaves;
}

function arrayInfo(obj, prefix = '') {
  const info = [];
  for (const key of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (Array.isArray(val)) {
      info.push({ path, length: val.length });
      val.forEach((item, i) => {
        if (item !== null && typeof item === 'object') {
          info.push(...arrayInfo(item, `${path}[${i}]`));
        }
      });
    } else if (val !== null && typeof val === 'object') {
      info.push(...arrayInfo(val, path));
    }
  }
  return info;
}

const base = load('en');
const baseLeaves = new Set(leafPaths(base));
const baseArrays = arrayInfo(base).sort((a, b) => a.path.localeCompare(b.path));
let failed = false;

for (const lang of langs) {
  const data = load(lang);
  const leaves = new Set(leafPaths(data));
  const missing = [...baseLeaves].filter((p) => !leaves.has(p));
  const extra = [...leaves].filter((p) => !baseLeaves.has(p));
  const arrays = arrayInfo(data).sort((a, b) => a.path.localeCompare(b.path));
  const arrDiff = [];
  const max = Math.max(baseArrays.length, arrays.length);
  for (let i = 0; i < max; i++) {
    const a = baseArrays[i];
    const b = arrays[i];
    if (!a || !b || a.path !== b.path || a.length !== b.length) {
      arrDiff.push({ en: a || null, [lang]: b || null });
    }
  }

  console.log(`\n[${lang.toUpperCase()}] leaves=${leaves.size} arrays=${arrays.length}`);
  if (missing.length) {
    failed = true;
    console.log(`  MISSING keys: ${missing.join(', ')}`);
  }
  if (extra.length) {
    failed = true;
    console.log(`  EXTRA keys:   ${extra.join(', ')}`);
  }
  if (arrDiff.length) {
    failed = true;
    console.log(`  ARRAY diffs: ${JSON.stringify(arrDiff)}`);
  }
  if (!missing.length && !extra.length && !arrDiff.length) console.log('  OK: structure matches en');
}

process.exit(failed ? 1 : 0);
