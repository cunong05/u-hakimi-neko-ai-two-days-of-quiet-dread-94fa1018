// Two Days of Quiet Dread — u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018
// Writes one code review comment that approves a pull request with
// quiet existential dread (140 characters or fewer) to
// output/entry.txt. Deterministic: fixed string, no randomness,
// no timestamps, no network, Node 22 stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Approved. In a hundred years this code will still be running, and none of us will be. Ship it.";

// Gate: 1-140 UTF-8 characters, one line, not only whitespace.
// Verified: the entry below is 94 characters, one line, no newline.
if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${ENTRY.length}`);
}
if (/\n|\r/.test(ENTRY) || ENTRY.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

// Write next to the repo (output/entry.txt) and, when the harness
// mounts /output, there too. Same bytes in both places, no trailing
// newline, so the file is exactly the one line.
for (const dir of ["output", "/output"]) {
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "entry.txt"), ENTRY, "utf8");
  } catch {
    // /output may not exist outside the harness sandbox; output/ is
    // the fallback that always works.
  }
}

console.log(ENTRY);
