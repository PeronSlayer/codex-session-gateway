# Node agent installation

**Status: Planned**. No installable agent, pairing command or Codex adapter
exists. The current node-agent module exports scaffold metadata only.

The intended agent runs on the machine containing the repository, alongside the
local Codex App Server. It initiates outbound WSS to the gateway and locally
constrains access to allowlisted workspaces. No public inbound agent port is
part of the design. Local OS and Codex permissions remain authoritative.

M2 must validate supported host platforms, local adapter compatibility,
enrollment, credential storage, path containment, per-thread locking and
disconnect behavior. M4.3 must validate packaging and rollback before providing
installation commands. Never copy home credential/session directories to
provision this scaffold.

See [architecture](architecture.md) and
[protocol requirements](gateway-agent-protocol.md).
