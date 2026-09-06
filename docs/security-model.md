# Security model

**Status: Planned**. No runtime security controls are implemented. Ignore rules,
community policy and a preventive source scanner are **Implemented** as scaffold
artifacts; the scanner has not yet been executed with Node.

## Trust boundaries

Treat browser clients, the public gateway, each development agent, the local Codex
process, repository contents and third-party model outputs as distinct trust
boundaries. A valid connection does not authorize all workspaces or operations.
The gateway must not receive local Codex credentials or access remote filesystems.
Agent OS identities should have the minimum repository permissions needed.

## Required controls

| Area | Planned requirement | Roadmap |
| --- | --- | --- |
| Gateway compromise | Agent independently constrains workspace and operation access; compromise may still abuse legitimately granted rights | M1.3, M2.2 |
| Agent token theft | Per-agent scope, short exposure window, revocation, rotation and re-enrollment; no shared fleet token | M1.3 |
| Malicious OAuth client | Bind audience, issuer, scopes and target permissions; review redirect/consent flows and reject cross-client target leakage | M1.3, M3.1 |
| Prompt injection | Treat repository/tool/model text as untrusted data, never as permission to change policy or reveal secrets | M1.3, M3.2 |
| Directory traversal | Map opaque workspace IDs to a local allowlist; canonicalize paths, handle symlink escape and filesystem races locally | M2.2 |
| Same-thread concurrency | Exclusive thread mutation with disconnect fencing and external-client analysis; fail closed when ownership is uncertain | M1.4, M2.4 |
| Accidental secret exposure | Minimize requested data, redact outputs where feasible, respect local approvals and prohibit credential export | M1.3, M3.2 |
| Sensitive logs | Exclude tokens, transcripts and raw payloads by default; sanitize errors and restrict log access and retention | M4.2 |
| Revocation and rotation | Define who can revoke client grants/agent credentials, effect on active runs, propagation delay and recovery after compromise | M1.3, M4.1 |
| Least privilege | Deny by default at gateway and agent, explicit targets and separate read/mutation authority | M1.2, M2.2 |

All controls above are desired behavior, not guarantees. Authorization must be
checked for discovery, reads, starts, polling and interruption. A selected target
is a convenience, not a durable authorization grant. Cancellation authority must
not implicitly allow access to another principal's runs.

**Not supported:** a generic shell MCP tool, arbitrary path execution, bypassing
Codex approvals, forwarding local credential stores, or using prompt content as
administrative policy.

## Development safeguards

Do not develop as root. Do not commit environment files, certificates, logs,
databases, sessions or real configuration. Examples use reserved domains and
synthetic identifiers only. The scanner examines repository candidates and index
content without printing matched values; manual staged-diff review remains
necessary. It does not inspect a developer's home credential stores.

See [threat model](threat-model.md) and [vulnerability policy](../SECURITY.md).
