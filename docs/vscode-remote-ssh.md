# VS Code Remote SSH

**Status: Planned** for a validated development-host guide. VS Code Remote SSH is
an optional way to edit a checkout; it is not the gateway's agent transport.

If SSH access is already configured by the host administrator, use an unprivileged
account and a checkout owned by that account. Do not run VS Code or Codex as root.
Do not copy SSH keys, Codex credentials or session directories into this project.
No editor extension or remote connection is required for the scaffold checks.

This phase supplies no SSH configuration, firewall rules, port forwarding commands
or editor settings. M4.3 may document a tested editing workflow without weakening
existing host access policy. Node agents remain outbound WSS clients regardless
of how maintainers edit their repositories.

See [development](development.md) and [node agent planning](node-agent-installation.md).
