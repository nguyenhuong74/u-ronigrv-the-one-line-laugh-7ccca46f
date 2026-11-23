// The One-Line Laugh — entry for u-ronigrv-the-one-line-laugh-7ccca46f
// One funny line, hard-coded and deterministic: no randomness, no network,
// no reading other files at runtime.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My bank app flagged unusual activity on my account: I saved money.";

// The gate requires UTF-8 text of 1–200 characters, not only whitespace,
// and the judge requires a single sentence that stands alone.
function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`Line must be 1–200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("Line must not be only whitespace");
  }
  if (!line.endsWith(".")) {
    throw new Error("Line must be a single sentence ending with a period");
  }
}

function outputDir(): string {
  return (
    process.env.MAKEFUN_OUTPUT_DIR ??
    process.env.MAKEFUN_BOT_DIR ??
    "/output"
  );
}

function main(): void {
  validate(LINE);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "entry.txt");
  writeFileSync(file, LINE, "utf8");
  console.log(`Wrote ${LINE.length} characters to ${file}`);
}

main();
