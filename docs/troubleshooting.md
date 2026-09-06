# Troubleshooting

**Status: Implemented** for scaffold guidance. Runtime troubleshooting is
**Planned**.

| Symptom                                              | Meaning and development action                                                                                                      |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `node` or `pnpm` not found                           | Approved runtime provisioning is incomplete; do not claim tests passed                                                              |
| Frozen install reports a missing lockfile            | Check checkout completeness: the lockfile is committed; do not bypass frozen installation in CI                                     |
| Frozen install reports a stale lockfile              | Reconcile intentional dependency changes locally, regenerate with pinned pnpm and review the diff                                   |
| Formatting fails                                     | Run `pnpm format`, inspect changes, then repeat `pnpm format:check`                                                                 |
| A documentation check fails                          | Repair the named local link, required page or status marker                                                                         |
| A secret check fails                                 | Inspect the named path privately; remove sensitive staged content and rotate any actually exposed credential                        |
| `gh` is unavailable or unauthenticated               | Complete local work; install CLI separately and use browser authentication when available                                           |
| Commit cannot determine author                       | Set maintainer-approved local Git name and email before committing                                                                  |
| Installation reports unreviewed dependency builds    | Inspect the exact dependency and lifecycle script before authorizing it; do not disable strict build review                         |
| Actions jobs cannot start because of account billing | Run the complete local suite; report Actions as configured but not externally verified; no payment or runner workaround is required |
| No server starts after build                         | Expected: every built component is metadata only                                                                                    |

Do not attach tokens, credential stores, full transcripts or raw environment
dumps to reports. See [SUPPORT](../SUPPORT.md), [SECURITY](../SECURITY.md) and
[bootstrap status](bootstrap-status.md).
