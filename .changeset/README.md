# Changesets

**Status: Implemented** — versioning configuration only; no package release
exists.

After dependency bootstrap, run `pnpm changeset` for a consumer-visible change.
Describe behavior and the appropriate Semantic Versioning impact. All packages
are private at 0.0.0; private package versioning is enabled but tagging is
disabled. `pnpm version:packages` applies reviewed entries during a future
release process. Publishing, registry credentials and automatic release
workflows are **Planned** under M5.2 in [ROADMAP](../ROADMAP.md).
