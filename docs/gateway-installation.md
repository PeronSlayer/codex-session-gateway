# Gateway installation

**Status: Planned**. There is no installable gateway service or deployment artifact.
Building `apps/gateway` emits metadata only and does not bind a network port.

For source development, follow [getting started](getting-started.md). M4.3 must
choose packaging, a least-privilege service identity, TLS termination, configuration
locations, health semantics and rollback behavior before deployment instructions
can be validated. OAuth and MCP must pass their preceding review gates.

No Caddy installation, systemd unit, Docker image, firewall change, SSH change or
production deployment is provided. The deployment directories contain planning
notes only. See [operations](operations.md).
