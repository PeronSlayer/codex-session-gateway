# Authentication

**Status: Planned**. No OAuth provider, callback, token validation, login route,
agent enrollment or credential store exists.

The intended public gateway requires OAuth for MCP clients, with independently
reviewed agent authentication for outbound connections. M1.3 must select the flow,
issuer and audience validation, client registration, consent, redirects, scopes,
credential lifetime and storage. Browser-client compatibility must be tested;
this document does not claim a supported grant or discovery endpoint.

Authorization must bind the principal, client context, host, workspace and thread
for each operation. Agent credentials must identify one constrained agent and be
revocable and rotatable. Codex credentials remain on their development host and
must never be copied into gateway configuration.

Define revocation propagation and active-run behavior before implementation.
Examples contain no usable credentials. See [security model](security-model.md).
