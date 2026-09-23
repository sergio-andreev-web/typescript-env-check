import test from 'node:test';
import assert from 'node:assert/strict';
import { compareEnvironments, formatDiff, mergeEnvironments, redactEnvironment } from './diff.js';

test('compares keys without exposing values', () => {
  const diff = compareEnvironments(
    { A: 'one', B: 'two', SECRET_TOKEN: 'private' },
    { A: 'one', B: 'three', C: 'new' },
  );
  assert.deepEqual(diff.added, ['C']);
  assert.deepEqual(diff.removed, ['SECRET_TOKEN']);
  assert.deepEqual(diff.changed, ['B']);
  assert.deepEqual(diff.unchanged, ['A']);
  assert.equal(formatDiff(diff).includes('private'), false);
});

test('merges and redacts sensitive keys', () => {
  const merged = mergeEnvironments({ A: 'old', PASSWORD: 'secret' }, { A: 'new' });
  assert.equal(merged.A, 'new');
  assert.equal(redactEnvironment(merged).PASSWORD, '[REDACTED]');
  assert.equal(redactEnvironment(merged).A, 'new');
});
