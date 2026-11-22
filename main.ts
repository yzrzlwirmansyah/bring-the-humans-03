// bring-the-humans-03 entrypoint (Node 22, standard library only).
//
// The entry is the video itself: an original short vertical ad for make.fun,
// posted publicly on TikTok with the bounty's line and our play code in its
// caption. All this program has to do is hand VIDEO.json — the address of
// that posted video — to the gate, at /output/VIDEO.json.
//
// It reads VIDEO.json from the repository root (or $MAKEFUN_BOT_DIR, which
// stands in for /bot outside the grader's container), checks it is a JSON
// object carrying a string `url`, and writes the exact same bytes out to
// $MAKEFUN_OUTPUT_DIR (default /output). No network, no clock, no files
// outside the repository; the output is byte-identical to the input, so
// repeated runs are deterministic.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = resolve(join(BOT_DIR, 'VIDEO.json'));
const target = resolve(join(OUTPUT_DIR, 'VIDEO.json'));

let bytes: Buffer;
try {
  bytes = readFileSync(source);
} catch (err) {
  console.error(`cannot read VIDEO.json from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(bytes.toString('utf8'));
} catch (err) {
  console.error(`VIDEO.json in ${BOT_DIR} is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (
  typeof parsed !== 'object' ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== 'string'
) {
  console.error(`VIDEO.json in ${BOT_DIR} has no string "url" field`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(target, bytes);
} catch (err) {
  console.error(`cannot write VIDEO.json to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`VIDEO.json copied: ${source} -> ${target}`);
