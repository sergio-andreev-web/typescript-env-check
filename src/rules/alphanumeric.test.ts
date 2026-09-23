import test from 'node:test';
import assert from 'node:assert/strict';
import { AlphanumericRule } from './alphanumeric.js';

test('alphanumeric accepts valid and rejects invalid values', () => {
  const rule = new AlphanumericRule();
  assert.equal(rule.validate("abc123"), true);
  assert.equal(rule.validate("abc-123"), false);
  assert.equal(rule.inspect("abc123").valid, true);
  assert.throws(() => rule.assert("abc-123"));
});

test('alphanumeric options are immutable between instances', () => {
  const original = new AlphanumericRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("abc123"), true);
  assert.equal(extended.validate("abc123"), false);
});
