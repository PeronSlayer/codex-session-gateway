# Configuration

**Status: Planned**. No configuration loader, environment reader or runtime schema
exists. Files in `config/` and `.env.example` are documentation illustrations only.

[gateway.example.yaml](../config/gateway.example.yaml) sketches an HTTPS origin
and a WSS destination. [agent.example.yaml](../config/agent.example.yaml) sketches
a synthetic host ID, a private credential reference and a workspace allowlist.
Keys and their semantics may change during M1. No token is supplied.

Use reserved `example.com` domains, synthetic UUIDs and generic `/path/to/...`
paths when contributing examples. Keep real configuration outside Git; local
`config/**/*.local.*` files are ignored. Ignoring a file does not remove it if it
was already tracked, which is why staged review and secret checks are required.

M1.3 must specify secret references, file permissions and validation failures. M2.2
must make local workspace policy authoritative. The public gateway must never
receive the host's Codex credential files. See [security model](security-model.md).
