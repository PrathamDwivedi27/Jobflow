#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function resolvePlugin() {
  // Prefer the local package binary in node_modules/.bin
  const local = path.join(
    __dirname,
    '..',
    'node_modules',
    '.bin',
    `protoc-gen-ts_proto${process.platform === 'win32' ? '.cmd' : ''}`,
  );
  if (fs.existsSync(local)) return local;
  // fallback to assuming it's on PATH
  return 'protoc-gen-ts_proto';
}

const plugin = resolvePlugin();

const protoDir = path.join(process.cwd(), 'proto');
if (!fs.existsSync(protoDir)) {
  console.error('proto directory not found:', protoDir);
  process.exit(1);
}

const protos = fs
  .readdirSync(protoDir)
  .filter((f) => f.endsWith('.proto'))
  .map((f) => path.join('proto', f));

if (protos.length === 0) {
  console.error('No .proto files found in', protoDir);
  process.exit(1);
}

const args = [
  `--plugin=${plugin}`,
  `--ts_proto_out=./types`,
  `--ts_proto_opt=nestJs=true`,
  ...protos,
];

const res = spawnSync('protoc', args, { stdio: 'inherit' });
if (res.error) {
  console.error(res.error.message || res.error);
  process.exit(res.status || 1);
}
process.exit(res.status);
