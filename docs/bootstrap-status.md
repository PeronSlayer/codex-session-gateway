# Bootstrap status

**Status: Implemented** — the scaffold is installable, compilable and tested
locally. MCP, OAuth, transports, the agent, Codex integration and deployment
remain **Planned**. No operational service was added during toolchain
verification.

## Local verification

The starting checkout was clean on `main` at
`f132f3c6a7c6493309cb51ccee920bc813c04483`. Node 24.20.0 LTS and its bundled npm
11.19.0/Corepack 0.35.0 were installed for the unprivileged user from a verified
official archive. Corepack activated pnpm 10.34.5 without a signature
workaround. See [toolchain installation](toolchain.md) for the SHA-256 and
reproduction steps.

`pnpm install` generated the real lockfile. A subsequent frozen install
succeeded with identical lockfile bytes. Resolved dependencies use public
registry integrity hashes; no private registry URL, credential or absolute host
path was found. Dependency manifests require no installation lifecycle scripts,
so none is permitted. Existing direct dependency versions were retained.

| Command                          | Local result                                      |
| -------------------------------- | ------------------------------------------------- |
| `pnpm install`                   | Passed; generated the lockfile                    |
| `pnpm install --frozen-lockfile` | Passed; lockfile unchanged                        |
| `pnpm lint`                      | Passed                                            |
| `pnpm format:check`              | Passed after applying the configured formatter    |
| `pnpm typecheck`                 | Passed with strict mode unchanged                 |
| `pnpm test`                      | Passed: six real component smoke tests            |
| `pnpm build`                     | Passed; emitted only ignored component dist files |
| `pnpm check:docs`                | Passed                                            |
| `pnpm check:secrets`             | Passed; heuristic worktree and index check        |
| `pnpm audit --audit-level high`  | Passed; no known vulnerabilities returned         |

Direct Node imports of the six compiled ESM modules were checked against their
component names, version 0.0.0 and scaffold status. No test was skipped and no
lint, type or security threshold was weakened. Audit results are a point-in-time
registry check, not a guarantee against unknown vulnerabilities. The initial
formatting errors were corrected with Prettier; the full suite was rerun
afterward.

## GitHub status and cost constraints

GitHub Actions is **configured but not externally verified**. The account
prevents jobs from starting and returned this message:

> The job was not started because your account is locked due to a billing issue.

This restriction does not block local verification. No payment details, spending
limits, paid services, larger/GPU runners or self-hosted runners were
configured. Existing workflows remain in place and use only `ubuntu-latest`; no
artifact upload was added. The complete suite runs locally without GitHub
authentication. CodeQL and dependency review have not been verified as
successful hosted runs.

## Remaining limitations

- The repository is public, but no runtime feature or package release is
  available.
- Private vulnerability and conduct reporting channels still need separate
  confirmation. The Git author email is commit attribution, not a verified
  reporting route. See [SECURITY](../SECURITY.md).
- ESLint 9.39.5 is compatible with this toolchain but deprecated upstream; its
  replacement is tracked as ROADMAP M0.4.

## Structural notes

- `vitest.config.ts` uses `test.projects`, replacing the deprecated
  `vitest.workspace.ts`; see
  [Vitest projects](https://vitest.dev/guide/projects).
- Root `tsconfig.json` supplies build references; `tsconfig.check.json` includes
  source and tests. Build output remains under ignored `dist/` directories.
- `.prettierignore` preserves upstream legal documents and the generated
  lockfile.
- All packages remain private at 0.0.0; no publishing workflow exists.
