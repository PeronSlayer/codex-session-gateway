import { describe, expect, it } from 'vitest';
import { name, status, version } from '../src/index.js';

describe('@codex-session-gateway/gateway', () => {
  it('exports its scaffold identity', () => {
    expect(name).toBe('@codex-session-gateway/gateway');
    expect(status).toBe('scaffold');
    expect(version).toBe('0.0.0');
  });
});
