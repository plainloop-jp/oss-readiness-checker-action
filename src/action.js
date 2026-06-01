const { spawn } = require("node:child_process");
const { dirname, join } = require("node:path");

const projectPath = process.env.INPUT_PATH || ".";
const npxArgs = ["--yes", "oss-readiness-checker@0.3.0", "check", projectPath];
const isWindows = process.platform === "win32";
const command = isWindows ? process.execPath : "npx";
const args = isWindows
  ? [join(dirname(process.execPath), "node_modules", "npm", "bin", "npx-cli.js"), ...npxArgs]
  : npxArgs;

const child = spawn(command, args, {
  stdio: "inherit",
  shell: false
});

child.once("error", (error) => {
  console.error(`Failed to run OSS Readiness Checker: ${error.message}`);
  process.exitCode = 1;
});

child.once("exit", (code) => {
  process.exitCode = code ?? 1;
});
