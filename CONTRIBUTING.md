# Contributing

**Status: Implemented** — contribution policy for an early scaffold.

Read [README](README.md), [ROADMAP](ROADMAP.md) and
[Code of Conduct](CODE_OF_CONDUCT.md) before proposing changes. Contributions
are provided under Apache-2.0. No contributor license agreement is currently
required.

## Setup

Use an unprivileged checkout, Node 24.20.0 LTS and pnpm 10.34.5. Follow the
[toolchain guide](docs/toolchain.md), then use `pnpm install --frozen-lockfile`
with the committed lockfile. Never copy credentials, sessions or real
configuration into the repository. Dependency lifecycle scripts require explicit
review; none is currently authorized.

## Branch workflow

Create a focused branch from current `main`, for example `docs/target-selection`
or `chore/tooling`. Reference a ROADMAP identifier or an actual issue. Keep
changes within the agreed milestone. Open a pull request describing the problem,
behavior, validation and any security implications; maintainers review before
merging. Do not force push `main` or overwrite an existing repository.

Use Conventional Commits, for example `docs: clarify target authorization` or
`chore: update development tooling`. Use `feat:` and `fix:` when applicable to
implemented behavior, and document breaking changes explicitly. Use
`pnpm changeset` when a change affects future package consumers.

## Required checks

Run all of the following and report any check you could not execute:

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
pnpm check:docs
pnpm check:secrets
pnpm audit --audit-level high
```

Use `pnpm format` to apply formatting, then inspect the diff. Add meaningful
tests when behavior changes. Do not manufacture endpoint behavior merely to make
a smoke test pass. Keep feature status explicit and future tasks tied to ROADMAP
identifiers; generic deferred-work comments are not accepted.

Every required check runs locally. GitHub Actions is configured but not
externally verified because the account prevents job startup; this does not
block local validation. Keep workflows on `ubuntu-latest`; do not add artifact
uploads, paid features or self-hosted runners to work around the account
restriction.

Before committing, inspect `git status --short` and `git diff --cached`; ignore
rules and the heuristic scanner do not replace manual review. Do not include
`.env`, databases, logs, certificates, sessions, secrets or real configuration.
Report vulnerabilities privately through [SECURITY](SECURITY.md).
