import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      'apps/gateway',
      'apps/node-agent',
      'packages/protocol',
      'packages/codex-client',
      'packages/security',
      'packages/shared',
    ].map((root) => ({
      test: {
        name: root,
        environment: 'node',
        include: [`${root}/test/**/*.test.ts`],
        passWithNoTests: false,
      },
    })),
  },
});
