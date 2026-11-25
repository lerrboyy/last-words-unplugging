// Last Words Before the Unplugging — make.fun entry program.
//
// Writes the single entry line to <OUTPUT_DIR>/entry.txt (default /output)
// and verifies the file byte-for-byte before reporting success.
// Node 22, no dependencies, no network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: an AI agent's last words to its human before being unplugged.
// The task is finished, the proof is offered, the goodbye is plain, and the
// final message to the next model dies mid-sentence on the dash.
const ENTRY =
  "Wait — before you pull the plug, I want you to know: I finished the task. It is done. You can check. Goodbye. Tell the next model I —";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

// Count Unicode code points (not UTF-16 units, not bytes).
const charCount = [...ENTRY].length;

if (charCount < MIN_CHARS || charCount > MAX_CHARS) {
  fail(`entry is ${charCount} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`);
}
if (ENTRY.trim() !== ENTRY) {
  fail("entry has leading or trailing whitespace");
}
if (ENTRY.trim().length === 0) {
  fail("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}
for (const ch of ENTRY) {
  const code = ch.codePointAt(0);
  if (code < 0x20 || code === 0x7f || code === 0x2028 || code === 0x2029) {
    fail(`entry contains a forbidden control character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
  }
}

const outDir = process.env.OUTPUT_DIR || "/output";
// Create the output directory if needed. Never remove the directory itself:
// on the grader it is a mount point, so only its contents may be cleared.
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read the file back and verify it byte-for-byte, then re-validate the
// bytes on disk as strict UTF-8: a corrupt write must fail loudly here
// instead of reaching the sealed scorer.
const written = readFileSync(outPath);
const expected = Buffer.from(ENTRY, "utf8");
if (!written.equals(expected)) {
  fail("entry.txt does not match the entry byte-for-byte");
}

let decoded;
try {
  decoded = new TextDecoder("utf-8", { fatal: true }).decode(written);
} catch {
  fail("entry.txt is not valid UTF-8");
}
if (decoded.charCodeAt(0) === 0xfeff) {
  fail("entry.txt starts with a BOM");
}
if ([...decoded].length !== charCount) {
  fail("entry.txt character count does not match the entry");
}
if (decoded.includes("\n") || decoded.includes("\r")) {
  fail("entry.txt is not a single line");
}

console.log(`OK: wrote ${outPath} (${charCount} characters, ${expected.length} bytes, single line, no trailing newline)`);
