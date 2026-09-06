# Threat model

**Status: Planned**. Initial design review, not a completed security assessment.
No runtime mitigations in this table have been implemented or tested.

## Assets, adversaries and trust

Assets include repository integrity, thread contents, execution authority, client
and agent credentials, host identity and audit metadata. Adversaries may control a
client, repository text, a stolen credential, a gateway process or network traffic.
A compromised development host can read what its OS identity can access; this
project is not a sandbox against its own privileged host administrator.

Boundaries separate browser clients from the gateway, the gateway from each agent,
agent policy from Codex execution, and trusted policy from repository/model text.
Assume network messages and stored metadata can be replayed or malformed.

| Threat | Impact | Planned mitigation and evidence required |
| --- | --- | --- |
| Gateway compromise | Route malicious work to reachable hosts; leak authorized responses | Local agent allowlists and operation authorization; test forged/cross-host targets; residual abuse within granted scope remains |
| Stolen agent token | Impersonation and target confusion | Scoped identity, revocation and rotation; test replay and rejection after revocation |
| Malicious OAuth client | Confused deputy, consent abuse or cross-user access | Review grants, redirects, issuer/audience and scopes; negative client isolation tests |
| Prompt injection in repository or transcript | Induce unauthorized tool use or exfiltration | Separate policy from content, limit tools, preserve approvals; adversarial fixtures |
| Directory traversal or symlink escape | Access outside an allowed workspace | Local ID mapping, canonical containment and race-aware checks; traversal/symlink tests |
| Concurrent turns on one thread | Conflicting writes and inconsistent state | Per-thread exclusive ownership, fencing and external-client coordination; crash/reconnect race tests |
| Unintentional secret exposure | Credentials leak through reads or model output | Data minimization, reviewed output policy, redaction and prohibited credential export; synthetic leak tests |
| Sensitive logs and crash traces | Persistent transcript or token disclosure | Structured redacted events, retention/access policy; inspect error and diagnostic paths |
| Replay, reconnect and retries | Duplicate execution or stale authority | Define idempotency boundaries and reject stale ownership; delivery fault tests |
| Agent or client resource exhaustion | Queue, memory or execution saturation | Limits, backpressure, timeouts and bounded retention; load and cancellation tests |
| Revocation or rotation race | Old credentials continue to operate | Define active-run behavior and propagation bounds; revocation-during-run tests |
| Supply-chain compromise | Malicious build dependency or workflow | Exact direct pins, reviewed lockfile, scoped Actions permissions and dependency review; inspect changes before install |

## Design constraints and unresolved questions

Least privilege and deny-by-default decisions apply at both gateway and agent.
The workspace allowlist belongs on the development host and cannot be widened by
remote prompt text. No generic MCP shell or gateway filesystem proxy is supported.

M1 must decide credential lifetime/storage, OAuth flow, run ownership, client
selection scope, limits and log policy. M2 must prove locking with independent
local Codex clients and recovery from ambiguous execution. M4 must test backup
restoration without resurrecting revoked grants. Encryption in transit alone does
not address any compromised endpoint.

Track implementation gates in [ROADMAP](../ROADMAP.md). Report vulnerabilities
privately according to [SECURITY](../SECURITY.md).
