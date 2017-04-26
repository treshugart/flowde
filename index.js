#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const babel = require('babel-register')({
  presets: [
    [require('babel-preset-env'), {
      targets: {
        node: true
      }
    }],
    require('babel-preset-react')
  ]
});
const [ node, flowde, file ] = process.argv;
const run = (...args) => spawnSync(args.shift(), args).output[1].toString();

const cwd = process.cwd();
const filePath = path.resolve(file);
const flowPath = path.join(__dirname, 'node_modules', '.bin', 'flow');
const flowConfigPath = path.join(cwd, '.flowconfig');

let check;

if (fs.existsSync(flowConfigPath)) {
  check = run(flowPath, file);
} else {
  run(flowPath, 'init');
  check = run(flowPath, file);
  run('rm', '-rf', flowConfigPath);
}

if (check.indexOf('No errors!') === -1) {
  throw new Error(check);
}

require(filePath);
