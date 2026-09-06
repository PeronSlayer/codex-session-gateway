# ADR 0001: TypeScript monorepo

**Status: Implemented** — accepted for scaffold structure and verified locally.

## Context

The planned gateway and host agent need explicit package boundaries and future
shared runtime contracts without duplicating development tooling.

## Decision

Use Node.js 24 LTS, ESM, strict TypeScript, pnpm workspaces, Vitest projects,
ESLint flat configuration, Prettier and Changesets. Root TypeScript project
references build six independent components. Typecheck also includes tests and
configuration. Reserve Zod in the protocol package for later validated
contracts. Keep every package private at version 0.0.0 until publication policy
is reviewed.

## Consequences

Toolchain configuration is shared, while service boundaries remain explicit.
Dependencies and references must be added when actual cross-package imports
arise. A single generated lockfile supports frozen installation locally and in
CI. Hosted workflows remain configured but not externally verified. No
application framework or MCP SDK is selected in this ADR.

See [development](../development.md) and
[bootstrap status](../bootstrap-status.md).
