# ADR 0002: Outbound node agents

**Status: Planned** — accepted architectural direction; transport unimplemented.

## Context

Development hosts may be behind NAT or managed access controls. Repositories and
local Codex execution authority should remain on their existing host.

## Decision

Plan node agents that initiate authenticated WSS connections exclusively
outbound to a public HTTPS gateway. Route authorized host/workspace/thread
operations over that established connection to a local Codex App Server adapter.
Enforce workspace allowlists locally and require exclusive mutation per thread.
The gateway has no direct remote filesystem access and does not use SSH as its
agent transport.

## Consequences and open questions

This direction avoids requiring public inbound agent ports but creates
reconnect, revocation, backpressure and stale-lock problems. M1.4/M2.4 must
resolve these before implementation. It does not define a message protocol or
prove compatibility with existing Codex threads or independent local clients.

See [protocol requirements](../gateway-agent-protocol.md) and
[threat model](../threat-model.md).
