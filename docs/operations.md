# Operations

**Status: Planned**. There are no running project services, operational
databases, production configuration, health probes or deployment commands.

Before operating a future release, M4 must produce reviewed runbooks for
enrollment, authorization changes, credential rotation and revocation, agent
loss, uncertain run completion, stale lock recovery, updates, rollback and
incident containment. An interruption request must not be reported as completed
work without evidence from the execution host. Do not blindly replay a mutation
after a disconnect.

Operational ownership must distinguish gateway administration from local host
administration. A gateway administrator should not be able to widen a host's
workspace allowlist. Recovery procedures must preserve revocation decisions and
avoid restoring stale execution authority.

Related planning documents:

- [Gateway installation](gateway-installation.md)
- [Node agent installation](node-agent-installation.md)
- [Configuration](configuration.md)
- [Monitoring](monitoring.md)
- [Backup and recovery](backup-recovery.md)
- [Troubleshooting](troubleshooting.md)
- [VS Code Remote SSH](vscode-remote-ssh.md)
- [Caddy](../deploy/caddy/README.md), [Docker](../deploy/docker/README.md) and
  [systemd](../deploy/systemd/README.md)
