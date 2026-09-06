# Roadmap

**Status: Planned**. Milestones are review gates, not delivery promises. There
are no scheduled releases or implemented runtime integrations.

## M0 — Complete and verify the scaffold

- M0.1 — Implemented: Node 24.20.0 and pnpm 10.34.5, generated lockfile,
  formatting, local quality suite and dependency audit. See the bootstrap
  verification record.
- M0.2 — Implemented: maintainer Git identity, initial commit and public
  repository under `peronslayer` with the requested settings.
- M0.3 — Planned: establish private vulnerability and conduct reporting
  channels. Hosted workflows are configured but not externally verified because
  account restrictions prevent job startup. Local development does not depend on
  them; no payment, artifact-upload or self-hosted-runner workaround is planned.
- M0.4 — Planned: review a supported ESLint major to replace the deprecated 9.x
  line while preserving the current rules and TypeScript compatibility.

## M1 — Review contracts and security boundaries

- M1.1: Evaluate the MCP SDK and client transport requirements; define a tested
  compatibility matrix for ChatGPT Web, Claude Web and Codex App Server.
- M1.2: Specify host/workspace/thread identity, authorization and target
  selection.
- M1.3: Review OAuth flows, scopes, token validation, agent enrollment,
  revocation and rotation with an explicit threat model.
- M1.4: Turn transport requirements into versioned runtime schemas and test
  vectors; review logging, limits, cancellation, locking and reconnection
  semantics.

## M2 — Experimental local adapter and outbound agent

- M2.1: Validate discovery and access to existing Codex threads without copying
  credentials or bypassing local consent and approval policies.
- M2.2: Implement allowlist enforcement and a local adapter on the repository
  host.
- M2.3: Implement authenticated outbound WSS, bounded queues and explicit run
  state.
- M2.4: Prove exclusive thread mutation and safe behavior after crashes,
  disconnects, retries and external Codex clients; unresolved races must fail
  closed.

## M3 — Experimental authenticated gateway

- M3.1: Implement OAuth and MCP authorization after M1 security review.
- M3.2: Implement the nine scoped tools in `docs/mcp-tools.md` and per-client
  target isolation with integration and negative authorization tests.
- M3.3: Validate both browser connectors using documented client versions and
  account prerequisites. Publish compatibility limits, not assumptions.

## M4 — Operations and optional interface

- M4.1: Select persistence and retention policy; implement migrations and tested
  backup/restore including credential revocation after compromise.
- M4.2: Add redacted audit events, metrics, health semantics and incident
  runbooks.
- M4.3: Evaluate Docker, Caddy and systemd packaging; validate TLS, rollback and
  least-privilege service identities in an isolated environment.
- M4.4: Evaluate a dashboard only after the authenticated workflows stabilize.

## M5 — Release readiness

- M5.1: Complete security review, compatibility testing and operational recovery
  exercises; publish supported versions and deployment guidance.
- M5.2: Review which packages may be published, Apache notices, Changesets
  release workflow and initial Semantic Versioning policy before making any
  release.

## Excluded scope

**Not supported:** a generic MCP shell, arbitrary gateway access to remote
filesystems, credential export, implicit cross-host targeting, and bypassing
Codex's own permissions or approvals.
