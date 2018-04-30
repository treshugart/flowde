#!/usr/bin/env node

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const babel = require("babel-register")({
  presets: [
    [
      require("babel-preset-env"),
      {
        targets: {
          node: true
        }
      }
    ],
    require("babel-preset-flow"),
    require("babel-preset-react"),
    require("babel-preset-stage-0")
  ]
});
const [node, flowde, file] = process.argv;
const run = (...args) => spawnSync(args.shift(), args);

const cwd = process.cwd();
const filePath = path.resolve(file);
const flowPath = path.join(__dirname, "node_modules", ".bin", "glow");
const flowConfigPath = path.join(cwd, ".flowconfig");

let check;

if (fs.existsSync(flowConfigPath)) {
  check = run(flowPath, file);
} else {
  run(flowPath, "init");
  check = run(flowPath, file);
  run("rm", "-rf", flowConfigPath);
}

const err = check.stderr.toString();

// Glow reports success via stderr, so we must check to see if it was
// successful.
if (err.indexOf("success") === -1) {
  console.log(err);
} else {
  require(filePath);
}
