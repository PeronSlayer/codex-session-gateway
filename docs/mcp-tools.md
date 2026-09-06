# MCP tools

**Status: Planned**. These names are a candidate surface. No tools are registered,
no MCP SDK is installed, and no request/response schema is final.

| Tool | Status | Intended operation and authorization boundary |
| --- | --- | --- |
| `list_codex_hosts` | Planned | Discover only hosts visible to the authenticated principal |
| `list_workspaces` | Planned | List allowlisted workspaces on an explicitly authorized host |
| `list_codex_threads` | Planned | List permitted threads within an explicit host/workspace |
| `select_codex_target` | Planned | Select an authorized host/workspace/thread for an isolated client context |
| `read_codex_thread` | Planned | Read permitted thread data with reviewed output limits and secret exposure policy |
| `start_codex_thread` | Planned | Create a thread in an explicitly selected, authorized host/workspace |
| `start_codex_turn` | Planned | Start authorized work on an explicit thread with exclusive mutation ownership |
| `get_codex_run` | Planned | Observe only a run owned by or granted to the caller |
| `interrupt_codex_run` | Planned | Request interruption of an authorized run; request acceptance must not imply completion |

Thread-bound requests require host, workspace and thread identity, either explicit
or resolved through an isolated selection context. Starting a new thread cannot
require a thread that does not yet exist. All operations must revalidate access,
including polling and interruption; IDs are not authorization tokens.

Pagination, errors, schemas, run lifecycle, idempotency, cancellation and output
limits will be specified in M1.4/M3.2. These descriptions deliberately do not fix
wire payloads or claim delivery guarantees.

**Not supported:** arbitrary shell commands, arbitrary filesystem reads, credential
export, or automatic authorization based on model-generated instructions.
