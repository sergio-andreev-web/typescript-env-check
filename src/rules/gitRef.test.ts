import test from 'node:test';
import assert from 'node:assert/strict';
import { GitRefRule } from './gitRef.js';

test('gitRef accepts valid and rejects invalid values', () => {
  const rule = new GitRefRule();
  assert.equal(rule.validate("feature/task"), true);
  assert.equal(rule.validate("bad ref"), false);
  assert.equal(rule.inspect("feature/task").valid, true);
  assert.throws(() => rule.assert("bad ref"));
});

test('gitRef options are immutable between instances', () => {
  const original = new GitRefRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("feature/task"), true);
  assert.equal(extended.validate("feature/task"), false);
});
