// Validate the adjacent summary and write it to the make.fun entry path.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(scriptDir, 'summary.txt'));
const summary = source.toString('utf8');
const characterCount = Array.from(summary).length;

if (characterCount < 1 || characterCount > 2000 || summary.trim().length === 0) {
  console.error('summary.txt must contain 1–2000 characters and not be only whitespace.');
  process.exit(1);
}

const outputPath = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.txt');
mkdirSync(dirname(outputPath), { recursive: true });
const output = source.at(-1) === 0x0a ? source.subarray(0, -1) : source;
writeFileSync(outputPath, output);
