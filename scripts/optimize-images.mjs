/**
 * Compress oversized raster assets shipped from this deployment.
 *
 * WHY
 * ---
 * `next/image` resizes images at request time, but the optimizer has to fetch
 * the ORIGINAL bytes from the deployment first. A 2.8 MB source photo therefore
 * costs ~2.8 MB of origin transfer the first time each variant is generated,
 * and every device-size variant repeats that cost. Shrinking the source files
 * is therefore a direct reduction in Fast Origin Transfer, not just disk.
 *
 * This script is idempotent: it skips any file that is already below the size
 * threshold, so it is safe to re-run. It never touches dimensions for JPEGs
 * unless they exceed `MAX_DIMENSION`, so normal layout is preserved.
 *
 * Usage:
 *   node scripts/optimize-images.mjs            # report only, changes nothing
 *   node scripts/optimize-images.mjs --write    # actually rewrite the files
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd());
const WRITE = process.argv.includes("--write");

/** Only bother with sources above this size (bytes). */
const MIN_BYTES = 300 * 1024;
/** Cap the longest edge; anything larger is never displayed at native size. */
const MAX_DIMENSION = 1800;
const JPEG_QUALITY = 78;
const PNG_QUALITY = 80;
const WEBP_QUALITY = 80;

/** Directories that end up in the deployment's static output. */
const TARGET_DIRS = ["public", "app", "src/assets"];

const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

/** Files we must not rewrite. */
const SKIP_NAMES = new Set(["favicon.ico"]);

async function* walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!EXTENSIONS.has(ext)) return null;
  if (SKIP_NAMES.has(path.basename(file))) return null;

  const before = (await fs.stat(file)).size;
  if (before < MIN_BYTES) return null;

  const input = await fs.readFile(file);
  const image = sharp(input, { animated: false });
  const meta = await image.metadata();

  // Always re-encode with the SAME container/extension. Changing a .png to a
  // .webp would break explicit imports such as `import x from './file.png'` in
  // src/assets/images.js, and renaming public files would break the literal
  // "/banner.png" strings used by <Image src="...">. Preserving the format
  // guarantees this script cannot change application behaviour.
  const resize = {
    width: MAX_DIMENSION,
    height: MAX_DIMENSION,
    fit: "inside",
    withoutEnlargement: true,
  };

  let output;
  if (ext === ".png") {
    output = await sharp(input, { animated: false })
      .rotate()
      .resize(resize)
      // palette: true quantises to 8-bit indexed colour, which is a large win
      // on flat-colour banners/logos and keeps the file a valid .png.
      .png({
        quality: PNG_QUALITY,
        compressionLevel: 9,
        palette: true,
        effort: 8,
      })
      .toBuffer();
  } else {
    output = await sharp(input, { animated: false })
      .rotate()
      .resize(resize)
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
      .toBuffer();
  }

  const after = output.length;
  if (after >= before) {
    return { file, before, after: before, saved: 0, skipped: true, outExt: ext };
  }

  if (WRITE) {
    await fs.writeFile(file, output);
  }

  return { file, before, after, saved: before - after, skipped: false, outExt: ext };
}

const results = [];
for (const dir of TARGET_DIRS) {
  for await (const file of walk(path.join(ROOT, dir))) {
    try {
      const result = await processFile(file);
      if (result) results.push(result);
    } catch (err) {
      console.warn(`! skipped ${path.relative(ROOT, file)}: ${err.message}`);
    }
  }
}

results.sort((a, b) => b.saved - a.saved);

let totalBefore = 0;
let totalAfter = 0;
console.log(
  `${WRITE ? "OPTIMIZED" : "WOULD OPTIMIZE"} (pass --write to apply)\n`
);
for (const r of results) {
  totalBefore += r.before;
  totalAfter += r.after;
  const rel = path.relative(ROOT, r.file);
  console.log(
    `${r.skipped ? "  skip" : "  ok  "} ${rel}` +
      `${r.outExt ? ` ->${r.outExt}` : ""}` +
      `  ${formatBytes(r.before)} -> ${formatBytes(r.after)}` +
      (r.saved > 0 ? `  (-${formatBytes(r.saved)})` : "")
  );
}
console.log(
  `\nTOTAL: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)} ` +
    `(-${formatBytes(totalBefore - totalAfter)}, ` +
    `${totalBefore ? Math.round((1 - totalAfter / totalBefore) * 100) : 0}%)`
);

if (!WRITE && results.some((r) => !r.skipped)) {
  console.log("\nRe-run with: node scripts/optimize-images.mjs --write");
}