import test from 'node:test';
import assert from 'node:assert/strict';
import { BooleanTextRule } from './booleanText.js';

test('booleanText accepts valid and rejects invalid values', () => {
  const rule = new BooleanTextRule();
  assert.equal(rule.validate("true"), true);
  assert.equal(rule.validate("yes"), false);
  assert.equal(rule.inspect("true").valid, true);
  assert.throws(() => rule.assert("yes"));
});

test('booleanText options are immutable between instances', () => {
  const original = new BooleanTextRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("true"), true);
  assert.equal(extended.validate("true"), false);
});
