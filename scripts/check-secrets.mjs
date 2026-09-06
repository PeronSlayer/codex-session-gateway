import { execFileSync } from 'node:child_process';
import { lstatSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = realpathSync(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
const git = (...args) => execFileSync('git', ['-C', root, ...args]);
const failures = new Set();
const report = (path, reason) => failures.add(`${JSON.stringify(path)}: ${reason}`);
const paths = new Set(
  git('ls-files', '--cached', '--others', '--exclude-standard', '-z')
    .toString('utf8')
    .split('\0')
    .filter(Boolean),
);

function forbidden(path) {
  if (path === '.env.example') return false;
  return (
    /(^|\/)\.env(?:\.|$)/i.test(path) ||
    /\.(?:pem|key|crt|p12|pfx|sqlite3?|db|log)(?:$|-)/i.test(path) ||
    /(^|\/)(?:\.codex|\.ssh|sessions|secrets|logs)(?:\/|$)/i.test(path) ||
    /(^|\/)(?:auth|credentials)(?:\.[^/]*)?$/i.test(path) ||
    /(^|\/)id_(?:rsa|ed25519|ecdsa)(?:\.|$)/i.test(path) ||
    /^config\/.*\.local\./i.test(path)
  );
}

const patterns = [
  ['private key', /-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----/],
  ['GitHub credential', /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/],
  ['cloud access key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ['API credential', /\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{20,}\b/],
  ['Slack credential', /\bxox[baprs]-[A-Za-z0-9-]{16,}\b/],
  ['JWT-like credential', /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/],
  ['authorization value', /\b(?:Bearer|Basic)\s+[A-Za-z0-9_+/.=-]{16,}/i],
  ['URL credentials', /\b[a-z][a-z0-9+.-]*:\/\/[^\s/@:]+:[^\s/@]+@/i],
];

function inspect(path, bytes, source) {
  if (bytes.includes(0)) {
    report(path, `${source}: binary content requires explicit review`);
    return;
  }
  const content = bytes.toString('utf8');
  for (const [label, pattern] of patterns) {
    if (pattern.test(content)) report(path, `${source}: possible ${label}`);
  }
  const assignments = content.matchAll(
    /\b(?:api[_-]?key|access[_-]?token|refresh[_-]?token|agent[_-]?token|client[_-]?secret|password)\b["']?\s*[:=]\s*["']?([^\s"',;#}]+)/gi,
  );
  for (const match of assignments) {
    if (!/^(?:FAKE_TOKEN_FOR_EXAMPLE_ONLY|PLACEHOLDER|CHANGE_ME)$/i.test(match[1])) {
      report(path, `${source}: possible credential assignment`);
    }
  }
}

for (const path of paths) {
  if (forbidden(path)) {
    report(path, 'sensitive path must not be a Git candidate');
    continue;
  }
  const absolute = resolve(root, path);
  const inside = relative(root, absolute);
  if (isAbsolute(inside) || inside === '..' || inside.startsWith(`..${sep}`)) {
    report(path, 'path escapes repository');
    continue;
  }
  let readable = true;
  let current = root;
  try {
    for (const part of inside.split(sep)) {
      current = resolve(current, part);
      if (lstatSync(current).isSymbolicLink()) {
        report(path, 'symlinks are not allowed');
        readable = false;
        break;
      }
    }
    if (readable && !lstatSync(absolute).isFile()) {
      report(path, 'only regular source files are allowed');
      readable = false;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    readable = false;
  }
  if (readable) inspect(path, readFileSync(absolute), 'worktree');
}

// Editing the worktree does not remove a secret from an existing index entry.
const entries = git('ls-files', '--stage', '-z')
  .toString('utf8')
  .split('\0')
  .filter(Boolean);
for (const entry of entries) {
  const tab = entry.indexOf('\t');
  const [mode, object, stage] = entry.slice(0, tab).split(' ');
  const path = entry.slice(tab + 1);
  if (stage !== '0' || !['100644', '100755'].includes(mode)) {
    report(path, 'unmerged or non-regular index entry');
    continue;
  }
  if (forbidden(path)) {
    report(path, 'sensitive path is staged');
    continue;
  }
  inspect(path, git('cat-file', 'blob', object), 'index');
}

if (failures.size) {
  for (const failure of failures) console.error(failure);
  console.error('Preventive secret check failed. Matched values are never printed.');
  process.exitCode = 1;
} else {
  console.log(`Preventive secret check passed for ${paths.size} Git candidates and the index.`);
  console.log('Heuristic only: manually review the staged diff before committing.');
}
