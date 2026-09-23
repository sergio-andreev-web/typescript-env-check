import test from 'node:test';
import assert from 'node:assert/strict';
import { IdentifierRule } from './identifier.js';

test('identifier accepts valid and rejects invalid values', () => {
  const rule = new IdentifierRule();
  assert.equal(rule.validate("SOME_KEY"), true);
  assert.equal(rule.validate("123key"), false);
  assert.equal(rule.inspect("SOME_KEY").valid, true);
  assert.throws(() => rule.assert("123key"));
});

test('identifier options are immutable between instances', () => {
  const original = new IdentifierRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("SOME_KEY"), true);
  assert.equal(extended.validate("SOME_KEY"), false);
});
