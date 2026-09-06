# Security policy

**Status: Implemented** — reporting policy. Private reporting infrastructure is
**Planned** under M0.3 and must be verified before public release.

## Supported versions

There are no released or production-supported versions. Version 0.0.0 is a
scaffold; runtime authentication and authorization do not exist.

## Reporting a vulnerability

**Do not open a public issue or pull request containing vulnerability details.**
Do not post credentials, exploit payloads, sensitive logs or affected-user data.

The intended maintainer is Alberto Lopez - Alcybercloud.it (`peronslayer`). No
verified private security email or GitHub private reporting route has been
configured in this scaffold. Do not assume a `security/advisories/new` URL
works. If no private contact is already known, request a private contact method
from the maintainer without disclosing the vulnerability. A public contact
request must contain no technical or identifying incident details. Wait for a
verified private channel before transmitting the report.

Once a private channel is established, include the affected revision, impact,
minimal sanitized reproduction and any suggested mitigation. Never send a live
credential as evidence. Maintainers should acknowledge, investigate and
coordinate fix/disclosure privately; response deadlines are not promised at this
stage.

See [security model](docs/security-model.md) and
[threat model](docs/threat-model.md).
