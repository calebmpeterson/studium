import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 25 || (major === 25 && minor < 5)) {
  console.error("Building the standalone CLI requires Node.js 25.5 or newer.");
  process.exit(1);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "dist", "standalone");
const output = path.join(outputDir, process.platform === "win32" ? "kjv.exe" : "kjv");
const temporaryDir = mkdtempSync(path.join(tmpdir(), "kjv-sea-"));

try {
  const main = path.join(temporaryDir, "main.cjs");
  await build({
    entryPoints: [path.join(root, "src/cli/main.ts")],
    bundle: true,
    platform: "node",
    format: "cjs",
    target: "node20",
    define: { __KJV_STANDALONE__: "true" },
    outfile: main,
  });
  mkdirSync(outputDir, { recursive: true });
  const config = path.join(temporaryDir, "sea-config.json");
  writeFileSync(config, JSON.stringify({
    main,
    output,
    disableExperimentalSEAWarning: true,
    assets: { skill: path.join(root, "src/cli/skill/SKILL.md") },
  }));
  execFileSync(process.execPath, ["--build-sea", config], { stdio: "inherit" });
  if (process.platform === "darwin") {
    execFileSync("codesign", ["--sign", "-", output], { stdio: "inherit" });
  }
  console.log(`Standalone CLI built at ${output}`);
} finally {
  rmSync(temporaryDir, { recursive: true, force: true });
}
