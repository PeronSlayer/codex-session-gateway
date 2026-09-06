# Gateway-agent protocol requirements

**Status: Planned**. This is a requirements inventory, not a definitive protocol.
There are no implemented messages, version numbers, sockets or runtime schemas.

## Desired properties

- Agents initiate authenticated WSS connections outbound only. The gateway cannot
  require inbound ports on development hosts.
- Bind an authenticated agent to a host identity and authorize each routed
  workspace/thread operation independently.
- Negotiate compatibility explicitly; reject unknown or malformed input using
  bounded runtime validation. Zod is reserved for this future work.
- Define request correlation, run ownership, target identity and cancellation
  semantics before fixing message envelopes.
- Bound message sizes, queues, concurrent operations, timeouts and retained data.
  Specify backpressure and disconnection behavior.
- Distinguish accepted work from completed work and interruption requests from
  confirmed interruption. Avoid claiming exactly-once execution.
- Define replay protection, retry safety, reconnect behavior and ambiguous outcomes.
  Mutating retries require a reviewed idempotency strategy.
- Preserve per-thread exclusive mutation across reconnects and process failures;
  resolve independent local clients and stale lock ownership.
- Propagate revocation and credential rotation without silently reauthorizing old
  sessions. Define the policy for already-running work.
- Provide sanitized audit correlation without sending credentials or raw
  transcripts to ordinary logs.

## Decisions intentionally deferred

Framing, envelopes, transport library, protocol versioning, heartbeat cadence,
acknowledgements, state persistence, error taxonomy and delivery guarantees are
undecided. M1.4 must produce an ADR, schemas, interoperability vectors and negative
security tests before an implementation is called Experimental.

See [architecture](architecture.md), [security model](security-model.md) and
[ROADMAP](../ROADMAP.md).
