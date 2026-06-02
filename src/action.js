const { spawn } = require("node:child_process");
const { mkdtempSync, rmSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { dirname, join } = require("node:path");

const PACKAGE = "oss-readiness-checker@0.3.0";
const projectPath = process.env.INPUT_PATH || ".";
const isWindows = process.platform === "win32";
const installPath = mkdtempSync(join(tmpdir(), "oss-readiness-checker-action-"));

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: false
    });

    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code ?? 1}.`));
      }
    });
  });
}

async function main() {
  const npmCommand = isWindows ? process.execPath : "npm";
  const npmArgs = isWindows
    ? [join(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js")]
    : [];

  try {
    await run(npmCommand, [
      ...npmArgs,
      "install",
      "--prefix",
      installPath,
      "--no-save",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      PACKAGE
    ]);
    await run(process.execPath, [
      join(installPath, "node_modules", "oss-readiness-checker", "src", "cli.js"),
      "check",
      projectPath
    ]);
  } finally {
    rmSync(installPath, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(`Failed to run OSS Readiness Checker: ${error.message}`);
  process.exitCode = 1;
});
