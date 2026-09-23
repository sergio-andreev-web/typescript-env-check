import test from 'node:test';
import assert from 'node:assert/strict';
import { SnakeCaseRule } from './snakeCase.js';

test('snakeCase accepts valid and rejects invalid values', () => {
  const rule = new SnakeCaseRule();
  assert.equal(rule.validate("some_key"), true);
  assert.equal(rule.validate("some-key"), false);
  assert.equal(rule.inspect("some_key").valid, true);
  assert.throws(() => rule.assert("some-key"));
});

test('snakeCase options are immutable between instances', () => {
  const original = new SnakeCaseRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("some_key"), true);
  assert.equal(extended.validate("some_key"), false);
});
