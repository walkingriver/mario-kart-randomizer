#!/usr/bin/env node
/**
 * Downloads Mario Kart catalog images from Super Mario Wiki (mario.wiki.gallery).
 * Generates attribution metadata for CC BY-SA 4.0 compliance.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'src/app/data/mario-catalog.ts');
const OUT_DIR = path.join(ROOT, 'src/assets/images');
const ATTRIBUTION_PATH = path.join(ROOT, 'src/app/data/wiki-attribution.json');

const API = 'https://www.mariowiki.com/api.php';
const LICENSE = 'CC BY-SA 4.0';
const LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/4.0/';
const WIKI_HOME = 'https://www.mariowiki.com/';

/** Local filename -> wiki File: page name (without File: prefix) */
const WIKI_OVERRIDES = {
  '100px-Steel_Driver.png': 'Steel_Driver.png',
  '100px-Gold_Standard.png': 'Gold_Standard.png',
  '100px-300SLRoadster-MK8.png': '300SLRoadster MK8.png',
  '100px-Tanooki-Buggy.png': 'MK8_Tanooki_Buggy_Sprite.png',
  '100px-ZeldaMK8Bdasher.png': 'ZeldaMK8Bdasher.png',
  '100px-MK8CityTripper.png': 'MK8 Blue City Tripper.png',
  '100px-Gold_Tires_MK8.png': 'Gold Tires MK8.png',
  '100px-Off-Road.png': 'Off-Road.png',
  '100px-Blue_Standard.png': 'Blue_Standard.png',
  '100px-Retro_Off-Road.png': 'Retro_Off-Road.png',
  '100px-Leaf_Tires_MK8.png': 'Leaf Tires MK8.png',
  'Cloud_Glider.png': 'Cloud_Glider.png',
  'PaperGliderIconMK8.png': 'PaperGliderIcon-MK8.png',
  '100px-MK7_Mushroom_Wheels.png': 'MK7_Mushroom_Wheels.png',
  '100px-MK7_Red_Monster.png': 'MK7_Red_Monster.png',
  '100px-MK8D_Ancient_Tires.png': 'MK8D_Ancient_Tires.png',
};

const EXTRA_IMAGES = [
  '100px-MK7_Mushroom_Wheels.png',
  '100px-MK7_Red_Monster.png',
  '100px-MK8D_Ancient_Tires.png',
];

function parseCatalogImages(source) {
  return [...new Set([...source.matchAll(/image: '([^']+)'/g)].map((m) => m[1]))];
}

function wikiFileName(localName) {
  if (WIKI_OVERRIDES[localName]) {
    return WIKI_OVERRIDES[localName];
  }
  return localName.replace(/^\d+px-/, '');
}

async function wikiQuery(titles) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    prop: 'imageinfo',
    iiprop: 'url|size',
    titles: titles.map((t) => `File:${t}`).join('|'),
  });

  const res = await fetch(`${API}?${params}`);
  if (!res.ok) {
    throw new Error(`Wiki API HTTP ${res.status}`);
  }
  const data = await res.json();
  const pages = data?.query?.pages ?? {};
  const results = new Map();

  for (const page of Object.values(pages)) {
    if (page.missing !== undefined) {
      continue;
    }
    const info = page.imageinfo?.[0];
    if (!info) {
      continue;
    }
    const fileName = page.title.replace(/^File:/, '').replace(/ /g, '_');
    results.set(fileName, info);
    results.set(page.title.replace(/^File:/, ''), info);
  }
  return results;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Download failed ${res.status} ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
}

function pickUrl(info) {
  return info.url;
}

async function main() {
  const catalogSource = await fs.readFile(CATALOG_PATH, 'utf8');
  const images = [...new Set([...parseCatalogImages(catalogSource), ...EXTRA_IMAGES])];
  await fs.mkdir(OUT_DIR, { recursive: true });

  const attribution = {
    source: 'Super Mario Wiki',
    sourceUrl: WIKI_HOME,
    license: LICENSE,
    licenseUrl: LICENSE_URL,
    note:
      'Game names, characters, and artwork are property of Nintendo. Wiki images are used under Creative Commons Attribution-ShareAlike 4.0.',
    retrievedAt: new Date().toISOString().slice(0, 10),
    assets: [],
  };

  const failures = [];
  const batchSize = 40;

  for (let i = 0; i < images.length; i += batchSize) {
    const batch = images.slice(i, i + batchSize);
    const wikiNames = batch.map(wikiFileName);
    const resolved = await wikiQuery(wikiNames);

    for (const localName of batch) {
      const wikiName = wikiFileName(localName);
      const info =
        resolved.get(wikiName) ??
        resolved.get(wikiName.replace(/_/g, ' ')) ??
        null;

      if (!info) {
        failures.push({ localName, wikiName });
        continue;
      }

      const url = pickUrl(info);
      const dest = path.join(OUT_DIR, localName);

      try {
        await download(url, dest);
        attribution.assets.push({
          file: localName,
          wikiFile: wikiName,
          sourceUrl: info.descriptionurl,
          downloadUrl: url,
          width: info.width,
          height: info.height,
        });
        process.stdout.write(`OK  ${localName}\n`);
      } catch (err) {
        failures.push({ localName, wikiName, error: String(err) });
      }
    }

    await new Promise((r) => setTimeout(r, 250));
  }

  attribution.assets.sort((a, b) => a.file.localeCompare(b.file));
  await fs.writeFile(ATTRIBUTION_PATH, `${JSON.stringify(attribution, null, 2)}\n`);

  if (failures.length) {
    process.stderr.write(`\nFailed (${failures.length}):\n`);
    for (const f of failures) {
      process.stderr.write(`  ${f.localName} -> ${f.wikiName}${f.error ? ` (${f.error})` : ''}\n`);
    }
    process.exitCode = 1;
  }

  process.stdout.write(`\nDownloaded ${attribution.assets.length} assets.\n`);
  process.stdout.write(`Attribution: ${ATTRIBUTION_PATH}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
