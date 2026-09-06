# Changelog

All notable project changes will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
future releases will follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html). There is no release
or tag yet; 0.0.0 is the initial scaffold manifest version.

## [Unreleased]

### Added

- Strict TypeScript/ESM monorepo configuration and six metadata components with
  smoke tests; dashboard reserved as documentation only.
- Architecture, security, contribution and operational planning documentation.
- Quality scripts, Changesets and GitHub automation definitions.

### Changed

- Established Node 24.20.0 LTS, npm 11.19.0 and pnpm 10.34.5 with a verified
  user-local installation method and a generated pnpm lockfile.
- Pinned the Node patch version shared by development and CI, enforced
  compatible engines and the exact pnpm version, and denied unreviewed
  dependency builds.
- Applied the configured formatter and verified lint, types, all six smoke
  tests, build, documentation, preventive secret checks and dependency audit
  locally.
- Documented development independent of GitHub Actions; added the local audit
  command to the existing CI definition without adding paid services or uploads.

### Known limitations

- GitHub Actions is configured but not externally verified: an account billing
  restriction prevents jobs from starting. Local verification does not depend on
  it.
- Private reporting setup remains pending; there is no runtime integration
  release.
- ESLint 9.39.5 is deprecated upstream; existing compatible direct versions were
  retained, with a future upgrade review tracked as ROADMAP M0.4.
- MCP, OAuth, WSS, Codex integration, dashboard and deployment are Planned.
