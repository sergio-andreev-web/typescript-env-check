import test from 'node:test';
import assert from 'node:assert/strict';
import { PosixPathRule } from './posixPath.js';

test('posixPath accepts valid and rejects invalid values', () => {
  const rule = new PosixPathRule();
  assert.equal(rule.validate("/var/log/app"), true);
  assert.equal(rule.validate("relative/path"), false);
  assert.equal(rule.inspect("/var/log/app").valid, true);
  assert.throws(() => rule.assert("relative/path"));
});

test('posixPath options are immutable between instances', () => {
  const original = new PosixPathRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("/var/log/app"), true);
  assert.equal(extended.validate("/var/log/app"), false);
});
