/**
 * AUDIT: college image sources
 *
 * WHY
 * ---
 * College photos are supposed to be served from Cloudinary
 * (https://res.cloudinary.com/<cloud>/...). Any college image that is still a
 * raw import (`src/assets/*.jpg`) or a local `/public` path ships its original
 * bytes through the deployment and through the next/image optimizer, which is
 * slower and costs origin transfer on every device-size variant.
 *
 * This script is READ ONLY. It prints a per-college table of every `image`
 * value it can find in the college data set and classifies it as:
 *   cloudinary | local-asset | public-path | remote | missing | other
 *
 * Usage:
 *   node scripts/audit-college-images.mjs
 *   node scripts/audit-college-images.mjs --json
 */

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const AS_JSON = process.argv.includes("--json");

/** Where college data lives. Data files hold the images; app/ holds the consumers. */
const SCAN_DIRS = ["src/data-college", "app"];

function classify(value) {
  if (value === null || value === undefined) return "missing";
  const v = String(value).trim();
  if (!v) return "missing";
  if (v.includes("res.cloudinary.com")) return "cloudinary";
  // webpack/next static import object -> { src: '/_next/static/media/...' }
  if (v.startsWith("/_next/static/media/")) return "local-asset";
  // a literal path into public/
  if (v.startsWith("/")) return "public-path";
  if (/^https?:\/\//i.test(v)) return "remote";
  return "other";
}

async function* walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    // NOTE: the file branch must be `yield full`, NOT `yield* full` -- `yield*`
    // delegates to the iterable, and a string is iterable per CHARACTER, which
    // silently walked one letter at a time instead of per file.
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile()) yield full;
  }
}

/**
 * Extract `image` values from a data file.
 *
 * Data is plain JS object literals, so we look for:
 *   id: 'gp-ranchi', ... image: 'https://...'
 * and `image: toSrc(someImg)` style references resolved via the import map.
 */
