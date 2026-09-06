# Getting started

**Status: Implemented** for scaffold source; runtime integration is **Planned**.

This project currently lets contributors inspect architecture, edit TypeScript
metadata and run development checks once the toolchain and lockfile are
available. It cannot connect a browser assistant to a Codex session.

1. Read the [README](../README.md) and [bootstrap status](bootstrap-status.md).
2. Use an unprivileged local checkout and the pinned Node/pnpm prerequisites.
3. Install with the committed frozen lockfile, then follow every command in
   [development](development.md), including the local dependency audit.
4. Read [architecture](architecture.md) and [security model](security-model.md)
   before proposing work against a [ROADMAP](../ROADMAP.md) identifier.

No `.env` file, account token, Codex session or cloud service is required to
work on this scaffold. Do not supply credentials to make the smoke tests run.
