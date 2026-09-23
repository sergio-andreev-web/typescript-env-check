import test from 'node:test';
import assert from 'node:assert/strict';
import { DecimalRule } from './decimal.js';

test('decimal accepts valid and rejects invalid values', () => {
  const rule = new DecimalRule();
  assert.equal(rule.validate("12.5"), true);
  assert.equal(rule.validate("abc"), false);
  assert.equal(rule.inspect("12.5").valid, true);
  assert.throws(() => rule.assert("abc"));
});

test('decimal options are immutable between instances', () => {
  const original = new DecimalRule();
  const extended = original.withOptions({ maxLength: 2 });
  assert.equal(original.validate("12.5"), true);
  assert.equal(extended.validate("12.5"), false);
});
