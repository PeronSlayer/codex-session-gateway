# Monitoring

**Status: Planned**. There is no health endpoint, metrics exporter, tracing backend
or operational logging pipeline. Test output is development output only.

M4.2 must define bounded-cardinality metrics for agent availability, authorization
failures, queue pressure, run transitions and lock contention. Liveness must not
be confused with a working Codex adapter or an authorized target.

Use sanitized correlation identifiers and structured events. Do not log bearer
credentials, OAuth grants, raw prompts, transcripts, source files or complete tool
payloads by default. Define access, retention, deletion and safe diagnostic export
before enabling operational logs. Test error paths for accidental exposure.

See [operations](operations.md) and [security model](security-model.md).
