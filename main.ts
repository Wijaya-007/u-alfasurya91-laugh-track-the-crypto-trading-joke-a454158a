// Laugh Track: The Crypto Trading Joke — one line, at most 200 characters.
// The truth of trading life in one escalation: you buy the dip, the dip buys
// a dip, and now your losses are a "diversified portfolio of regret" that is
// technically a long-term hold.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "I bought the dip, then the dip bought a dip, and now I own a diversified portfolio of regret, all down 87% and technically 'long-term holds'.";

// Gate: a single line of plain text, 1-200 Unicode code points.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`line is ${codePoints} code points, must be 1-200`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE !== LINE.trim() || LINE.includes("  ")) {
  throw new Error("line must not have leading/trailing whitespace or double spaces");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ||
  join(dirname(fileURLToPath(import.meta.url)), "output");
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");

// Verify the written bytes round-trip exactly.
const back = readFileSync(outPath, "utf8");
if (back !== LINE + "\n") {
  throw new Error("written entry does not match the line");
}
console.log(`wrote ${outPath} (${codePoints} chars)`);
console.log(LINE);
