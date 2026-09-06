# Backup and recovery

**Status: Planned**. There is no operational database, backup command or
recovery procedure to execute. Git preserves source only; it is not a session
backup.

M4.1 must classify future configuration, grants, host registrations, run
metadata and audit records; select storage, retention, encryption and recovery
objectives; and test restore into an isolated environment. Credentials require
separate handling and must never be included in this repository.

A restore must not resurrect revoked grants or resume stale thread locks. After
compromise, isolate affected components, revoke exposed credentials and
re-enroll agents before restoring service. Exact commands depend on the selected
storage and credential design. Codex workspace/session recovery remains a host
concern; the gateway must not copy credential or session directories as a backup
strategy.

See [operations](operations.md) and [threat model](threat-model.md).
