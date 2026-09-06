# Development

**Status: Implemented** — configuration and source files exist. Toolchain execution
is unverified until [bootstrap completion](bootstrap-status.md).

## Prerequisites and commands

Use Git, Node.js 24 LTS and pnpm 10.34.5 as an unprivileged user. The initial
lockfile is pending; follow the bootstrap record once before normal installation.
Do not install or run Node, pnpm or Git using sudo for development.

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
pnpm check:docs
pnpm check:secrets
```

`pnpm format` applies formatting before the check. ESLint uses flat configuration.
Typecheck includes source, tests and Vitest configuration; build uses a root
TypeScript solution with project references and emits source modules/declarations
only. There are no inter-package imports yet, so no speculative dependency graph
is encoded. Add package dependencies and references together when imports arise.

The six smoke tests verify component names, scaffold status and version. They do
not establish connector compatibility or runtime security. `vitest.config.ts`
uses projects instead of the deprecated workspace file. The dashboard has no
source, build script, framework or test placeholder.

The documentation checker validates required documentation, explicit feature
status, local Markdown file links and local anchors. It does not request external
URLs. The preventive secret checker checks Git candidates and staged content for
forbidden paths and common credential patterns without printing matched values.
It is heuristic and requires a manual staged diff review. Neither checker accesses
home credential stores or follows repository symlinks.

## Dependencies and versioning

Direct dependency versions and pnpm are pinned to versions verified as available
in the public npm registry. TypeScript 5.9 is chosen within typescript-eslint's
supported peer range. Zod is declared only in `protocol` for the explicitly
planned runtime contracts; there are no schemas yet. No application framework,
MCP SDK, transport client or database dependency is included.

Use `pnpm changeset` for changes affecting future package consumers, and reference
a ROADMAP identifier in design changes. Changesets is configured to version
private packages without publishing or tagging them. `pnpm version:packages` is
for a reviewed future versioning change, not part of normal verification. There
is no release workflow or registry publication authorization.

See [CONTRIBUTING](../CONTRIBUTING.md) for branch and review policy.