function extractImages(source, file) {
  const rows = [];
  // Resolve which imported symbol each `toSrc(...)` reference maps back to.
  const importSymbols = new Map();
  for (const m of source.matchAll(/import\s+\{?\s*([\w,\s]+?)\s*\}?\s+from\s+['"]([^'"]+)['"]/g)) {
    for (const sym of m[1].split(",")) {
      const name = sym.trim();
      if (name) importSymbols.set(name, m[2]);
    }
  }

  // Track the nearest preceding `id: '...'` / `'slug': {` so each image is attributed.
  let currentId = null;
  const lines = source.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const idMatch =
      line.match(/^\s*id:\s*['"]([^'"]+)['"]/) ||
      line.match(/^\s*['"]([\w-]+)['"]:\s*\{/);
    if (idMatch) currentId = idMatch[1];

    // Only accept a real image value: a string literal, or a reference to an
    // imported asset. This deliberately skips lines like
    // `imageUrl: imgSrc.startsWith('http') ? ...` which are code, not data.
    const imgMatch = line.match(/^\s*image:\s*(.+?),?\s*$/);
    if (!imgMatch) continue;

    const raw = imgMatch[1].replace(/,$/, "").trim();

    // Normalise `toSrc(X)` down to X so both spellings classify identically.
    const inner = raw.match(/^toSrc\(\s*([\w$.]+)\s*\)$/)?.[1] ?? raw;

    let value = null;
    let kind = null;
    let resolvedFrom = null;

    if (importSymbols.has(inner)) {
      // Raw webpack/next static image import -> shipped from the bundle.
      const imported = importSymbols.get(inner);
      resolvedFrom = `${imported}  (imported as \`${inner}\`)`;
      value = `local-import:${imported}`;
      kind = "local-asset";
    } else if (/^[A-Za-z_$][\w$]*(\.\w+)+$/.test(inner)) {
      // `d.image` / `college.image` -- derived from another record, so it is not
      // an independent source; it inherits whatever that record resolves to.
      value = inner;
      kind = "inherited";
      resolvedFrom = `inherited from \`${inner}\``;
    } else if (/^[A-Za-z_$][\w$]*$/.test(inner)) {
      // A bare local variable (e.g. the computed `imageUrl` used inside the
      // JSON-LD schema builders). Code, not data -> not an audit finding.
      continue;
    } else {
      const literal = inner.match(/^['"]([^'"]*)['"]$/);
      if (!literal) continue; // not a static image value we can classify
      value = literal[1];
      kind = classify(value);
    }

    rows.push({
      file: path.relative(ROOT, file).replace(/\\/g, "/"),
      line: i + 1,
      id: currentId,
      kind,
      value,
      resolvedFrom,
    });
  }
  return rows;
}

/**
 * Audit the `ASSET_IMAGE_OVERRIDES` maps that sit in the UI/metadata layer.
 * These run AFTER the data layer, so an override pointing at a local file
 * replaces a perfectly good Cloudinary URL at render time.
 */
function extractOverrides(source, file) {
  const importSymbols = new Map();
  for (const m of source.matchAll(/import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/g)) {
    for (const sym of m[1].split(",")) {
      const name = sym.trim();
      if (name) importSymbols.set(name, m[2]);
    }
  }

  const out = [];
  const re = /ASSET_IMAGE_OVERRIDES\s*=\s*\{([\s\S]*?)\n\}/;
  const block = source.match(re);
  if (!block) return out;

  const startLine = source.slice(0, block.index).split(/\r?\n/).length;
  block[1].split(/\r?\n/).forEach((line, idx) => {
    const m = line.match(/^\s*['"]([\w-]+)['"]:\s*toSrc\(\s*(\w+)\s*\)/);
    if (!m) return;
    const [, id, symbol] = m;
    const imported = importSymbols.get(symbol);
    out.push({
      file: path.relative(ROOT, file).replace(/\\/g, "/"),
      line: startLine + idx,
      id,
      kind: imported ? "local-asset" : "unknown",
      value: imported ? `local-import:${imported}` : `unresolved:${symbol}`,
      resolvedFrom: `ASSET_IMAGE_OVERRIDES -> ${imported || symbol}`,
    });
  });
  return out;
}

const all = [];
const overrides = [];

for (const dir of SCAN_DIRS) {
  for await (const file of walk(path.join(ROOT, dir))) {
    if (!/\.(js|ts|jsx|tsx)$/.test(file)) continue;
    if (/node_modules|\.next/.test(file)) continue;
    const source = await fs.readFile(file, "utf8");
    all.push(...extractImages(source, file));
    overrides.push(...extractOverrides(source, file));
  }
}

const BAD = ["local-asset", "public-path", "remote", "other", "missing", "reference", "unknown"];
const counts = all.reduce((acc, r) => ((acc[r.kind] = (acc[r.kind] || 0) + 1), acc), {});

/** Per-college rollup: which colleges are fully Cloudinary vs not. */
const byCollege = new Map();
for (const r of all) {
  if (!r.id) continue;
  if (!byCollege.has(r.id)) byCollege.set(r.id, { id: r.id, kinds: new Set(), refs: [] });
  const rec = byCollege.get(r.id);
  rec.kinds.add(r.kind);
  rec.refs.push(r);
}
for (const r of overrides) {
  if (!byCollege.has(r.id)) byCollege.set(r.id, { id: r.id, kinds: new Set(), refs: [] });
  const rec = byCollege.get(r.id);
  rec.kinds.add("OVERRIDE:" + r.kind);
  rec.refs.push(r);
}

/**
 * Exit code contract (lint-style, so this is CI-usable):
 *   0 = every college image resolves to Cloudinary
 *   1 = at least one raw/remote/local-asset college image was found
 */
const hasFindings = all.some((r) => BAD.includes(r.kind)) || overrides.length > 0;
process.exitCode = hasFindings ? 1 : 0;

if (AS_JSON) {
  console.log(JSON.stringify({ counts, rows: all, overrides, hasFindings }, null, 2));
} else {
  console.log("COLLEGE IMAGE SOURCE AUDIT");
  console.log("===========================\n");
  console.log("Data-layer image values by source:");
  for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    const flag = k === "cloudinary" ? "  ok" : "  !!";
    console.log(`  ${flag}  ${String(v).padStart(4)}  ${k}`);
  }

  const problem = all.filter((r) => BAD.includes(r.kind));

  console.log("\nPER-COLLEGE ROLLUP");
  console.log("-------------------");
  const clean = [];
  const dirty = [];
  for (const rec of [...byCollege.values()].sort((a, b) => a.id.localeCompare(b.id))) {
    const kinds = [...rec.kinds];
    const isClean = kinds.every((k) => k === "cloudinary" || k === "inherited");
    const first = rec.refs.find((r) => r.kind !== "inherited") || rec.refs[0];
    (isClean ? clean : dirty).push(
      `  ${isClean ? "ok" : "!!"}  ${rec.id.padEnd(26)} ${kinds.join(", ").padEnd(42)} ${first.file}`
    );
  }
  console.log(`\n  Cloudinary-clean (${clean.length}):`);
  for (const l of clean) console.log(l);
  console.log(`\n  NOT clean (${dirty.length}):`);
  for (const l of dirty) console.log(l);

  if (overrides.length) {
    console.log(`\nASSET_IMAGE_OVERRIDES (${overrides.length}) - these replace the data-layer image at render time:`);
    for (const r of overrides) {
      console.log(`  [${r.kind.padEnd(11)}] ${(r.id || "?").padEnd(26)} ${r.file}:${r.line}  ${r.resolvedFrom}`);
    }
  }

  if (!problem.length && !overrides.length) {
    console.log("\nOK: every college image resolves to Cloudinary.");
  } else {
    if (problem.length) {
      console.log(`\nNON-CLOUDINARY COLLEGE IMAGES (${problem.length} of ${all.length}):`);
      for (const r of problem) {
        console.log(
          `  [${r.kind.padEnd(11)}] ${(r.id || "?").padEnd(26)} ${r.file}:${r.line}  ${r.resolvedFrom || r.value}`
        );
      }
    }
  }
  console.log("");
}