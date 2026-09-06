import { execFileSync } from 'node:child_process';
import { lstatSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = realpathSync(
  resolve(dirname(fileURLToPath(import.meta.url)), '..'),
);
const required = [
  'README.md',
  'ROADMAP.md',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'SUPPORT.md',
  'CODE_OF_CONDUCT.md',
  'CHANGELOG.md',
  '.changeset/README.md',
  'apps/dashboard/README.md',
  'deploy/caddy/README.md',
  'deploy/docker/README.md',
  'deploy/systemd/README.md',
  ...[
    'architecture',
    'authentication',
    'backup-recovery',
    'bootstrap-status',
    'chatgpt-connector',
    'claude-connector',
    'configuration',
    'development',
    'gateway-agent-protocol',
    'gateway-installation',
    'getting-started',
    'mcp-tools',
    'monitoring',
    'node-agent-installation',
    'operations',
    'security-model',
    'threat-model',
    'troubleshooting',
    'vscode-remote-ssh',
    'adr/0001-typescript-monorepo',
    'adr/0002-outbound-node-agents',
  ].map((name) => `docs/${name}.md`),
];
const failures = new Set();
const fail = (path, reason) =>
  failures.add(`${JSON.stringify(path)}: ${reason}`);
const paths = new Set(
  execFileSync('git', [
    '-C',
    root,
    'ls-files',
    '--cached',
    '--others',
    '--exclude-standard',
    '-z',
  ])
    .toString('utf8')
    .split('\0')
    .filter((path) => path.endsWith('.md')),
);

function checkedPath(absolute) {
  const inside = relative(root, absolute);
  if (isAbsolute(inside) || inside === '..' || inside.startsWith(`..${sep}`)) {
    throw new Error('link escapes repository');
  }
  let current = root;
  for (const part of inside.split(sep).filter(Boolean)) {
    current = resolve(current, part);
    if (lstatSync(current).isSymbolicLink()) {
      throw new Error('symlink links are not supported');
    }
  }
  return absolute;
}

function anchors(content) {
  const result = new Set();
  const counts = new Map();
  const withoutCode = content.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '');
  for (const match of withoutCode.matchAll(/^#{1,6}\s+(.+?)\s*#*$/gm)) {
    const base = match[1]
      .toLowerCase()
      .replace(/[^\p{L}\p{N}_\-\s]/gu, '')
      .replace(/\s/g, '-');
    const count = counts.get(base) ?? 0;
    result.add(count ? `${base}-${count}` : base);
    counts.set(base, count + 1);
  }
  return result;
}

for (const path of required) {
  if (!paths.has(path)) fail(path, 'required documentation is missing');
}
for (const path of paths) {
  let content;
  try {
    content = readFileSync(checkedPath(resolve(root, path)), 'utf8');
  } catch {
    fail(path, 'documentation must exist as a regular local file');
    continue;
  }
  if (!content.trim()) fail(path, 'empty documentation');
  if (
    path.startsWith('docs/') &&
    !/\*\*Status: (Implemented|Experimental|Planned|Not supported)\*\*/.test(
      content,
    )
  ) {
    fail(path, 'missing explicit feature status');
  }
  const prose = content.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '');
  const links = [
    ...Array.from(
      prose.matchAll(/!?\[[^\]\n]*\]\(([^)\n]+)\)/g),
      (match) => match[1],
    ),
    ...Array.from(
      prose.matchAll(/^\s*\[[^\]]+\]:\s*(\S+)/gm),
      (match) => match[1],
    ),
  ];
  for (const raw of links) {
    const target = raw.startsWith('<')
      ? raw.slice(1, raw.indexOf('>'))
      : raw.split(/\s+["']/)[0];
    if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('//'))
      continue;
    try {
      const [file, hash] = target.split('#', 2);
      const absolute = checkedPath(
        file
          ? resolve(root, dirname(path), decodeURIComponent(file))
          : resolve(root, path),
      );
      const stat = lstatSync(absolute);
      if (!stat.isFile() && !stat.isDirectory())
        throw new Error('not a regular target');
      if (
        hash &&
        (!stat.isFile() ||
          !anchors(readFileSync(absolute, 'utf8')).has(
            decodeURIComponent(hash),
          ))
      ) {
        throw new Error('missing local anchor');
      }
    } catch {
      fail(path, `invalid local link ${JSON.stringify(target)}`);
    }
  }
}

if (failures.size) {
  for (const failure of failures) console.error(failure);
  process.exitCode = 1;
} else {
  console.log(
    `Documentation check passed for ${paths.size} Markdown files (external URLs not checked).`,
  );
}
